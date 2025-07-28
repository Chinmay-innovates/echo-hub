'use client';

import { Check, Monitor, Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import * as React from 'react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';

export function ModeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Button variant="outline" size="icon" className="relative">
        <div className="h-[1.2rem] w-[1.2rem] animate-pulse bg-gray-300 rounded" />
        <span className="sr-only">Toggle theme</span>
      </Button>
    );
  }

  const themeOptions = [
    {
      value: 'light',
      label: 'Light',
      icon: Sun,
      description: 'Light theme',
    },
    {
      value: 'dark',
      label: 'Dark',
      icon: Moon,
      description: 'Dark theme',
    },
    {
      value: 'system',
      label: 'System',
      icon: Monitor,
      description: 'Follow system preference',
    },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="relative overflow-hidden group hover:bg-gradient-to-r hover:from-orange-50 hover:to-blue-50 dark:hover:from-orange-900/20 dark:hover:to-blue-900/20 transition-all duration-300"
        >
          {/* Light mode icon */}
          <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all duration-500 ease-in-out dark:scale-0 dark:-rotate-90 text-orange-500" />

          {/* Dark mode icon */}
          <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all duration-500 ease-in-out dark:scale-100 dark:rotate-0 text-blue-400" />

          {/* Animated background glow */}
          <div className="absolute inset-0 bg-gradient-to-r from-orange-400/20 to-blue-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl" />

          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="w-48 p-2 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border border-gray-200/50 dark:border-gray-700/50 shadow-2xl"
      >
        {themeOptions.map((option) => {
          const Icon = option.icon;
          const isActive = theme === option.value;

          return (
            <DropdownMenuItem
              key={option.value}
              onClick={() => setTheme(option.value)}
              className={cn(
                'group flex items-center space-x-3 p-3 rounded-lg cursor-pointer transition-all duration-200',
                isActive
                  ? 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-300 border border-emerald-200/50 dark:border-emerald-700/50'
                  : 'hover:bg-gray-100/50 dark:hover:bg-gray-800/50'
              )}
            >
              <div
                className={cn(
                  'flex items-center justify-center w-8 h-8 rounded-full transition-all duration-200',
                  isActive
                    ? 'text-white shadow-lg shadow-emerald-500/25'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 group-hover:bg-gray-200 dark:group-hover:bg-gray-700'
                )}
              >
                <Icon className="h-4 w-4" />
              </div>

              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className="font-medium">{option.label}</span>
                  {isActive && (
                    <Check className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                  )}
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                  {option.description}
                </p>
              </div>
            </DropdownMenuItem>
          );
        })}

        {/* Current theme indicator */}
        <div className="mt-2 pt-2 border-t border-gray-200/50 dark:border-gray-700/50">
          <div className="flex items-center space-x-2 px-3 py-1 text-xs text-gray-500 dark:text-gray-400">
            <div
              className={cn(
                'w-2 h-2 rounded-full transition-colors duration-200',
                theme === 'light'
                  ? 'bg-orange-400'
                  : theme === 'dark'
                  ? 'bg-blue-400'
                  : 'bg-emerald-400'
              )}
            />
            <span>
              Current:&nbsp;
              {theme === 'system'
                ? 'System'
                : theme === 'light'
                ? 'Light'
                : 'Dark'}
            </span>
          </div>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
