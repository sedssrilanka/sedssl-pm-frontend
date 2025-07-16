'use client';

import { ThemeToggle } from '@/components/ui/theme-toggle';
import { Button } from '../ui/button';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import * as React from 'react';

function BackButton({ fallback = '/' }: { fallback?: string }) {
  const router = useRouter();
  const [canGoBack, setCanGoBack] = React.useState(false);

  React.useEffect(() => {
    setCanGoBack(window.history.length > 1);
  }, []);

  const handleBack = () => {
    if (canGoBack) {
      router.back();
    } else {
      router.push(fallback);
    }
  };

  return (
    <Button variant="link" type="button" onClick={handleBack}>
      <ArrowLeft />
      {canGoBack ? 'Back' : 'Back to Home'}
    </Button>
  );
}

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 bg-background group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 flex h-12 w-full shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear justify-between">
      <BackButton fallback="/members" />
      <div className="flex items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <ThemeToggle />
      </div>
    </header>
  );
}
