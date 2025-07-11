'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import { Dropzone, DropzoneContent, DropzoneEmptyState } from '@/components/ui/dropzone';
import { Button } from '@/components/ui/button';
import { PhoneInput } from '@/components/ui/phone-input';
import { Checkbox } from '@/components/ui/checkbox';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Calendar } from '../ui/calendar';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { ArrowRight, CalendarIcon } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';

// Schema
const formSchema = z.object({
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

export function MembershipRegistrationForm({
  className,
  ...props
}: React.HTMLAttributes<HTMLFormElement>) {
  const [files, setFiles] = useState<File[] | undefined>();

  const supabase = createClient();
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      initials: '',
      fullName: '',
      phone: '',
      gender: undefined,
      dob: undefined,
      terms: false,
      cv: undefined,
    },
  });

  const handleDrop = (dropped: File[]) => {
    const file = dropped[0];
    setFiles([file]);
    form.setValue('cv', file);
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const {
        initials,
        fullName,
        phone,
        gender,
        dob,
        cv, // File
      } = values;

      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) {
        throw new Error('User not authenticated');
      }

      // 2. Upload CV to Supabase Storage
      const fileExt = cv.name.split('.').pop();
      const filePath = `${user.id}/cv_${user.id}_${Date.now()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage.from('sedssl').upload(filePath, cv);

      if (uploadError) {
        throw new Error(`Failed to upload CV: ${uploadError.message}`);
      }

      // 3. Get public URL
      const {
        data: { publicUrl },
      } = supabase.storage.from('cvs').getPublicUrl(filePath);

      // 4. Insert membership into DB
      const { error: insertError } = await supabase.from('memberships').insert({
        user_id: user.id,
        initials,
        full_name: fullName,
        phone,
        gender,
        dob,
        cv_url: publicUrl,
        status: 'pending',
      });

      if (insertError) {
        throw new Error(`Failed to save membership: ${insertError.message}`);
      }

      //TODO show proper pop up

      alert('Membership submitted successfully!');
      router.push('/members');
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.error(err);
      alert(`Submission failed: ${err.message}`);
    }
  };
  return (
    <Form {...form}>
      <form className={`space-y-5 ${className}`} onSubmit={form.handleSubmit(onSubmit)} {...props}>
        <div>
          <h1 className="text-2xl font-bold mb-1">Personal Information</h1>
          <p className="text-sm text-muted-foreground">
            Tell us about yourself to begin your application.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="initials"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name with Initials</FormLabel>
                <FormControl>
                  <Input placeholder="S. R. Perera" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input placeholder="Sahan Ramesh Perera" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="gender"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Gender</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your gender" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="dob"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Date of Birth</FormLabel>
                <FormControl>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          'justify-start text-left w-full font-normal',
                          !field.value && 'text-muted-foreground'
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {field.value ? format(field.value, 'PPP') : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        autoFocus
                      />
                    </PopoverContent>
                  </Popover>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem className="md:col-span-2">
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <PhoneInput defaultCountry="LK" value={field.value} onChange={field.onChange} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="cv"
          render={() => (
            <FormItem>
              <FormLabel>Upload CV / Resume</FormLabel>
              <FormControl>
                <Dropzone
                  maxSize={1024 * 1024 * 10}
                  minSize={1024}
                  maxFiles={1}
                  accept={{ 'application/pdf': [] }}
                  onDrop={handleDrop}
                  src={files}
                  onError={console.error}
                >
                  <DropzoneEmptyState />
                  <DropzoneContent />
                </Dropzone>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-between items-center">
          <FormField
            control={form.control}
            name="terms"
            render={({ field }) => (
              <FormItem className=" space-y-0">
                <div className="flex items-center space-x-2">
                  <FormControl>
                    <Checkbox id="terms" checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                  <Label htmlFor="terms">Accept terms and conditions</Label>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" variant="link" className="p-0">
            Next Step
            <ArrowRight />
          </Button>
        </div>
      </form>
    </Form>
  );
}
