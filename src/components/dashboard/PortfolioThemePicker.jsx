'use client';
import { useState, useEffect } from 'react';
import { Palette, Sparkles, Eye, Check } from 'lucide-react';

const PRESET_GRADIENTS = [
  { name: 'Silver Slate', value: 'linear-gradient(135deg, #e2e8f0 0%, #94a3b8 100%)', c1: '#e2e8f0', c2: '#94a3b8', textColor: '#000000' },
  { name: 'Purple Dream', value: 'linear-gradient(135deg, #a855f7 0%, #6366f1 100%)', c1: '#a855f7', c2: '#6366f1', textColor: '#ffffff' },
  { name: 'Neon Mint', value: 'linear-gradient(135deg, #00ff88 0%, #00b4d8 100%)', c1: '#00ff88', c2: '#00b4d8', textColor: '#0f172a' },
  { name: 'Sunset Amber', value: 'linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)', c1: '#f59e0b', c2: '#ef4444', textColor: '#ffffff' },
  { name: 'Ocean Cyan', value: 'linear-gradient(135deg, #38bdf8 0%, #1e40af 100%)', c1: '#38bdf8', c2: '#1e40af', textColor: '#ffffff' },
  { name: 'Emerald Wave', value: 'linear-gradient(135deg, #10b981 0%, #047857 100%)', c1: '#10b981', c2: '#047857', textColor: '#ffffff' },
  { name: 'Dark Obsidian', value: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)', c1: '#1e293b', c2: '#0f172a', textColor: '#ffffff' },
  { name: 'Rose Bloom', value: 'linear-gradient(135deg, #f43f5e 0%, #fb7185 100%)', c1: '#f43f5e', c2: '#fb7185', textColor: '#ffffff' },
  { name: 'Golden Sun', value: 'linear-gradient(135deg, #fde047 0%, #d97706 100%)', c1: '#fde047', c2: '#d97706', textColor: '#0f172a' },
];

const PRESET_TEXT_COLORS = [
  { name: 'Black', value: '#000000', label: 'Black' },
  { name: 'White', value: '#ffffff', label: 'White' },
  { name: 'Dark Slate', value: '#0f172a', label: 'Dark' },
  { name: 'Light Gray', value: '#e2e8f0', label: 'Gray' },
];

