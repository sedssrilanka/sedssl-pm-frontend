'use client';

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
import { useState } from 'react';
import { Button } from '../ui/button';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import DatePicker from '../ui/date-picker';
import { PhoneInput } from '../ui/phone-input';
import { Checkbox } from '../ui/checkbox';

export function MembershipRegistrationForm({
  className,
  ...props
}: React.HTMLAttributes<HTMLFormElement>) {
  const [files, setFiles] = useState<File[] | undefined>();

  const handleDrop = (files: File[]) => {
    console.log(files);
    setFiles(files);
  };

  return (
    <form className={`space-y-5 ${className}`} {...props}>
      <div>
        <Button variant={'link'} className=" p-0">
          <ArrowLeft />
          Login
        </Button>
        <h1 className="text-2xl font-bold mb-1">Personal Information</h1>
        <p className="text-sm text-muted-foreground">
          Tell us about yourself to begin your application.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="grid gap-1.5">
          <Label htmlFor="initials">Name with Initials</Label>
          <Input id="initials" placeholder="S. R. Perera" required />
        </div>

        <div className="grid gap-1.5">
          <Label htmlFor="fullName">Full Name</Label>
          <Input id="fullName" placeholder="Sahan Ramesh Perera" required />
        </div>

        <div className="md:col-span-2 grid gap-1.5">
          <Label htmlFor="phone">Phone Number</Label>
          <PhoneInput defaultCountry="LK" />
        </div>

        <div className="grid gap-1.5">
          <Label htmlFor="gender">Gender</Label>
          <Select required>
            <SelectTrigger id="gender">
              <SelectValue placeholder="Select your gender" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="male">Male</SelectItem>
              <SelectItem value="female">Female</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid gap-1.5 ">
          <Label htmlFor="dob">Date of Birth</Label>
          <DatePicker />
        </div>
      </div>

      <div className="grid gap-1.5">
        <Label htmlFor="cv">Upload CV / Resume</Label>
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
      </div>

      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Checkbox id="terms" />
          <Label htmlFor="terms">Accept terms and conditions</Label>
        </div>

        <Button type="submit" variant={'link'} className=" p-0">
          Next Step
          <ArrowRight />
        </Button>
      </div>
    </form>
  );
}
