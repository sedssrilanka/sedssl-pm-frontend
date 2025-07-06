'use client';

import * as React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { Switch } from './switch';

export function ThemeToggle() {
  const { setTheme } = useTheme();
  const [checked, setChecked] = React.useState(false);

  React.useEffect(() => {
    setTheme(checked ? 'dark' : 'light');
  }, [checked, setTheme]);

  return (
    <div className="flex items-center space-x-3">
      <Sun className="size-4" />
      <Switch
        checked={checked}
        onCheckedChange={(value) => setChecked(value)}
        aria-label="Toggle theme"
      />
      <Moon className="size-4" />
    </div>
  );
}
