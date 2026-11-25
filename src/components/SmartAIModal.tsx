import React, { useState, useMemo } from 'react';
import { Sparkles, HelpCircle, X, ArrowRight, Check, Copy } from 'lucide-react';
import { SMART_COMMANDS, SmartCommand, SmartContext, solvePromptQuery, SmartExecutionResult } from '../utils/smartEngine';

interface SmartAIModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenHelp: () => void;
  context: SmartContext;
}

export const SmartAIModal: React.FC<SmartAIModalProps> = ({
  isOpen,
  onClose,
  onOpenHelp,
  context,
}) => {
  const [inputVal, setInputVal] = useState<string>('');
  const [lastOutput, setLastOutput] = useState<SmartExecutionResult | null>(null);
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  // Suggestions based on input or category
  const suggestions = useMemo(() => {
    const q = inputVal.toLowerCase().trim();
    if (!q) {
      if (selectedCategory === 'All') return SMART_COMMANDS.slice(0, 7);
      return SMART_COMMANDS.filter((cmd) => cmd.category.toLowerCase() === selectedCategory.toLowerCase()).slice(0, 7);
    }
    return SMART_COMMANDS.filter((cmd) => {
      return (
        cmd.syntax.toLowerCase().includes(q) ||
        cmd.title.toLowerCase().includes(q) ||
        cmd.category.toLowerCase().includes(q) ||
        cmd.keywords.some((k) => k.toLowerCase().includes(q))
      );
    }).slice(0, 8);
  }, [inputVal, selectedCategory]);

  if (!isOpen) return null;

  const handleExecute = (overrideText?: string) => {
    const query = (overrideText || inputVal).trim();
    if (!query) return;

    // Use universal prompt solver to solve efficiently and place perfect result on display
    const out = solvePromptQuery(query, context);
    setLastOutput(out);
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const quickPrompts = [
    { label: '100! Factorial', query: 'factorial 100' },
    { label: 'Quadratic Solver', query: 'solve x^2 - 5x + 6 = 0' },
    { label: 'Symbolic Derivative', query: 'diff sin(x) * x^2' },
    { label: 'Definite Integral', query: 'integrate x^2 from 0 to 3' },
    { label: 'Molar Mass', query: 'molar mass H2SO4' },
    { label: 'GCD & LCM', query: 'gcd 48, 18' },
    { label: 'Matrix Det', query: 'det [1, 2; 3, 4]' },
    { label: 'Vector Cross', query: 'cross [1, 0, 0], [0, 1, 0]' },
    { label: 'Chemistry pH', query: 'ph 0.001' },
    { label: 'Unit Conversion', query: '100 C to F' },
    { label: '3D Surface', query: '3d' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-150">
      <div className="flex flex-col w-full max-w-xl max-h-[90vh] bg-slate-900 border border-cyan-500/30 rounded-2xl shadow-2xl overflow-hidden text-slate-100">
        
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-slate-800 bg-slate-950/80">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-gradient-to-br from-cyan-500/20 to-purple-500/20 border border-cyan-500/30 text-cyan-400">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold bg-gradient-to-r from-cyan-400 via-sky-300 to-purple-400 bg-clip-text text-transparent">
                AI Math & Scientific Assistant
              </h2>
              <p className="text-xs text-slate-400">Natural language solver for equations, calculus, chemistry, factorials, and matrices</p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={onOpenHelp}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
              title="Function Reference Handbook"
            >
              <HelpCircle className="w-5 h-5" />
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
              title="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="p-4 sm:p-5 flex flex-col gap-3.5 overflow-y-auto flex-1">
          
          {/* Input field */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label htmlFor="smartInput" className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                Ask AI / Enter Query
              </label>
              <span className="text-[10px] text-cyan-400 font-mono">Auto-updates display</span>
            </div>
            <div className="relative">
              <input
                id="smartInput"
                type="text"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleExecute();
                }}
                placeholder="e.g. solve x^2-5x+6=0, 100!, molar mass H2SO4, diff sin(x)*x^2, 100 C to F"
                className="w-full px-4 py-3 bg-slate-950 border border-slate-700/90 rounded-xl text-sm font-mono text-cyan-200 placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition shadow-inner"
                autoFocus
              />
            </div>
          </div>

          {/* Quick Prompts */}
          <div>
            <div className="text-[11px] text-slate-400 font-medium mb-1.5 flex items-center justify-between">
              <span>Quick Prompt Solvers:</span>
              <span className="text-[10px] text-slate-500">Click to solve immediately</span>
            </div>
            <div className="flex flex-wrap gap-1.5 max-h-24 overflow-y-auto pr-1">
              {quickPrompts.map((item) => (
                <button
                  key={item.label}
                  onClick={() => {
                    setInputVal(item.query);
                    handleExecute(item.query);
                  }}
                  className="px-2.5 py-1 rounded-lg bg-slate-800/90 hover:bg-cyan-500/20 text-slate-300 hover:text-cyan-300 border border-slate-700/70 hover:border-cyan-500/40 text-[11px] font-mono transition flex items-center gap-1 active:scale-95"
                >
                  <span>{item.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Execution Result Box */}
          {lastOutput && (
            <div className="p-3.5 rounded-xl bg-cyan-950/40 border border-cyan-500/40 flex flex-col gap-1.5 shadow-lg animate-in fade-in duration-150">
              <div className="flex items-center justify-between text-xs text-cyan-400 font-semibold border-b border-cyan-500/20 pb-1.5">
                <div className="flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-cyan-400" />
                  <span>Calculated & Sent to Display</span>
                </div>
                <button
                  onClick={() => handleCopy(lastOutput.result)}
                  className="px-2 py-0.5 rounded bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 text-[10px] font-mono transition flex items-center gap-1"
                >
                  {isCopied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  {isCopied ? 'Copied!' : 'Copy Result'}
                </button>
              </div>

              <div className="font-mono text-sm sm:text-base font-bold text-white break-all select-all py-1">
                = {lastOutput.result}
              </div>

              {lastOutput.details && (
                <div className="text-xs text-slate-300 font-sans leading-relaxed bg-slate-950/60 p-2.5 rounded-lg border border-slate-800/80">
                  {lastOutput.details}
                </div>
              )}
            </div>
          )}

          {/* Command Reference Browser */}
          <div className="border border-slate-800 rounded-xl bg-slate-950/60 p-2.5 flex flex-col gap-2">
            <div className="flex items-center justify-between px-1">
              <span className="text-[10px] font-mono uppercase text-slate-400">Available AI Functions ({suggestions.length})</span>
              <div className="flex items-center gap-1">
                {['All', 'Mathematics', 'Algebra', 'Calculus', 'Chemistry'].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-1.5 py-0.5 rounded text-[10px] transition ${
                      selectedCategory === cat
                        ? 'bg-cyan-500/30 text-cyan-300 font-bold'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-1 max-h-40 overflow-y-auto pr-1">
              {suggestions.map((cmd) => (
                <button
                  key={cmd.syntax}
                  onClick={() => {
                    setInputVal(cmd.syntax);
                    handleExecute(cmd.syntax);
                  }}
                  className="flex items-center justify-between p-2 rounded-lg hover:bg-slate-800/80 transition text-left group"
                >
                  <div className="flex flex-col min-w-0 pr-2">
                    <span className="text-xs font-semibold text-slate-200 group-hover:text-cyan-300 truncate">
                      {cmd.title}
                    </span>
                    <span className="text-[11px] font-mono text-cyan-400/80 truncate">{cmd.syntax}</span>
                  </div>
                  <span className="text-[9px] uppercase font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-400 shrink-0">
                    {cmd.category}
                  </span>
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-5 py-3 border-t border-slate-800 bg-slate-950/80">
          <button
            onClick={() => {
              setInputVal('');
              setLastOutput(null);
            }}
            className="text-xs text-slate-400 hover:text-slate-200 transition"
          >
            Clear
          </button>
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-slate-300 hover:text-white rounded-xl hover:bg-slate-800/60 transition"
            >
              Close
            </button>
            <button
              onClick={() => handleExecute()}
              className="px-5 py-2 bg-gradient-to-r from-cyan-500 via-sky-400 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-slate-950 font-bold text-xs rounded-xl shadow-lg shadow-cyan-500/20 active:scale-95 transition flex items-center gap-1.5"
            >
              Solve
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
