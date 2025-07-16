'use client';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Loader2, Eye, EyeOff } from 'lucide-react';
import { FaGithub, FaGoogle } from 'react-icons/fa';
import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const signupSchema = z.object({
  email: z.email('Enter a valid email'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

const defaultValues = {
  email: '',
  password: '',
};

const SocialButton = ({
  icon: Icon,
  children,
  onClick,
}: {
  icon: React.ElementType;
  children: React.ReactNode;
  onClick: () => void;
}) => (
  <Button
    type="button"
    variant="outline"
    className="w-full flex items-center justify-center gap-2"
    onClick={onClick}
  >
    <Icon />
    {children}
  </Button>
);

export function LoginForm({ className, ...props }: React.HTMLAttributes<HTMLFormElement>) {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof signupSchema>>({
    resolver: zodResolver(signupSchema),
    defaultValues,
  });

  const onSubmit = async (values: z.infer<typeof signupSchema>) => {
    setLoading(true);
    const supabase = createClient();
    try {
      const { error } = await supabase.auth.signInWithPassword(values);
      if (error) throw error;
      router.push('/projects');
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = (provider: 'google' | 'github') => {
    console.log(`Sign in with ${provider}`);
    // Integrate with your auth system here
  };

  return (
    <Form {...form}>
      <form
        className={`space-y-6 max-w-md mx-auto ${className ?? ''}`}
        onSubmit={form.handleSubmit(onSubmit)}
        {...props}
      >
        <div>
          <h1 className="text-2xl font-bold mb-2">Sign in to Account</h1>
          <p className="text-sm text-muted-foreground">Hello welcome back.</p>
        </div>

        <div className="space-y-3">
          <SocialButton icon={FaGoogle} onClick={() => handleSocialLogin('google')}>
            Continue with Google
          </SocialButton>
          <SocialButton icon={FaGithub} onClick={() => handleSocialLogin('github')}>
            Continue with GitHub
          </SocialButton>
        </div>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">or continue with</span>
          </div>
        </div>

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="you@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    {...field}
                    className="pr-10"
                  />
                  <span
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground cursor-pointer"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </span>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Login'}
        </Button>
        <div className="text-muted-foreground flex justify-center gap-1 text-sm">
          <p>Don&apos;t have an account?</p>
          <Link href="/members/auth/sign-up" className="text-primary font-medium hover:underline">
            Sign up
          </Link>
        </div>
      </form>
    </Form>
  );
}
