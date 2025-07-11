import { ThemeToggle } from '@/components/ui/theme-toggle';
import { Button } from '../ui/button';
import { ArrowLeft } from 'lucide-react';

export function SiteHeader() {
  return (
    <header className=" sticky top-0 z-50 bg-background group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 flex h-12 w-full shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear justify-between">
      <Button variant="link">
        <ArrowLeft />
        Login
      </Button>

      <div className="flex items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <ThemeToggle />
      </div>
    </header>
  );
}
