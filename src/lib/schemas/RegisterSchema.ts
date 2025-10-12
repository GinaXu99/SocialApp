import { z } from 'zod';

export const registerSchema = z.object({
  name: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(6, {
    message: 'Password must be at least 7 characters long',
  }),
});

// export const profielSchema = z.object({
//   gender: z.string().min(1),
//   description: z.string().min(1),
//   city: z.string().min(1),
//   country: z.string().min(1),
//   dateOfBirth: z.string().min(1, {
//     message: 'Date of birth is required',
//   }),
// });

// export const combinedRegisteredSchema = registerSchema && profielSchema;

// export type profielSchema = z.infer<typeof combinedRegisteredSchema>;
export type RegisterSchema = z.infer<typeof registerSchema>;
