import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cn } from "../../lib/utils"

const buttonVariants = {
  default: "bg-primary text-primary-foreground hover:bg-primary/90",
  destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
  outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
  secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
  ghost: "hover:bg-accent hover:text-accent-foreground",
  link: "text-primary underline-offset-4 hover:underline",
}

const buttonSizes = {
  default: "h-10 px-4 py-2",
  sm: "h-9 rounded-md px-3",
  lg: "h-11 rounded-md px-8",
  icon: "h-10 w-10",
}

const Button = React.forwardRef(({ className, variant = "default", size = "default", style, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "button"
  
  // Inject robust fallback styles to bypass frozen Tailwind utility classes
  let bg = '#52a436';
  let hoverBg = '#3e8027';
  let textColor = 'white';
  let hoverTextColor = 'white';
  let shadow = '0 8px 25px -5px rgba(82, 164, 54, 0.6)';
  
  if (variant === 'ghost') {
    bg = 'transparent';
    hoverBg = 'rgba(255,255,255,0.05)';
    textColor = '#94a3b8';
    shadow = 'none';
  } else if (variant === 'destructive') {
    bg = '#ef4444';
    hoverBg = '#dc2626';
    shadow = '0 8px 25px -5px rgba(239, 68, 68, 0.6)';
  } else if (variant === 'outline') {
    bg = 'transparent';
    hoverBg = 'rgba(255,255,255,0.1)';
    shadow = 'none';
  }

  const fallbackStyle = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '24px',
    fontWeight: variant === 'ghost' ? 600 : 700,
    cursor: props.disabled ? 'not-allowed' : 'pointer',
    transition: 'all 0.2s',
    height: size === 'sm' ? '36px' : size === 'icon' ? '40px' : '48px',
    padding: size === 'icon' ? '0' : '0 24px',
    width: size === 'icon' ? '40px' : 'auto',
    border: variant === 'outline' ? '1px solid rgba(255,255,255,0.2)' : 'none',
    backgroundColor: bg,
    color: textColor,
    boxShadow: shadow,
    opacity: props.disabled ? 0.5 : 1,
    ...style
  };

  return (
    <Comp
      className={cn(
        "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
        buttonVariants[variant],
        buttonSizes[size],
        className
      )}
      style={fallbackStyle}
      onMouseEnter={(e) => {
        if (!props.disabled && !asChild) {
          e.currentTarget.style.backgroundColor = hoverBg;
          e.currentTarget.style.color = hoverTextColor;
          if (variant !== 'ghost' && variant !== 'outline') e.currentTarget.style.transform = 'translateY(-1px)';
        }
        if (props.onMouseEnter) props.onMouseEnter(e);
      }}
      onMouseLeave={(e) => {
        if (!props.disabled && !asChild) {
          e.currentTarget.style.backgroundColor = bg;
          e.currentTarget.style.color = textColor;
          if (variant !== 'ghost' && variant !== 'outline') e.currentTarget.style.transform = 'translateY(0)';
        }
        if (props.onMouseLeave) props.onMouseLeave(e);
      }}
      ref={ref}
      {...props}
    />
  )
})
Button.displayName = "Button"

export { Button }
