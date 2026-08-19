import * as React from "react"
import { cn } from "../../lib/utils"

const Switch = React.forwardRef(({ className, checked, onCheckedChange, disabled, ...props }, ref) => (
  <button
    type="button"
    role="switch"
    aria-checked={checked}
    data-state={checked ? "checked" : "unchecked"}
    disabled={disabled}
    onClick={(e) => {
      e.stopPropagation();
      onCheckedChange?.(!checked);
    }}
    className={cn(className)}
    style={{
      position: 'relative',
      display: 'inline-flex',
      height: '24px',
      width: '44px',
      flexShrink: 0,
      cursor: disabled ? 'not-allowed' : 'pointer',
      alignItems: 'center',
      borderRadius: '9999px',
      border: '2px solid transparent',
      transition: 'background-color 0.2s ease-in-out',
      backgroundColor: checked ? '#2563eb' : 'rgba(255, 255, 255, 0.1)',
      opacity: disabled ? 0.5 : 1,
    }}
    {...props}
    ref={ref}
  >
    <span
      data-state={checked ? "checked" : "unchecked"}
      style={{
        pointerEvents: 'none',
        display: 'block',
        height: '20px',
        width: '20px',
        borderRadius: '9999px',
        backgroundColor: '#ffffff',
        boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
        transition: 'transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
        transform: checked ? 'translateX(20px)' : 'translateX(0)',
      }}
    />
  </button>
))
Switch.displayName = "Switch"

export { Switch }
