import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Input,
} from '@/components/ui/heroui';
import React from 'react';
import { useForm } from 'react-hook-form';

import { GiPadlock } from 'react-icons/gi';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoginSchema, loginSchema } from '@/lib/schemas/LoginSchema';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import Link from 'next/link';
import { signInUser } from '@/app/actions/authActions';

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { isValid, errors },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    mode: 'onTouched',
  });

  const router = useRouter();
  const onSubmit = async (data: LoginSchema) => {
    const result = await signInUser(data);
    console.log('result:::', result);
    if (result.status === 'success') {
      router.push('/members');
      router.refresh();
    } else {
      toast.error(result.error as string);
    }
  };

  return (
    <Card className='w-3/5 mx-auto'>
      <CardHeader className='flex flex-col items-center justify-center'>
        <div className='flex flex-col gap-2 items-center gap-3'>
          <div className='flex flex-row items-center gap-3'>
            <GiPadlock size={30} />
            <h1 className='text-3xl font-semibold'>Login</h1>
          </div>
          <p className='text-neutral-500'>Welcome to our site!</p>
        </div>
      </CardHeader>
      <CardBody>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='space-y-4'>
            <Input
              defaultValue=''
              label='Email'
              variant='bordered'
              {...register('email')}
              isInvalid={!!errors.email}
              errorMessage={errors.email?.message as string}
            />
            <Input
              defaultValue=''
              label='Password'
              variant='bordered'
              type='password'
              {...register('password')}
              isInvalid={!!errors.email}
              errorMessage={errors.email?.message as string}
            />
            <Button
              fullWidth
              color='default'
              type='submit'
              isDisabled={!isValid}
            >
              Login
            </Button>
            <div className='flex justify-center hover:underline text-sm'>
              <Link href='/forgot-password'>Forgot Password?</Link>
            </div>
          </div>
        </form>
      </CardBody>
    </Card>
  );
}
