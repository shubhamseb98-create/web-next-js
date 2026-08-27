'use client';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../../../context/AuthContext';
import { Card, CardHeader, CardTitle, CardContent } from '../../../../components/ui/card';
import { Button } from '../../../../components/ui/button';
import { Sparkles, Key, FileText, Search, Languages, MessageSquare, Copy, Check, Zap, ChevronDown } from 'lucide-react';
import Breadcrumb from '../../../../components/dashboard/Breadcrumb';
import Toast from '../../../../components/dashboard/Toast';
import { cn } from '../../../../lib/utils';

function CustomSelect({ label, value, options, onChange }) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selectedOption = options?.find(opt => opt.value === value) || options?.[0];

  return (
    <div className="relative" ref={dropdownRef}>
      {label && <label className="block text-xs sm:text-sm font-semibold text-slate-200 mb-1.5">{label}</label>}
      <button
        type="button"
        onClick={() => setOpen(prev => !prev)}
        className="w-full flex items-center justify-between bg-[#111912] hover:bg-[#142016] border border-[#233526] hover:border-[#52a436]/60 px-3.5 py-2 text-sm text-white font-medium transition-all shadow-xs focus:outline-none focus:ring-1 focus:ring-[#52a436]/40 cursor-pointer"
        style={{ height: '42px', borderRadius: '6px' }}
      >
        <span className="truncate">{selectedOption?.label || 'Select option'}</span>
        <ChevronDown className={cn("w-4 h-4 text-slate-400 transition-transform duration-200 shrink-0 ml-2", open && "rotate-180 text-[#52a436]")} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.1 }}
            className="absolute left-0 right-0 z-50 mt-1 bg-[#111912] border border-[#233526] shadow-2xl shadow-black/90 p-1 overflow-hidden"
            style={{ borderRadius: '6px', boxShadow: '0 12px 28px -4px rgba(0, 0, 0, 0.85), 0 0 0 1px rgba(255, 255, 255, 0.05)' }}
          >
            <div className="max-h-56 overflow-y-auto space-y-0.5" style={{ scrollbarWidth: 'none' }}>
              {options.map((opt) => {
                const isSelected = (value || options[0]?.value) === opt.value;
                return (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => {
                      onChange(opt.value);
                      setOpen(false);
                    }}
                    className={cn(
                      "w-full flex items-center justify-between px-3 py-2 text-[13.5px] transition-all text-left font-normal cursor-pointer",
                      isSelected
                        ? "bg-[#52a436]/15 text-[#52a436] font-semibold"
                        : "text-slate-300 hover:text-white hover:bg-white/[0.06]"
                    )}
                    style={{ borderRadius: '4px' }}
                  >
                    <span>{opt.label}</span>
                    {isSelected && <Check className="w-3.5 h-3.5 text-[#52a436] shrink-0 ml-2" />}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function AIFeaturesManagement() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('content');
  const [loading, setLoading] = useState(true);
  const [toasts, setToasts] = useState([]);

  // API Key States
  const [keys, setKeys] = useState({ openRouterApiKey: '', groqApiKey: '', cerebrasApiKey: '', geminiApiKey: '' });
  const [preferredProvider, setPreferredProvider] = useState('auto');

  // AI Tool States
  const [isGenerating, setIsGenerating] = useState(false);
  const [prompt, setPrompt] = useState('');
  const [extraContext, setExtraContext] = useState('');
  const [result, setResult] = useState('');
  const [usedProvider, setUsedProvider] = useState('');
  const [copied, setCopied] = useState(false);

  const addToast = (msg, type = 'success') => setToasts(t => [...t, { id: Date.now(), message: msg, type }]);

  useEffect(() => { fetchSettings(); }, []);

  const fetchSettings = async () => {
    try {
      const res = await fetch('/api/global-settings');
      const data = await res.json();
      if (data.success && data.data) {
        setKeys({
          openRouterApiKey: data.data.openRouterApiKey || '',
          groqApiKey: data.data.groqApiKey || '',
          cerebrasApiKey: data.data.cerebrasApiKey || '',
          geminiApiKey: data.data.geminiApiKey || '',
        });
        setPreferredProvider(data.data.preferredAiProvider || 'auto');
      }
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  };

  const generateAIContent = async (taskType) => {
    if (!prompt.trim()) { addToast('Please enter a prompt', 'error'); return; }
    try {
      setIsGenerating(true);
      setResult('');
      setUsedProvider('');

      const res = await fetch('/api/system/ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${localStorage.getItem('token')}` },
        body: JSON.stringify({ prompt, taskType, extraContext })
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setResult(data.text);
        setUsedProvider(data.provider || '');
        addToast(`Generated via ${data.provider || 'AI'}!`);
      } else {
        addToast(data.error || 'AI generation failed', 'error');
      }
    } catch { addToast('Server error occurred', 'error'); }
    finally { setIsGenerating(false); }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const renderToolInterface = (taskType, title, description, promptLabel, contextLabel, contextOptions) => (
    <Card className="border border-[#253828] bg-[#0d140e] shadow-xl overflow-hidden mt-5" style={{ borderRadius: '6px' }}>
      <CardHeader className="bg-[#121c13] border-b border-[#253828]" style={{ padding: '14px 20px', borderRadius: 0 }}>
        <CardTitle className="font-bold flex items-center gap-2 text-white" style={{ fontSize: '15px' }}>
          <Sparkles className="w-4 h-4 text-[#52a436]" />
          <span>{title}</span>
        </CardTitle>
        <p className="text-xs text-slate-400 mt-0.5 leading-normal">{description}</p>
      </CardHeader>
      <CardContent style={{ padding: '20px' }}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            {contextLabel && contextOptions && (
              <CustomSelect
                label={contextLabel}
                value={extraContext}
                options={contextOptions}
                onChange={setExtraContext}
              />
            )}
            <div>
              <label className="block text-xs sm:text-sm font-semibold text-slate-200 mb-1.5">{promptLabel}</label>
              <textarea
                rows={6}
                className="w-full bg-[#0e1610] border border-[#253828] focus:border-[#52a436]/60 px-3.5 py-2.5 focus:ring-1 focus:ring-[#52a436]/30 resize-none text-sm text-white placeholder-slate-500 transition-all outline-none"
                placeholder="Enter your text or topic here..."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                style={{ borderRadius: '6px' }}
              />
            </div>
            <Button
              onClick={() => generateAIContent(taskType)}
              disabled={isGenerating || !prompt}
              className="w-full h-11 bg-[#52a436] hover:bg-[#3e8027] text-white font-bold shadow-sm shadow-[#52a436]/20 transition-all cursor-pointer text-sm"
              style={{ borderRadius: '6px' }}
            >
              {isGenerating ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Generating...
                </span>
              ) : (
                <span className="flex items-center gap-2"><Zap className="w-4 h-4" /> Generate Content</span>
              )}
            </Button>
          </div>

          <div className="flex flex-col h-full relative">
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs sm:text-sm font-semibold text-slate-200 flex items-center gap-2">
                Output Result
                {usedProvider && (
                  <span className="text-[11px] font-bold px-2 py-0.5 bg-[#52a436]/20 text-[#52a436] border border-[#52a436]/30" style={{ borderRadius: '4px' }}>
                    via {usedProvider}
                  </span>
                )}
              </label>
              {result && (
                <button onClick={copyToClipboard} className="text-xs flex items-center gap-1.5 text-slate-400 hover:text-white px-2 py-1 bg-white/[0.05] hover:bg-white/[0.1] transition-all cursor-pointer" style={{ borderRadius: '4px' }}>
                  {copied ? <Check className="w-3.5 h-3.5 text-[#52a436]" /> : <Copy className="w-3.5 h-3.5 text-slate-400" />}
                  {copied ? 'Copied!' : 'Copy'}
                </button>
              )}
            </div>
            <div className="flex-1 min-h-[240px] w-full bg-[#0e1610] border border-[#253828] p-3.5 overflow-y-auto whitespace-pre-wrap font-sans text-sm text-slate-200 leading-relaxed" style={{ borderRadius: '6px' }}>
              {isGenerating ? (
                <div className="h-full flex flex-col items-center justify-center text-slate-400 space-y-3">
                  <Sparkles className="w-6 h-6 animate-pulse text-[#52a436]" />
                  <span className="text-sm">AI is thinking...</span>
                </div>
              ) : result ? (
                <div dangerouslySetInnerHTML={{ __html: result.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\n/g, '<br/>') }} />
              ) : (
                <div className="h-full flex items-center justify-center text-slate-500 text-xs italic">
                  Results will appear here
                </div>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  if (loading) return (
    <div className="p-8 flex justify-center">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#52a436]" />
    </div>
  );

  return (
    <div className="min-h-full flex flex-col bg-background">
      <div className="p-4 sm:p-6 lg:p-8 flex-1 max-w-[1600px] w-full mx-auto">
        <Breadcrumb items={[{ label: 'Dashboard', href: '/dashboard' }, { label: 'Advanced', href: '#' }, { label: 'AI Features' }]} />

        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-white mb-2 flex items-center gap-3">
            <Sparkles className="w-8 h-8 text-[#52a436]" />
            AI Features Management
          </h1>
          <p className="text-slate-400 max-w-3xl">
            Multi-provider AI engine with automatic fallback. Uses the best available free provider — if one runs out of quota, it instantly switches to the next.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6 border-b border-[#253828] pb-3">
          <div className="flex flex-wrap gap-2">
            {[
              { key: 'content', label: 'Content Generator', icon: FileText },
              { key: 'seo', label: 'SEO Optimizer', icon: Search },
              { key: 'translate', label: 'Translator', icon: Languages },
              { key: 'grammar', label: 'Grammar & Tone', icon: MessageSquare },
            ].map(({ key, label, icon: Icon }) => (
              <button
                key={key}
                onClick={() => { setActiveTab(key); setResult(''); setPrompt(''); setExtraContext(''); }}
                className={cn(
                  "px-4 py-2.5 rounded-xl text-sm font-semibold flex items-center gap-2 transition-all cursor-pointer",
                  activeTab === key
                    ? "bg-[#52a436]/20 text-[#52a436] border border-[#52a436]/40 shadow-sm"
                    : "text-slate-400 hover:text-white hover:bg-white/[0.05] border border-transparent"
                )}
              >
                <Icon className="w-4 h-4" /> {label}
              </button>
            ))}
          </div>
          
          <a href="/dashboard/profile/api-keys" className="px-4 py-2 bg-[#0e1610] hover:bg-[#142016] text-slate-300 hover:text-white rounded-xl text-sm font-semibold flex items-center gap-2 transition-colors border border-[#253828]">
            <Key className="w-4 h-4 text-[#52a436]" /> Manage API Keys Securely
          </a>
        </div>

        {/* ── Content Tab ── */}
        {activeTab === 'content' && renderToolInterface('generate_content', 'AI Content Generator', 'Give the AI a topic and it will write a complete blog post, email, or description for you.', 'What would you like to write about?', null, null)}
        {activeTab === 'seo' && renderToolInterface('seo_optimize', 'SEO Meta Optimizer', 'Paste your page content or target topic and get an optimized Title, Description, and Keywords.', 'Page Content or Target Topic', null, null)}
        {activeTab === 'translate' && renderToolInterface('translate', 'AI Translator', 'Instantly translate your text into another language with high contextual accuracy.', 'Text to Translate', 'Target Language', [
          { value: 'Spanish', label: 'Spanish' },
          { value: 'French', label: 'French' },
          { value: 'German', label: 'German' },
          { value: 'Hindi', label: 'Hindi' },
          { value: 'Arabic', label: 'Arabic' },
          { value: 'Chinese', label: 'Chinese (Simplified)' },
        ])}
        {activeTab === 'grammar' && renderToolInterface('grammar_tone', 'Grammar & Tone Checker', "Paste your draft and let the AI fix grammatical errors and adjust the tone of voice.", 'Your Draft Text', 'Desired Tone', [
          { value: 'Professional', label: 'Professional / Corporate' },
          { value: 'Casual', label: 'Casual / Friendly' },
          { value: 'Persuasive', label: 'Persuasive / Sales' },
          { value: 'Academic', label: 'Academic / Formal' },
        ])}

        <Toast toasts={toasts} onRemove={id => setToasts(t => t.filter(x => x.id !== id))} />
      </div>
    </div>
  );
}
