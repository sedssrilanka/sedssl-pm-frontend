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

export function MembershipRegistrationForm({
  className,
  ...props
}: React.HTMLAttributes<HTMLFormElement>) {
  return (
    <form className={`flex flex-col gap-6 ${className}`} {...props}>
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold">Step 1: Personal Information</h1>
        <p className="text-sm text-muted-foreground">
          Tell us about yourself to begin your application.
        </p>
      </div>

      <div className="grid gap-1.5">
        <Label htmlFor="initials">Name with Initials</Label>
        <Input id="initials" placeholder="S. R. Perera" required />
      </div>

      <div className="grid gap-1.5">
        <Label htmlFor="fullName">Full Name</Label>
        <Input id="fullName" placeholder="Sahan Ramesh Perera" required />
      </div>

      <div className="grid gap-1.5">
        <Label htmlFor="phone">Phone Number</Label>
        <Input id="phone" type="tel" placeholder="+94771234567" required />
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

      <div className="grid gap-1.5">
        <Label htmlFor="dob">Date of Birth</Label>
        <Input id="dob" type="date" required />
      </div>

      <div className="grid gap-1.5">
        <Label htmlFor="cv">Upload CV / Resume</Label>
        <Input id="cv" type="file" accept=".pdf,.doc,.docx" required />
      </div>
    </form>
  );
}
