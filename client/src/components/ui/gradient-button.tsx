import React from 'react';
import { Button, ButtonProps } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface GradientButtonProps extends ButtonProps {
  gradientFrom?: string;
  gradientTo?: string;
  hoverScale?: boolean;
  glowEffect?: boolean;
}

export function GradientButton({
  className,
  children,
  gradientFrom = "from-indigo-600",
  gradientTo = "to-purple-600",
  hoverScale = true,
  glowEffect = true,
  disabled,
  ...props
}: GradientButtonProps) {
  return (
    <Button
      className={cn(
        "relative bg-gradient-to-r text-white transition-all duration-300 bg-size-200 animation-gradient",
        gradientFrom,
        gradientTo,
        hoverScale && "hover:-translate-y-0.5",
        glowEffect && "hover:shadow-lg hover:shadow-indigo-500/30",
        disabled && "opacity-70 pointer-events-none",
        className
      )}
      disabled={disabled}
      {...props}
    >
      {children}
    </Button>
  );
}
