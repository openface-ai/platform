// components/ui/dropdown-menu.tsx
'use client';

import * as React from 'react';
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type DropdownMenuContentElement = HTMLDivElement;
type DropdownMenuItemElement = HTMLDivElement;
type DropdownMenuSeparatorElement = HTMLDivElement;

const DropdownMenuContent = React.forwardRef
  DropdownMenuPrimitive.DropdownMenuContent
>(({ className, children, ...props }: any, ref: React.LegacyRef<HTMLDivElement> | undefined) => (
  <DropdownMenuPrimitive.Portal>
    <DropdownMenuPrimitive.Content
      ref={ref}
      align="start"
      sideOffset={5}
      className={cn(
        'z-50 min-w-[8rem] overflow-hidden rounded-md bg-gray-900 border border-gray-800 p-1 shadow-lg',
        className
      )}
      {...props}
    >
      {children}
    </DropdownMenuPrimitive.Content>
  </DropdownMenuPrimitive.Portal>
));

const DropdownMenuItem = React.forwardRef
  DropdownMenuPrimitive.DropdownMenuItem
>(({ className, children, ...props }: any, ref: React.LegacyRef<HTMLDivElement> | undefined) => (
  <DropdownMenuPrimitive.Item
    ref={ref}
    className={cn(
      'relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-gray-800 focus:bg-gray-800 text-gray-300',
      className
    )}
    {...props}
  >
    {children}
  </DropdownMenuPrimitive.Item>
));

const DropdownMenuSeparator = React.forwardRef
  DropdownMenuPrimitive.DropdownMenuSeparator
>(({ className, ...props }: any, ref: React.LegacyRef<HTMLDivElement> | undefined) => (
  <DropdownMenuPrimitive.Separator
    ref={ref}
    className={cn('-mx-1 my-1 h-px bg-gray-800', className)}
    {...props}
  />
));

const Root = DropdownMenuPrimitive.Root;
const Trigger = DropdownMenuPrimitive.Trigger;
const Portal = DropdownMenuPrimitive.Portal;

export {
  Root as DropdownMenu,
  Trigger as DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  Portal as DropdownMenuPortal,
};