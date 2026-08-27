import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cn } from "../../lib/utils"

const buttonVariants = {
  default: "bg-[#52a436] hover:bg-[#3e8027] text-white shadow-lg shadow-[#52a436]/30",
  destructive: "bg-red-600 text-white hover:bg-red-700 shadow-lg shadow-red-500/25",
  outline: "border border-white/20 bg-transparent hover:bg-white/10 text-white",
  secondary: "bg-white/10 text-white hover:bg-white/20",
  ghost: "bg-transparent text-slate-400 hover:text-white hover:bg-white/5",
  link: "text-[#52a436] underline-offset-4 hover:underline",
}

const buttonSizes = {
  default: "h-10 px-4 py-2",
  sm: "h-9 rounded-md px-3",
  lg: "h-11 rounded-md px-8",
  icon: "h-10 w-10",
}

const Button = React.forwardRef(({ className, variant = "default", size = "default", style, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "button"
  
  let bg = 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)';
  let hoverBg = 'linear-gradient(135deg, #16a34a 0%, #15803d 100%)';
  let textColor = 'white';
  let hoverTextColor = 'white';
  let shadow = '0 4px 14px rgba(34, 197, 94, 0.35)';
  let border = 'none';
  
  if (variant === 'ghost') {
    bg = 'transparent';
    hoverBg = 'rgba(255,255,255,0.05)';
    textColor = '#94a3b8';
    hoverTextColor = '#ffffff';
    shadow = 'none';
  } else if (variant === 'destructive') {
    bg = 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)';
    hoverBg = 'linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)';
    shadow = '0 4px 14px rgba(239, 68, 68, 0.35)';
  } else if (variant === 'outline') {
    bg = 'rgba(255,255,255,0.02)';
    hoverBg = 'rgba(255,255,255,0.06)';
    textColor = '#cbd5e1';
    hoverTextColor = '#ffffff';
    border = '1px solid #1e2e20';
    shadow = 'none';
  } else if (variant === 'secondary') {
    bg = 'rgba(255,255,255,0.05)';
    hoverBg = 'rgba(255,255,255,0.1)';
    textColor = '#ffffff';
    border = '1px solid #1e2e20';
    shadow = 'none';
  }

  const fallbackStyle = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '12px',
    fontWeight: 600,
    fontSize: size === 'sm' ? '12px' : '13px',
    cursor: props.disabled ? 'not-allowed' : 'pointer',
    transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
    height: size === 'sm' ? '32px' : size === 'icon' ? '36px' : '40px',
    padding: size === 'icon' ? '0' : size === 'sm' ? '0 14px' : '0 20px',
    width: size === 'icon' ? '36px' : 'auto',
    border: border,
    background: bg,
    color: textColor,
    boxShadow: shadow,
    opacity: props.disabled ? 0.5 : 1,
    ...style
  };

  return (
    <Comp
      className={cn(
        "inline-flex items-center justify-center whitespace-nowrap rounded-xl text-xs sm:text-sm font-semibold ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
        buttonVariants[variant],
        buttonSizes[size],
        className
      )}
      style={fallbackStyle}
      onMouseEnter={(e) => {
        if (!props.disabled && !asChild) {
          e.currentTarget.style.background = hoverBg;
          e.currentTarget.style.color = hoverTextColor;
          if (variant !== 'ghost' && variant !== 'outline') e.currentTarget.style.transform = 'translateY(-1px)';
        }
        if (props.onMouseEnter) props.onMouseEnter(e);
      }}
      onMouseLeave={(e) => {
        if (!props.disabled && !asChild) {
          e.currentTarget.style.background = bg;
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
