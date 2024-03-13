'use client';

import * as React from 'react';
import * as SeparatorPrimitive from '@radix-ui/react-separator';

const Separator = React.forwardRef<
  React.ElementRef<typeof SeparatorPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root>
>(
  (
    { className, orientation = 'horizontal', decorative = true, ...props },
    ref,
  ) => (
    <SeparatorPrimitive.Root
      ref={ref}
      decorative={decorative}
      orientation={orientation}
      style={{
        flexShrink: 0,
        height: '2px',
        width: '100%',
        backgroundColor: 'rgba(238, 239, 241, 1)',
      }}
      className={className}
      {...props}
    />
  ),
);
Separator.displayName = SeparatorPrimitive.Root.displayName;

export { Separator };
