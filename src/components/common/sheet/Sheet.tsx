import * as React from 'react';
import * as SheetPrimitive from '@radix-ui/react-dialog';
import { IoMdClose as Cross2Icon } from 'react-icons/io';

import styled from 'styled-components';

const Sheet = SheetPrimitive.Root;

const SheetTrigger = SheetPrimitive.Trigger;

const SheetClose = SheetPrimitive.Close;

const SheetPortal = SheetPrimitive.Portal;

const SSheetOverlay = styled(SheetPrimitive.Overlay)`
  position: fixed; 
  top: 0;
  right: 0;
  bottom: 0;
  left: 0; 
  z-index: 50; 
  background-color: #000000; 
  opacity: 0.8;
`;
const SheetOverlay = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <SSheetOverlay
    className={className}
    {...props}
    ref={ref}
  />
));
SheetOverlay.displayName = SheetPrimitive.Overlay.displayName;

type SheetContentProps = React.ComponentPropsWithoutRef<typeof SheetPrimitive.Content>

export const SSheetPrimitiveClose = styled(SheetPrimitive.Close)`
    position: absolute; 
    top: 1rem; 
    right: 1rem; 
    border-radius: 0.125rem; 
    transition-property: opacity;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 300ms; 
    opacity: 0.7; 

    &:hover {
        opacity: 1; 
    }
`;

const SSheetPrimitiveContent = styled(SheetPrimitive.Content)`
    position: fixed; 
    z-index: 50; 
    padding: 32px 36px; 
    gap: 1rem; 
    transition-property: background-color, border-color, color, fill, stroke, opacity, box-shadow, transform;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 300ms; 
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1); 
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05); 
    right: 0;
    left: 0; 
    bottom: 0; 
    border-top-width: 1px;
    background-color: white;
`;

const SheetContent = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Content>,
  SheetContentProps
>(({ className, children, ...props }, ref) => (
  <SheetPortal>
    <SheetOverlay />
    <SSheetPrimitiveContent
      ref={ref}
      className={className}
      {...props}
    >
      {children}
      <SSheetPrimitiveClose>
        <Cross2Icon style={{ width: 20, height: 20 }} />
      </SSheetPrimitiveClose>
    </SSheetPrimitiveContent>
  </SheetPortal>
));
SheetContent.displayName = SheetPrimitive.Content.displayName;

const SSheetHeader = styled.div`
    display: flex; 
    margin-top: 0.5rem; 
    flex-direction: column; 
    text-align: center; 

    @media (min-width: 640px) { 
        text-align: left; 
    }
`;
const SheetHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <SSheetHeader
    className={className}
    {...props}
  />
);
SheetHeader.displayName = 'SheetHeader';

const SSheetFooter = styled.div`
    display: 'flex';
    flex-direction: 'column-reverse';

    @media (min-width: 640px) {
        margin-left: "0.5rem";
        flex-direction: "row";
        justify-content: "flex-end";
    }
`;

const SheetFooter = ({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <SSheetFooter
    className={className}
    {...props}
  >
    {children}
  </SSheetFooter>
);

SheetFooter.displayName = 'SheetFooter';

const SheetTitle = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Title>
>(({ className, ...props }, ref) => (
  <SheetPrimitive.Title
    ref={ref}
    className={className}
    style={{ fontSize: '14px', lineHeight: '16.41px', fontWeight: 700 }}
    {...props}
  />
));
SheetTitle.displayName = SheetPrimitive.Title.displayName;

const SheetDescription = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Description>
>(({ className, ...props }, ref) => (
  <SheetPrimitive.Description
    ref={ref}
    className={className}
    style={{ fontSize: '0.875rem', lineHeight: '1.25rem' }}
    {...props}
  />
));
SheetDescription.displayName = SheetPrimitive.Description.displayName;

export {
  Sheet,
  SheetPortal,
  SheetOverlay,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
};
