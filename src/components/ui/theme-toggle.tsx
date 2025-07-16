'use client';

import * as React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { Switch } from './switch';
import { Skeleton } from './skeleton';

export function ThemeToggle() {
  const { setTheme, resolvedTheme, theme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const handleToggle = () => {
    if (theme === 'system') {
      setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
    } else if (theme === 'dark') {
      setTheme('light');
    } else if (theme === 'light') {
      setTheme('dark');
    }
  };

  if (!mounted) {
    return (
      <div className="flex items-center space-x-3">
        <Skeleton className="h-5 w-5 rounded-full" />
        <Skeleton className="h-6 w-10 rounded-full" />
        <Skeleton className="h-5 w-5 rounded-full" />
      </div>
    );
  }

  return (
    <div className="flex items-center space-x-3">
      <Sun className="size-4" />
      <Switch
        checked={resolvedTheme === 'dark'}
        onCheckedChange={handleToggle}
        aria-label="Toggle theme"
      />
      <Moon className="size-4" />
    </div>
  );
}
