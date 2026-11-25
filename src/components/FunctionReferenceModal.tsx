import React, { useState, useMemo } from 'react';
import { BookOpen, Search, X, Play, Code, Check } from 'lucide-react';
import { SMART_COMMANDS, SmartCommand } from '../utils/smartEngine';

interface FunctionReferenceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectCommand: (syntax: string) => void;
}

export const FunctionReferenceModal: React.FC<FunctionReferenceModalProps> = ({
  isOpen,
  onClose,
  onSelectCommand,
}) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  // Group commands by category
  const filteredCommands = useMemo(() => {
    const q = searchTerm.toLowerCase().trim();
    if (!q) return SMART_COMMANDS;
    return SMART_COMMANDS.filter(
      (cmd) =>
        cmd.title.toLowerCase().includes(q) ||
        cmd.category.toLowerCase().includes(q) ||
        cmd.syntax.toLowerCase().includes(q) ||
        cmd.description.toLowerCase().includes(q)
    );
  }, [searchTerm]);

  const categories = useMemo(() => {
    const map = new Map<string, SmartCommand[]>();
    filteredCommands.forEach((cmd) => {
      const list = map.get(cmd.category) || [];
      list.push(cmd);
      map.set(cmd.category, list);
    });
    return Array.from(map.entries());
  }, [filteredCommands]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-6 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-150">
      <div className="flex flex-col w-full max-w-3xl h-[85vh] max-h-[720px] bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden text-slate-100">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/70">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                Function Reference Handbook
                <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300">
                  {filteredCommands.length} Functions
                </span>
              </h2>
              <p className="text-xs text-slate-400">Comprehensive reference for mathematical, calculus, and scientific functions</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search Bar */}
        <div className="p-4 border-b border-slate-800/80 bg-slate-900/90">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              id="functionSearch"
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search functions, syntax, or keywords (e.g. factorial, solve, diff, molar)..."
              className="w-full pl-10 pr-4 py-2 bg-slate-950 border border-slate-700 rounded-xl text-xs font-mono text-cyan-200 placeholder-slate-500 focus:outline-none focus:border-cyan-400"
            />
          </div>
        </div>

        {/* Content list */}
        <div id="functionMenuContent" className="flex-1 overflow-y-auto p-6 space-y-6">
          {categories.length === 0 ? (
            <div className="text-center py-12 text-slate-500 font-mono text-xs">
              No matching functions found for "{searchTerm}"
            </div>
          ) : (
            categories.map(([category, items]) => (
              <div key={category} className="space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                  {category}
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {items.map((cmd, idx) => (
                    <div
                      key={cmd.title}
                      className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800/80 hover:border-cyan-500/40 transition flex flex-col justify-between gap-2.5 group"
                    >
                      <div>
                        <div className="flex items-center justify-between">
                          <h4 className="text-xs font-bold text-slate-200 group-hover:text-cyan-300 transition">
                            {cmd.title}
                          </h4>
                          {cmd.title.includes('Factorial') && (
                            <span className="text-[10px] bg-gradient-to-r from-cyan-500/20 to-purple-500/20 text-cyan-300 px-2 py-0.5 rounded-full border border-cyan-500/30">
                              100+ Digits
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-slate-400 mt-1 line-clamp-2">
                          {cmd.description}
                        </p>
                      </div>

                      <div className="flex items-center justify-between gap-2 pt-2 border-t border-slate-800/60">
                        <code className="text-[11px] font-mono text-cyan-300 bg-slate-900 px-2 py-1 rounded border border-slate-800 truncate">
                          {cmd.syntax}
                        </code>
                        <button
                          onClick={() => {
                            onSelectCommand(cmd.syntax);
                            onClose();
                          }}
                          className="px-2.5 py-1 bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 text-xs font-semibold rounded-lg border border-cyan-500/40 transition flex items-center gap-1 active:scale-95 shrink-0"
                        >
                          <Play className="w-3 h-3 fill-current" />
                          Use
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-slate-800 bg-slate-950/60 flex items-center justify-between text-xs text-slate-400">
          <span>Click "Use" to instantly populate the calculator or AI prompt</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 transition"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
