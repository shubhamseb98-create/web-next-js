'use client'
import { useState, useRef, useEffect } from 'react'
import { Sparkles, Loader2, ChevronDown, Check } from 'lucide-react'
import { toast } from 'react-hot-toast'

export default function AIAssistantButton({ 
  context, 
  field, 
  onGenerate, 
  isSchema = false 
}) {
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)
  const [schemaType, setSchemaType] = useState('Product')
  const dropdownRef = useRef(null)

  const schemaOptions = ['Product', 'FAQPage', 'Article', 'LocalBusiness', 'Organization']

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  // State for custom text prompt
  const [customPrompt, setCustomPrompt] = useState(context || '')
  const [isManuallyEdited, setIsManuallyEdited] = useState(false)

  // Update custom prompt if parent context changes, unless the user has manually edited it
  useEffect(() => {
    if (!isManuallyEdited) {
      setCustomPrompt(context || '')
    }
  }, [context, isManuallyEdited])

  async function handleGenerate(promptContext) {
    if (!promptContext || promptContext.trim() === '') {
      toast.error('Please provide some instructions or a title for AI context!')
      return
    }

    setLoading(true)
    try {
      const prompt = isSchema 
        ? `Generate valid JSON-LD ${schemaType} schema for a page about: ${promptContext}. Return ONLY valid JSON, no markdown formatting, no backticks.`
        : `Write a high-quality ${field} based on the following context/instructions: "${promptContext}". Be concise and professional. Return only the raw text, no formatting or markdown.`

      const res = await fetch('/api/system/ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt })
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Failed to generate')

      let generated = data.text;
      if (isSchema) {
        generated = generated.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim()
      }

      onGenerate(generated)
      toast.success('AI generated content successfully!')
      setOpen(false)
    } catch (err) {
      toast.error(err.message)
    } finally {
      setLoading(false)
    }
  }

  if (isSchema) {
    return (
      <div style={{ position: 'relative', display: 'inline-block' }} ref={dropdownRef}>
        <button 
          type="button" 
          onClick={() => setOpen(!open)}
          style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '11px', fontWeight: 'bold', color: '#c084fc', backgroundColor: 'rgba(192, 132, 252, 0.1)', padding: '4px 8px', borderRadius: '6px', border: 'none', cursor: 'pointer', transition: 'background-color 0.2s' }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(192, 132, 252, 0.2)'}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(192, 132, 252, 0.1)'}
        >
          <Sparkles style={{ width: '12px', height: '12px' }} />
          AI Schema
          <ChevronDown style={{ width: '12px', height: '12px' }} />
        </button>

        {open && (
          <div style={{ position: 'absolute', zIndex: 100, right: 0, marginTop: '8px', width: '224px', backgroundColor: '#1e293b', borderRadius: '12px', boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.5), 0 8px 10px -6px rgba(0, 0, 0, 0.5)', border: '1px solid rgba(255, 255, 255, 0.1)', padding: '12px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <p style={{ fontSize: '12px', fontWeight: 600, color: '#94a3b8', margin: 0 }}>Select Schema Type</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              {schemaOptions.map(opt => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => setSchemaType(opt)}
                  style={{ textAlign: 'left', fontSize: '14px', padding: '6px 8px', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', backgroundColor: schemaType === opt ? 'rgba(192, 132, 252, 0.15)' : 'transparent', color: schemaType === opt ? '#d8b4fe' : 'white', border: 'none', cursor: 'pointer' }}
                  onMouseEnter={(e) => { if (schemaType !== opt) e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.05)'; }}
                  onMouseLeave={(e) => { if (schemaType !== opt) e.currentTarget.style.backgroundColor = 'transparent'; }}
                >
                  {opt}
                  {schemaType === opt && <Check style={{ width: '14px', height: '14px' }} />}
                </button>
              ))}
            </div>
            <button
              type="button"
              onClick={() => handleGenerate(context)}
              disabled={loading || !context}
              style={{ width: '100%', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', backgroundColor: '#9333ea', color: 'white', borderRadius: '6px', fontSize: '12px', fontWeight: 600, border: 'none', cursor: loading || !context ? 'not-allowed' : 'pointer', opacity: loading || !context ? 0.5 : 1 }}
            >
              {loading ? <Loader2 style={{ width: '14px', height: '14px' }} className="animate-spin" /> : <Sparkles style={{ width: '14px', height: '14px' }} />}
              Generate {schemaType}
            </button>
          </div>
        )}
      </div>
    )
  }

  return (
    <div style={{ position: 'relative', display: 'inline-block', marginLeft: '8px' }} ref={dropdownRef}>
      <button 
        type="button" 
        onClick={() => {
          if (!customPrompt && context) setCustomPrompt(context);
          setOpen(!open);
        }}
        title={`Auto-generate ${field}`}
        style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '11px', fontWeight: 'bold', color: '#9333ea', backgroundColor: 'white', padding: '4px 10px', borderRadius: '6px', border: '1px solid #e2e8f0', cursor: 'pointer', transition: 'background-color 0.2s' }}
        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f8fafc'}
        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'white'}
      >
        <Sparkles style={{ width: '12px', height: '12px' }} />
        AI <ChevronDown style={{ width: '12px', height: '12px' }} />
      </button>

      {open && (
        <div style={{ position: 'absolute', zIndex: 100, right: 0, marginTop: '8px', width: '288px', backgroundColor: '#1e293b', borderRadius: '12px', boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.5), 0 8px 10px -6px rgba(0, 0, 0, 0.5)', border: '1px solid rgba(255, 255, 255, 0.1)', padding: '12px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <p style={{ fontSize: '12px', fontWeight: 600, color: '#94a3b8', margin: 0 }}>Instructions for {field}</p>
          <textarea
            value={customPrompt}
            onChange={(e) => {
              setIsManuallyEdited(true)
              setCustomPrompt(e.target.value)
            }}
            placeholder={`e.g. Write a compelling description about...`}
            style={{ width: '100%', fontSize: '14px', padding: '10px', backgroundColor: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', outline: 'none', resize: 'none', color: 'white', boxSizing: 'border-box' }}
            rows={3}
            onFocus={(e) => e.target.style.borderColor = '#c084fc'}
            onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
          />
          <button
            type="button"
            onClick={() => handleGenerate(customPrompt)}
            disabled={loading || !customPrompt.trim()}
            style={{ width: '100%', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', backgroundColor: '#9333ea', color: 'white', borderRadius: '6px', fontSize: '13px', fontWeight: 'bold', border: 'none', cursor: loading || !customPrompt.trim() ? 'not-allowed' : 'pointer', opacity: loading || !customPrompt.trim() ? 0.5 : 1 }}
          >
            {loading ? <Loader2 style={{ width: '16px', height: '16px' }} className="animate-spin" /> : <Sparkles style={{ width: '16px', height: '16px' }} />}
            Generate Content
          </button>
        </div>
      )}
    </div>
  )
}
