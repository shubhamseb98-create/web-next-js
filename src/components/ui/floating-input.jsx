"use client"
import * as React from "react"
import { cn } from "../../lib/utils"

const FloatingInput = React.forwardRef(({ className, type, label, id, rightElement, ...props }, ref) => {
  const inputId = id || React.useId()
  return (
    <div className="custom-floating-wrap">
      <input
        type={type}
        id={inputId}
        className={cn("custom-floating-input", className)}
        placeholder=" "
        ref={ref}
        {...props}
      />
      <label htmlFor={inputId} className="custom-floating-label">
        {label}
      </label>
      {rightElement && (
        <div style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', zIndex: 20 }}>
          {rightElement}
        </div>
      )}
    </div>
  )
})
FloatingInput.displayName = "FloatingInput"

const FloatingSelect = React.forwardRef(({ className, label, id, children, ...props }, ref) => {
  const selectId = id || React.useId()
  return (
    <div className="custom-floating-wrap" style={{ position: 'relative', width: '100%' }}>
      <select
        id={selectId}
        className={cn("custom-floating-input", className)}
        style={{ backgroundColor: 'rgba(255, 255, 255, 0.03)' }}
        ref={ref}
        {...props}
      >
        {children}
      </select>
      <label htmlFor={selectId} className="custom-floating-label" style={{ transform: 'translateY(-10px) scale(0.85)', color: '#94a3b8' }}>
        {label}
      </label>
      <div style={{ pointerEvents: 'none', position: 'absolute', right: '16px', top: '28px', transform: 'translateY(-50%)', color: '#94a3b8', zIndex: 5, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <svg style={{ width: '16px', height: '16px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
        </svg>
      </div>
    </div>
  )
})
FloatingSelect.displayName = "FloatingSelect"

const FloatingTextarea = React.forwardRef(({ className, label, id, rightElement, ...props }, ref) => {
  const textareaId = id || React.useId()
  return (
    <div className="custom-floating-wrap">
      <textarea
        id={textareaId}
        className={cn("custom-floating-input", className)}
        style={{ resize: 'vertical', minHeight: '100px' }}
        placeholder=" "
        ref={ref}
        {...props}
      />
      <label htmlFor={textareaId} className="custom-floating-label">
        {label}
      </label>
      {rightElement && (
        <div style={{ position: 'absolute', right: '12px', top: '10px', zIndex: 20 }}>
          {rightElement}
        </div>
      )}
    </div>
  )
})
FloatingTextarea.displayName = "FloatingTextarea"

export { FloatingInput, FloatingSelect, FloatingTextarea }
