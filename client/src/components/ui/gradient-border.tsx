import React from 'react';
import { cn } from '@/lib/utils';

interface GradientBorderProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  gradient?: string;
  borderWidth?: number;
  rounded?: string;
  animate?: boolean;
  className?: string;
  containerClassName?: string;
}

export function GradientBorder({
  children,
  gradient = "bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500",
  borderWidth = 2,
  rounded = "rounded-xl",
  animate = true,
  className,
  containerClassName,
  ...props
}: GradientBorderProps) {
  return (
    <div
      className={cn(
        "relative",
        rounded,
        containerClassName
      )}
      {...props}
    >
      <div
        className={cn(
          "absolute inset-0 -z-10",
          gradient,
          rounded,
          animate && "animate-gradient bg-[length:400%_400%]"
        )}
        style={{
          top: -borderWidth,
          left: -borderWidth,
          right: -borderWidth,
          bottom: -borderWidth,
        }}
      />
      <div
        className={cn(
          "relative bg-white dark:bg-gray-950",
          rounded,
          className
        )}
      >
        {children}
      </div>
    </div>
  );
}
