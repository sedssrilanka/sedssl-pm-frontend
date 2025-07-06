'use client';

import * as React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { Switch } from './switch';

export function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme();
  const [checked, setChecked] = React.useState(false);

  React.useEffect(() => {
    setChecked(resolvedTheme === 'dark');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleToggle = () => {
    const newChecked = !checked;
    setChecked(newChecked);
    setTheme(newChecked ? 'dark' : 'light');
  };
  return (
    <div className="flex items-center space-x-3">
      <Sun className="size-4" />
      <Switch checked={checked} onCheckedChange={handleToggle} aria-label="Toggle theme" />
      <Moon className="size-4" />
    </div>
  );
}
