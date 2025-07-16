import { z } from 'zod';

export const loginSchema = z.object({
  email: z.email('Enter a valid email'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export const registrationFormSchema = z.object({
  initials: z.string().min(2, 'Required'),
  fullName: z.string().min(2, 'Required'),
  phone: z.string().min(10, 'Enter a valid phone number'),
  gender: z.enum(['male', 'female', 'other']),
  dob: z.date({
    error: 'A date of birth is required.',
  }),
  terms: z.boolean().refine((val) => val === true, {
    message: 'You must accept the terms and conditions',
  }),
  cv: z
    .any()
    .refine((file) => file instanceof File, 'CV is required')
    .refine((file) => file?.type === 'application/pdf', 'Only PDF allowed'),
});

export const signupSchema = z
  .object({
    email: z.email('Enter a valid email'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });
