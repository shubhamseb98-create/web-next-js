"use client"
import * as React from "react"
import { Hash } from "lucide-react"

const injectedCss = `
  .sort-input-wrap { position: relative; width: 100%; }
  .sort-input {
    display: block;
    width: 100%;
    height: 56px;
    box-sizing: border-box;
    padding: 24px 36px 8px 16px;
    background-color: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 12px;
    color: white;
    font-size: 14px;
    outline: none;
    transition: border-color 0.2s, background-color 0.2s;
    appearance: none;
  }
  .sort-input:focus {
    border-color: rgba(255, 255, 255, 0.2);
    background-color: rgba(255, 255, 255, 0.05);
  }
  .sort-input.auto-mode {
    border-color: rgba(245, 158, 11, 0.3);
  }
  .sort-input.auto-mode:focus {
    border-color: rgba(245, 158, 11, 0.5);
  }
  .sort-label {
    position: absolute;
    left: 16px;
    top: 18px;
    font-size: 14px;
    font-weight: 500;
    color: #94a3b8;
    pointer-events: none;
    transition: all 0.2s ease-out;
    transform-origin: left top;
  }
  .sort-input:focus ~ .sort-label,
  .sort-input:not(:placeholder-shown) ~ .sort-label {
    transform: translateY(-10px) scale(0.85);
    color: #cbd5e1;
  }
  .sort-input.auto-mode:focus ~ .sort-label,
  .sort-input.auto-mode:not(:placeholder-shown) ~ .sort-label {
    color: #d97706;
  }
`;

export function SortInput({
  value = '',
  onChange,
  isEditing = false,
  isAuto = false,
  onManualEdit,
  label = 'Sort Order',
  min = 1,
}) {
  const inputId = React.useId()

  function handleChange(e) {
    if (isAuto && onManualEdit) onManualEdit()
    onChange(e.target.value)
  }

  const showAuto = isAuto && !isEditing

  return (
    <>
      <style>{injectedCss}</style>
      <div className="sort-input-wrap">
        <input
          id={inputId}
          type="number"
          min={min}
          value={value}
          onChange={handleChange}
          placeholder=" "
          className={`sort-input ${showAuto ? 'auto-mode' : ''}`}
        />
        <label htmlFor={inputId} className="sort-label" style={{ color: showAuto ? '#d97706' : undefined }}>
          {label}
        </label>

        {/* Auto badge icon */}
        <div
          title={showAuto ? "Auto-calculated from existing records. You can edit it manually." : "Sort order"}
          style={{ position: 'absolute', right: '12px', top: '16px', color: showAuto ? '#f59e0b' : 'rgba(148, 163, 184, 0.4)' }}
        >
          <Hash style={{ width: '14px', height: '14px' }} />
        </div>

        {/* Hint text */}
        {!isEditing && (
          <p style={{ marginTop: '6px', fontSize: '11px', padding: '0 4px', display: 'flex', alignItems: 'center', gap: '4px', color: showAuto ? '#d97706' : 'rgba(148, 163, 184, 0.6)' }}>
            {showAuto ? (
              <>Auto-set to {value} — you can change it manually</>
            ) : (
              <>Display order in the list (lower = first)</>
            )}
          </p>
        )}
      </div>
    </>
  )
}
