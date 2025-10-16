import {
  Card,
  CardHeader,
  CardBody,
  Button,
  Input,
} from '@/components/ui/heroui';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

import { GiPadlock } from 'react-icons/gi';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { RegisterSchema, registerSchema } from '@/lib/schemas/RegisterSchema';
import { registerUser } from '@/app/actions/authActions';

import { handleFormServerErrors } from '@/lib/util';
export default function RegisterForm() {
  const {
    register,
    handleSubmit,
    getValues,
    setError,
    formState: { errors, isValid, isSubmitting },
  } = useForm<RegisterSchema>({
    mode: 'onTouched',
  });

  const router = useRouter();

  const onSubmit = async (data: RegisterSchema) => {
    const result = await registerUser(data);

    if (result.status === 'success') {
      console.log('user succeffully registerdd');
      router.push('/register/success');
    } else {
      handleFormServerErrors(result, setError);
    }
  };
  const onBack = () => {};
  const onNext = () => {};
  return (
    <Card className='w-3/5 mx-auto'>
      <CardHeader className='flex flex-col gap-2 items-center justify-center'>
        <div className='flex flex-col gap-2 items-center text-default'>
          <div className='flex flex-row items-center gap-3'>
            <GiPadlock size={30} />
            <h1 className='text-3xl font-semibold'>Register</h1>
          </div>
          <p>Welcome!</p>
        </div>
      </CardHeader>
      <CardBody>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='space-y-4'>
            <Input
              defaultValue=''
              label='Name'
              variant='bordered'
              {...register('name')}
              isInvalid={!!errors.name}
              errorMessage={errors.name?.message}
            />
            <div className='space-y-4'>
              <Input
                defaultValue=''
                label='Email'
                variant='bordered'
                {...register('email')}
                isInvalid={!!errors.email}
                errorMessage={errors.email?.message}
              />
              <Input
                defaultValue=''
                label='Password'
                variant='bordered'
                {...register('password')}
                isInvalid={!!errors.password}
                errorMessage={errors.password?.message}
              />
              <Button
                isLoading={isSubmitting}
                isDisabled={!isValid}
                fullWidth
                color='default'
                type='submit'
              >
                Register
              </Button>
              {/* <div className='flex flex-row items-center gap-6'>
                <Button onClick={onBack}>Back</Button>
                <Button onClick={onNext}>Submit</Button>
              </div> */}
            </div>
          </div>
        </form>
      </CardBody>
    </Card>
  );
}
