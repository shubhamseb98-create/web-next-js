"use client"

import * as React from "react"
import * as DialogPrimitive from "@radix-ui/react-dialog"
import { X } from "lucide-react"
import { cn } from "../../lib/utils"

const Dialog = DialogPrimitive.Root
const DialogTrigger = DialogPrimitive.Trigger
const DialogPortal = DialogPrimitive.Portal
const DialogClose = DialogPrimitive.Close

const DialogOverlay = React.forwardRef(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    data-lenis-prevent="true"
    className={cn(
      "fixed inset-0 z-50 bg-black/40 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    )}
    {...props}
  />
))
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName

const DialogContent = React.forwardRef(({ className, children, hideClose = false, onPointerDownOutside, onFocusOutside, onInteractOutside, ...props }, ref) => {
  // Strip redundant overflow classes from className so DialogPrimitive.Content doesn't create duplicate outer scrollbars
  const cleanedClassName = className ? className.replace(/\boverflow(-[xy])?-(auto|scroll)\b/g, '').trim() : '';

  return (
    <DialogPortal>
      <DialogOverlay />
      <DialogPrimitive.Content
        ref={ref}
        data-lenis-prevent="true"
        onPointerDownOutside={(e) => {
          if (e.target.closest('.ck-body-wrapper') || e.target.closest('.ck-balloon-panel') || e.target.closest('.ck')) {
            e.preventDefault();
          }
          if (onPointerDownOutside) onPointerDownOutside(e);
        }}
        onFocusOutside={(e) => {
          if (e.target.closest('.ck-body-wrapper') || e.target.closest('.ck-balloon-panel') || e.target.closest('.ck')) {
            e.preventDefault();
          }
          if (onFocusOutside) onFocusOutside(e);
        }}
        onInteractOutside={(e) => {
          if (e.target.closest('.ck-body-wrapper') || e.target.closest('.ck-balloon-panel') || e.target.closest('.ck')) {
            e.preventDefault();
          }
          if (onInteractOutside) onInteractOutside(e);
        }}
        className={cn(
          "fixed left-[50%] top-[50%] z-50 w-[calc(100%-2rem)] max-w-lg min-w-0 translate-x-[-50%] translate-y-[-50%] flex flex-col max-h-[calc(100vh-2rem)] duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]",
          !hideClose && "glass-panel rounded-2xl sm:rounded-[2rem] overflow-hidden",
          cleanedClassName,
          "overflow-hidden"
        )}
        style={{
          ...(hideClose ? { background: 'transparent', border: 'none', boxShadow: 'none', outline: 'none' } : {}),
          ...props.style
        }}
        {...props}
      >
        {!hideClose && (
          <DialogPrimitive.Close 
            className="absolute right-4 top-4 z-50"
            style={{ width: '32px', height: '32px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(255, 255, 255, 0.08)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255, 255, 255, 0.15)', color: '#94a3b8', cursor: 'pointer', transition: 'all 0.2s' }}
            onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.18)'; e.currentTarget.style.color = 'white'; }}
            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.08)'; e.currentTarget.style.color = '#94a3b8'; }}
          >
            <X style={{ width: '16px', height: '16px' }} />
            <span className="sr-only">Close</span>
          </DialogPrimitive.Close>
        )}
        <div 
          data-lenis-prevent="true"
          className={cn("relative flex-1 min-h-0 overflow-y-auto overflow-x-hidden custom-thin-scrollbar", !hideClose && "p-4 sm:p-6")}
          style={{ padding: hideClose ? 0 : '24px', overscrollBehavior: 'contain' }}
        >
          {children}
        </div>
      </DialogPrimitive.Content>
    </DialogPortal>
  )
})
DialogContent.displayName = DialogPrimitive.Content.displayName

const DialogHeader = ({ className, ...props }) => (
  <div 
    className={cn("flex flex-col space-y-1.5", className)} 
    style={{ textAlign: 'left', alignItems: 'flex-start' }}
    {...props} 
  />
)
DialogHeader.displayName = "DialogHeader"

const DialogFooter = ({ className, ...props }) => (
  <div className={cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className)} {...props} />
)
DialogFooter.displayName = "DialogFooter"

const DialogTitle = React.forwardRef(({ className, ...props }, ref) => (
  <DialogPrimitive.Title ref={ref} className={cn("text-lg font-semibold leading-none tracking-tight", className)} {...props} />
))
DialogTitle.displayName = DialogPrimitive.Title.displayName

const DialogDescription = React.forwardRef(({ className, ...props }, ref) => (
  <DialogPrimitive.Description ref={ref} className={cn("text-sm text-muted-foreground", className)} {...props} />
))
DialogDescription.displayName = DialogPrimitive.Description.displayName

export {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogClose,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
}