// Helper to convert rgb(r, g, b) to hex
function rgbToHex(rgbStr) {
  if (!rgbStr) return '#94a3b8';
  if (rgbStr.startsWith('#')) return rgbStr;
  const match = rgbStr.match(/\d+/g);
  if (!match || match.length < 3) return '#94a3b8';
  const [r, g, b] = match.map(Number);
  return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

export default function PortfolioThemePicker({ 
  themeColor = '', 
  themeTextColor = '', 
  onThemeColorChange, 
  onThemeTextColorChange,
  projectTitle = 'Project Title'
}) {
  const [mode, setMode] = useState('gradient'); // 'gradient' | 'solid' | 'custom'
  const [color1, setColor1] = useState('#e2e8f0');
  const [color2, setColor2] = useState('#94a3b8');
  const [solidColor, setSolidColor] = useState('#e2e8f0');
  const [angle, setAngle] = useState('135deg');
  const [textColor, setTextColor] = useState('#000000');

  // Initial parse of incoming themeColor and themeTextColor
  useEffect(() => {
    if (themeTextColor) {
      setTextColor(rgbToHex(themeTextColor));
    } else {
      setTextColor('#000000');
    }
  }, [themeTextColor]);

  useEffect(() => {
    if (!themeColor) {
      setMode('gradient');
      setColor1('#e2e8f0');
      setColor2('#94a3b8');
      setAngle('135deg');
      return;
    }

    if (themeColor.includes('gradient')) {
      setMode('gradient');
      // Extract angle if present
      const angleMatch = themeColor.match(/(\d+)deg/);
      if (angleMatch) setAngle(`${angleMatch[1]}deg`);

      // Extract colors (hex or rgb)
      const colors = themeColor.match(/(#[0-9a-fA-F]{3,8}|rgba?\([^)]+\))/g);
      if (colors && colors.length >= 2) {
        setColor1(rgbToHex(colors[0]));
        setColor2(rgbToHex(colors[1]));
      }
    } else if (themeColor.startsWith('#') || themeColor.startsWith('rgb')) {
      setMode('solid');
      setSolidColor(rgbToHex(themeColor));
    } else {
      setMode('custom');
    }
  }, [themeColor]);

  // When gradient values change, notify parent
  const handleGradientChange = (newC1, newC2, newAngle) => {
    setColor1(newC1);
    setColor2(newC2);
    setAngle(newAngle);
    const gradVal = `linear-gradient(${newAngle}, ${newC1} 0%, ${newC2} 100%)`;
    onThemeColorChange(gradVal);
  };

  const handleSolidChange = (newColor) => {
    setSolidColor(newColor);
    onThemeColorChange(newColor);
  };

  const handleApplyPreset = (preset) => {
    onThemeColorChange(preset.value);
    if (preset.textColor) {
      onThemeTextColorChange(preset.textColor);
    }
  };

  const currentBg = themeColor || `linear-gradient(${angle}, ${color1} 0%, ${color2} 100%)`;
  const currentTextColor = themeTextColor || textColor || '#000000';

  return (
    <div 
      className="p-5 space-y-5 rounded-2xl"
      style={{
        backgroundColor: 'rgba(255, 255, 255, 0.02)',
        border: '1px solid rgba(255, 255, 255, 0.08)'
      }}
    >
      {/* Header */}
      <div 
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4"
        style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.08)' }}
      >
        <div className="flex items-center gap-2">
          <Palette className="w-5 h-5" style={{ color: '#52a436' }} />
          <h4 className="text-sm font-bold text-white tracking-wide">Project Card Theme (Background & Text)</h4>
        </div>
        
        {/* Mode Selector Tabs */}
        <div 
          className="flex items-center gap-1 p-1 rounded-xl self-start sm:self-auto"
          style={{
            backgroundColor: 'rgba(0, 0, 0, 0.4)',
            border: '1px solid rgba(255, 255, 255, 0.08)'
          }}
        >
          <button
            type="button"
            onClick={() => {
              setMode('gradient');
              onThemeColorChange(`linear-gradient(${angle}, ${color1} 0%, ${color2} 100%)`);
            }}
            style={{
              padding: '6px 14px',
              fontSize: '12px',
              fontWeight: 700,
              borderRadius: '8px',
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.2s',
              backgroundColor: mode === 'gradient' ? '#52a436' : 'transparent',
              color: mode === 'gradient' ? '#ffffff' : '#94a3b8',
              boxShadow: mode === 'gradient' ? '0 2px 10px rgba(82, 164, 54, 0.4)' : 'none'
            }}
          >
            Gradient
          </button>
          <button
            type="button"
            onClick={() => {
              setMode('solid');
              onThemeColorChange(solidColor);
            }}
            style={{
              padding: '6px 14px',
              fontSize: '12px',
              fontWeight: 700,
              borderRadius: '8px',
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.2s',
              backgroundColor: mode === 'solid' ? '#52a436' : 'transparent',
              color: mode === 'solid' ? '#ffffff' : '#94a3b8',
              boxShadow: mode === 'solid' ? '0 2px 10px rgba(82, 164, 54, 0.4)' : 'none'
            }}
          >
            Solid Color
          </button>
          <button
            type="button"
            onClick={() => setMode('custom')}
            style={{
              padding: '6px 14px',
              fontSize: '12px',
              fontWeight: 700,
              borderRadius: '8px',
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.2s',
              backgroundColor: mode === 'custom' ? '#52a436' : 'transparent',
              color: mode === 'custom' ? '#ffffff' : '#94a3b8',
              boxShadow: mode === 'custom' ? '0 2px 10px rgba(82, 164, 54, 0.4)' : 'none'
            }}
          >
            Custom CSS
          </button>
        </div>
      </div>

      <div 
        className="grid grid-cols-1 lg:grid-cols-12 gap-6"
        style={{ paddingTop: '12px' }}
      >
        {/* Left Area: Color Controls (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          {/* Mode: Gradient */}
          {mode === 'gradient' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Start Color Box */}
                <div 
                  className="flex items-center gap-3 p-3 rounded-xl"
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid rgba(255, 255, 255, 0.08)'
                  }}
                >
                  <div 
                    className="relative w-10 h-10 rounded-xl overflow-hidden shrink-0 cursor-pointer shadow-md"
                    style={{ border: '2px solid rgba(255, 255, 255, 0.2)', backgroundColor: color1 }}
                  >
                    <input
                      type="color"
                      value={color1}
                      onChange={(e) => handleGradientChange(e.target.value, color2, angle)}
                      className="absolute -top-3 -left-3 w-16 h-16 cursor-pointer opacity-0"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400">Color 1 (Start)</label>
                    <span className="font-mono text-xs font-bold text-white uppercase">{color1}</span>
                  </div>
                </div>

                {/* End Color Box */}
                <div 
                  className="flex items-center gap-3 p-3 rounded-xl"
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid rgba(255, 255, 255, 0.08)'
                  }}
                >
                  <div 
                    className="relative w-10 h-10 rounded-xl overflow-hidden shrink-0 cursor-pointer shadow-md"
                    style={{ border: '2px solid rgba(255, 255, 255, 0.2)', backgroundColor: color2 }}
                  >
                    <input
                      type="color"
                      value={color2}
                      onChange={(e) => handleGradientChange(color1, e.target.value, angle)}
                      className="absolute -top-3 -left-3 w-16 h-16 cursor-pointer opacity-0"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400">Color 2 (End)</label>
                    <span className="font-mono text-xs font-bold text-white uppercase">{color2}</span>
                  </div>
                </div>
              </div>

              {/* Gradient Direction Chips */}
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs text-slate-400 font-medium mr-1">Direction:</span>
                {[
                  { label: '↘ 135°', val: '135deg' },
                  { label: '→ 90°', val: '90deg' },
                  { label: '↓ 180°', val: '180deg' },
                  { label: '↗ 45°', val: '45deg' },
                ].map((d) => (
                  <button
                    key={d.val}
                    type="button"
                    onClick={() => handleGradientChange(color1, color2, d.val)}
                    style={{
                      padding: '4px 10px',
                      fontSize: '11px',
                      fontWeight: angle === d.val ? 700 : 500,
                      borderRadius: '8px',
                      cursor: 'pointer',
                      transition: 'all 0.15s',
                      backgroundColor: angle === d.val ? 'rgba(82, 164, 54, 0.25)' : 'rgba(255, 255, 255, 0.04)',
                      borderColor: angle === d.val ? '#52a436' : 'rgba(255, 255, 255, 0.1)',
                      borderWidth: '1px',
                      borderStyle: 'solid',
                      color: angle === d.val ? '#ffffff' : '#94a3b8'
                    }}
                  >
                    {d.label}
                  </button>
                ))}
              </div>

              {/* Presets Row */}
              <div className="space-y-2 pt-2">
                <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>Popular Gradient Presets (1-Click Apply):</span>
                </div>
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2">
                  {PRESET_GRADIENTS.map((p) => {
                    const isSelected = themeColor === p.value;
                    return (
                      <button
                        key={p.name}
                        type="button"
                        onClick={() => handleApplyPreset(p)}
                        title={`${p.name}`}
                        style={{
                          height: '40px',
                          borderRadius: '10px',
                          border: isSelected ? '2px solid #52a436' : '1px solid rgba(255, 255, 255, 0.15)',
                          background: p.value,
                          boxShadow: isSelected ? '0 0 12px rgba(82, 164, 54, 0.5)' : 'none',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          transition: 'transform 0.15s, border-color 0.15s',
                          transform: isSelected ? 'scale(1.05)' : 'scale(1)'
                        }}
                      >
                        {isSelected && (
                          <div 
                            style={{
                              backgroundColor: 'rgba(0, 0, 0, 0.6)',
                              borderRadius: '9999px',
                              padding: '2px',
                              color: '#52a436',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center'
                            }}
                          >
                            <Check className="w-3.5 h-3.5" />
                          </div>
                        )}
                        <span className="sr-only">{p.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* Mode: Solid */}
          {mode === 'solid' && (
            <div className="space-y-4">
              <div 
                className="flex items-center gap-3 p-3.5 rounded-xl"
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid rgba(255, 255, 255, 0.08)'
                }}
              >
                <div 
                  className="relative w-12 h-12 rounded-xl overflow-hidden shrink-0 cursor-pointer shadow-md"
                  style={{ border: '2px solid rgba(255, 255, 255, 0.2)', backgroundColor: solidColor }}
                >
                  <input
                    type="color"
                    value={solidColor}
                    onChange={(e) => handleSolidChange(e.target.value)}
                    className="absolute -top-3 -left-3 w-20 h-20 cursor-pointer opacity-0"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400">Card Background Color</label>
                  <input
                    type="text"
                    value={solidColor}
                    onChange={(e) => handleSolidChange(e.target.value)}
                    className="font-mono text-sm font-bold text-white bg-transparent border-0 p-0 focus:outline-none uppercase"
                  />
                </div>
              </div>

              {/* Quick Solid Colors */}
              <div className="space-y-2">
                <span className="text-xs text-slate-400 font-medium">Quick Solid Palette:</span>
                <div className="flex items-center gap-2 flex-wrap">
                  {['#e2e8f0', '#a855f7', '#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#1e293b', '#000000', '#ffffff'].map((c) => (
                    <button
                      key={c}
                      type="button"
                      onClick={() => handleSolidChange(c)}
                      style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '8px',
                        backgroundColor: c,
                        border: solidColor.toLowerCase() === c.toLowerCase() ? '2px solid #52a436' : '1px solid rgba(255, 255, 255, 0.15)',
                        boxShadow: solidColor.toLowerCase() === c.toLowerCase() ? '0 0 10px rgba(82, 164, 54, 0.5)' : 'none',
                        cursor: 'pointer',
                        transform: solidColor.toLowerCase() === c.toLowerCase() ? 'scale(1.1)' : 'scale(1)',
                        transition: 'transform 0.15s'
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Mode: Custom CSS */}
          {mode === 'custom' && (
            <div className="space-y-2">
              <label className="block text-xs font-semibold text-slate-300">Custom CSS Background</label>
              <input
                type="text"
                value={themeColor}
                onChange={(e) => onThemeColorChange(e.target.value)}
                placeholder="e.g. linear-gradient(135deg, #e2e8f0 0%, #94a3b8 100%)"
                style={{
                  width: '100%',
                  height: '44px',
                  padding: '0 16px',
                  fontSize: '12px',
                  fontFamily: 'monospace',
                  borderRadius: '12px',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  backgroundColor: 'rgba(0, 0, 0, 0.4)',
                  color: '#ffffff',
                  outline: 'none'
                }}
              />
              <p className="text-[11px] text-slate-400">Enter any valid CSS background value (hex, rgb, linear-gradient, etc.)</p>
            </div>
          )}

          {/* Hover Text Color Section */}
          <div 
            className="pt-3 space-y-3"
            style={{ borderTop: '1px solid rgba(255, 255, 255, 0.06)' }}
          >
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-300">
              Hover Text & Vertical Title Color
            </label>
            
            <div className="flex flex-col sm:flex-row sm:items-center gap-3">
              {/* Text Color Picker Box */}
              <div 
                className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl shrink-0"
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid rgba(255, 255, 255, 0.08)'
                }}
              >
                <div 
                  className="relative w-8 h-8 rounded-lg overflow-hidden shrink-0 cursor-pointer shadow-md"
                  style={{ border: '2px solid rgba(255, 255, 255, 0.2)', backgroundColor: textColor }}
                >
                  <input
                    type="color"
                    value={textColor}
                    onChange={(e) => {
                      setTextColor(e.target.value);
                      onThemeTextColorChange(e.target.value);
                    }}
                    className="absolute -top-3 -left-3 w-16 h-16 cursor-pointer opacity-0"
                  />
                </div>
                <input
                  type="text"
                  value={currentTextColor}
                  onChange={(e) => {
                    setTextColor(e.target.value);
                    onThemeTextColorChange(e.target.value);
                  }}
                  className="font-mono text-xs font-bold text-white bg-transparent border-0 p-0 focus:outline-none w-20 uppercase"
                />
              </div>

              {/* Quick Text Color Chips */}
              <div className="flex items-center gap-2 flex-wrap">
                {PRESET_TEXT_COLORS.map((t) => {
                  const isSelected = currentTextColor.toLowerCase() === t.value.toLowerCase();
                  return (
                    <button
                      key={t.value}
                      type="button"
                      onClick={() => {
                        setTextColor(t.value);
                        onThemeTextColorChange(t.value);
                      }}
                      style={{
                        padding: '6px 12px',
                        borderRadius: '10px',
                        fontSize: '12px',
                        fontWeight: isSelected ? 700 : 500,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        cursor: 'pointer',
                        transition: 'all 0.15s',
                        backgroundColor: isSelected ? 'rgba(82, 164, 54, 0.2)' : 'rgba(255, 255, 255, 0.04)',
                        border: isSelected ? '1px solid #52a436' : '1px solid rgba(255, 255, 255, 0.1)',
                        color: isSelected ? '#52a436' : '#cbd5e1'
                      }}
                    >
                      <span 
                        style={{
                          width: '10px',
                          height: '10px',
                          borderRadius: '9999px',
                          backgroundColor: t.value,
                          border: '1px solid rgba(255, 255, 255, 0.2)'
                        }}
                      />
                      {t.label}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Right Area: Live Interactive Preview (5 cols) */}
        <div className="lg:col-span-5 flex flex-col">
          <div className="flex items-center gap-1.5 text-xs text-slate-400 font-bold uppercase tracking-wider mb-2">
            <Eye className="w-3.5 h-3.5" style={{ color: '#52a436' }} />
            <span>Live Project Card Preview</span>
          </div>

          <div
            className="flex-1 min-h-[160px] rounded-2xl p-5 relative overflow-hidden flex flex-col justify-between"
            style={{ 
              background: currentBg,
              border: '1px solid rgba(255, 255, 255, 0.15)',
              boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.3)'
            }}
          >
            <div className="flex items-center justify-between">
              <span 
                className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md"
                style={{ 
                  color: currentTextColor,
                  backgroundColor: 'rgba(0, 0, 0, 0.15)'
                }}
              >
                Featured Project
              </span>
              <span 
                className="text-xs font-mono font-bold opacity-75"
                style={{ color: currentTextColor }}
              >
                01
              </span>
            </div>

            <div className="mt-6 space-y-1">
              <h5 
                className="text-lg font-black tracking-tight leading-tight line-clamp-1"
                style={{ color: currentTextColor }}
              >
                {projectTitle || 'Your Project Title'}
              </h5>
              <p 
                className="text-xs opacity-80 font-medium line-clamp-1"
                style={{ color: currentTextColor }}
              >
                Dynamic Website & Web App
              </p>
            </div>

            {/* Bottom mini indicator */}
            <div 
              className="pt-3 mt-3 flex items-center justify-between text-[10px] font-mono opacity-60" 
              style={{ 
                color: currentTextColor,
                borderTop: '1px solid rgba(0, 0, 0, 0.1)'
              }}
            >
              <span>card-theme-preview</span>
              <span>● live</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
