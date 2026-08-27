import * as React from "react"
import { cn } from "../../lib/utils"

const Card = React.forwardRef(({ className, style, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("rounded-2xl text-card-foreground", className)}
    style={{
      backgroundColor: '#0d150e',
      border: '1px solid #1e2e20',
      borderRadius: '16px',
      boxShadow: '0 0 35px -10px rgba(34, 197, 94, 0.10), 0 10px 30px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.05)',
      background: 'radial-gradient(ellipse 80% 45% at 50% 0%, rgba(34, 197, 94, 0.08), transparent 75%), #0d150e',
      overflow: 'hidden',
      ...style
    }}
    {...props}
  />
))
Card.displayName = "Card"

const CardHeader = React.forwardRef(({ className, style, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col", className)}
    style={{
      padding: '20px 28px',
      borderBottom: '1px solid #1e2e20',
      background: 'transparent',
      borderRadius: 0,
      display: 'flex',
      flexDirection: 'column',
      gap: '4px',
      ...style
    }}
    {...props}
  />
))
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef(({ className, style, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn("font-bold tracking-tight text-white", className)}
    style={{ margin: 0, fontSize: '18px', ...style }}
    {...props}
  />
))
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef(({ className, style, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-xs text-slate-400", className)}
    style={{ margin: 0, ...style }}
    {...props}
  />
))
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef(({ className, style, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(className)}
    style={{
      padding: '28px',
      background: 'transparent',
      borderRadius: 0,
      ...style
    }}
    {...props}
  />
))
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef(({ className, style, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center", className)}
    style={{
      padding: '18px 28px',
      borderTop: '1px solid #1e2e20',
      background: 'rgba(0, 0, 0, 0.2)',
      borderRadius: 0,
      ...style
    }}
    {...props}
  />
))
CardFooter.displayName = "CardFooter"

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }
