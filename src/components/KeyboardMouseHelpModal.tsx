import React from 'react';
import { Keyboard, Mouse, X, Sparkles, CornerDownLeft, RotateCcw, ArrowUpDown, Layers, Command } from 'lucide-react';

interface KeyboardMouseHelpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const KeyboardMouseHelpModal: React.FC<KeyboardMouseHelpModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-150">
      <div className="flex flex-col w-full max-w-2xl max-h-[90vh] bg-slate-900 border border-cyan-500/30 rounded-2xl shadow-2xl overflow-hidden text-slate-100">
        
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-slate-800 bg-slate-950/80">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-cyan-500/20 border border-cyan-500/30 text-cyan-400">
              <Keyboard className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold bg-gradient-to-r from-cyan-400 via-sky-300 to-purple-400 bg-clip-text text-transparent">
                Keyboard & Mouse Controls Guide
              </h2>
              <p className="text-xs text-slate-400">Full desktop & laptop keyboard shortcuts and mouse wheel controls</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
            title="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-5 overflow-y-auto space-y-4 text-xs">
          
          {/* Mouse Wheel & Click Section */}
          <div className="p-3.5 bg-slate-950/70 border border-slate-800 rounded-xl space-y-2">
            <div className="flex items-center gap-2 font-bold text-cyan-400 text-sm">
              <Mouse className="w-4 h-4" />
              Mouse Gestures & Smart Controls
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-300">
              <div className="p-2 rounded-lg bg-slate-900/80 border border-slate-800/80 flex items-start gap-2">
                <span className="px-1.5 py-0.5 rounded bg-cyan-950 text-cyan-300 font-mono text-[10px] border border-cyan-500/40 shrink-0">Scroll Wheel</span>
                <span>Scroll over calculator buttons to effortlessly flip between pages 1 through 6!</span>
              </div>
              <div className="p-2 rounded-lg bg-slate-900/80 border border-slate-800/80 flex items-start gap-2">
                <span className="px-1.5 py-0.5 rounded bg-rose-950 text-rose-300 font-mono text-[10px] border border-rose-500/40 shrink-0">Hold ⌫</span>
                <span>Click and hold mouse on the backspace button to rapidly delete characters.</span>
              </div>
              <div className="p-2 rounded-lg bg-slate-900/80 border border-slate-800/80 flex items-start gap-2">
                <span className="px-1.5 py-0.5 rounded bg-purple-950 text-purple-300 font-mono text-[10px] border border-purple-500/40 shrink-0">Double Click</span>
                <span>Double-click or right-click the LCD screen to instantly copy current number to clipboard.</span>
              </div>
              <div className="p-2 rounded-lg bg-slate-900/80 border border-slate-800/80 flex items-start gap-2">
                <span className="px-1.5 py-0.5 rounded bg-emerald-950 text-emerald-300 font-mono text-[10px] border border-emerald-500/40 shrink-0">Graph Zoom</span>
                <span>Use mouse wheel on 2D Graph canvas to zoom in/out smoothly around origin.</span>
              </div>
            </div>
          </div>

          {/* Standard Numeric & Operators */}
          <div className="p-3.5 bg-slate-950/70 border border-slate-800 rounded-xl space-y-2">
            <div className="flex items-center gap-2 font-bold text-amber-400 text-sm">
              <Command className="w-4 h-4" />
              Standard Typing & Calculations
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 font-mono text-[11px]">
              <div className="flex items-center justify-between p-2 rounded bg-slate-900 border border-slate-800">
                <span className="text-slate-400 font-sans">Numbers</span>
                <span className="text-cyan-300 font-bold">0 - 9, Numpad</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded bg-slate-900 border border-slate-800">
                <span className="text-slate-400 font-sans">Basic Math</span>
                <span className="text-amber-300 font-bold">+  -  *  /  %  ^</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded bg-slate-900 border border-slate-800">
                <span className="text-slate-400 font-sans">Factorial</span>
                <span className="text-emerald-300 font-bold">! or !!</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded bg-slate-900 border border-slate-800">
                <span className="text-slate-400 font-sans">Calculate</span>
                <span className="text-emerald-400 font-bold">Enter or =</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded bg-slate-900 border border-slate-800">
                <span className="text-slate-400 font-sans">Clear (AC)</span>
                <span className="text-rose-400 font-bold">Esc or Del</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded bg-slate-900 border border-slate-800">
                <span className="text-slate-400 font-sans">Backspace</span>
                <span className="text-rose-300 font-bold">Backspace</span>
              </div>
            </div>
          </div>

          {/* Quick Keys & Functions */}
          <div className="p-3.5 bg-slate-950/70 border border-slate-800 rounded-xl space-y-2">
            <div className="flex items-center gap-2 font-bold text-sky-400 text-sm">
              <Sparkles className="w-4 h-4" />
              Scientific Shortcuts & Variables
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 font-mono text-[11px]">
              <div className="flex items-center justify-between p-2 rounded bg-slate-900 border border-slate-800">
                <span className="text-slate-400 font-sans">Sine</span>
                <kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-cyan-300">s</kbd>
              </div>
              <div className="flex items-center justify-between p-2 rounded bg-slate-900 border border-slate-800">
                <span className="text-slate-400 font-sans">Square Root</span>
                <kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-cyan-300">q</kbd>
              </div>
              <div className="flex items-center justify-between p-2 rounded bg-slate-900 border border-slate-800">
                <span className="text-slate-400 font-sans">Pi (π)</span>
                <kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-cyan-300">p</kbd>
              </div>
              <div className="flex items-center justify-between p-2 rounded bg-slate-900 border border-slate-800">
                <span className="text-slate-400 font-sans">Euler's e</span>
                <kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-cyan-300">e</kbd>
              </div>
              <div className="flex items-center justify-between p-2 rounded bg-slate-900 border border-slate-800">
                <span className="text-slate-400 font-sans">Variables</span>
                <span className="text-slate-200">x, y, z, a, b</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded bg-slate-900 border border-slate-800">
                <span className="text-slate-400 font-sans">Complex</span>
                <kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-purple-300">i</kbd>
              </div>
              <div className="flex items-center justify-between p-2 rounded bg-slate-900 border border-slate-800">
                <span className="text-slate-400 font-sans">History Nav</span>
                <span className="text-amber-300 font-bold">↑  ↓</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded bg-slate-900 border border-slate-800">
                <span className="text-slate-400 font-sans">Page Flip</span>
                <span className="text-sky-300 font-bold">←  →</span>
              </div>
            </div>
          </div>

          {/* Hotkey Shortcuts */}
          <div className="p-3.5 bg-slate-950/70 border border-slate-800 rounded-xl space-y-2">
            <div className="flex items-center gap-2 font-bold text-purple-400 text-sm">
              <Layers className="w-4 h-4" />
              Global Hotkeys
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
              <div className="flex items-center justify-between p-2 rounded bg-slate-900 border border-slate-800">
                <span className="text-slate-300">Open AI Assistant</span>
                <kbd className="px-2 py-0.5 rounded bg-slate-800 text-cyan-300 font-mono">Alt + A or Ctrl + K</kbd>
              </div>
              <div className="flex items-center justify-between p-2 rounded bg-slate-900 border border-slate-800">
                <span className="text-slate-300">Toggle DEG / RAD</span>
                <kbd className="px-2 py-0.5 rounded bg-slate-800 text-cyan-300 font-mono">Alt + D</kbd>
              </div>
              <div className="flex items-center justify-between p-2 rounded bg-slate-900 border border-slate-800">
                <span className="text-slate-300">Toggle 2D Graph</span>
                <kbd className="px-2 py-0.5 rounded bg-slate-800 text-cyan-300 font-mono">Alt + G</kbd>
              </div>
              <div className="flex items-center justify-between p-2 rounded bg-slate-900 border border-slate-800">
                <span className="text-slate-300">Open 3D WebGL Graph</span>
                <kbd className="px-2 py-0.5 rounded bg-slate-800 text-cyan-300 font-mono">Alt + 3</kbd>
              </div>
              <div className="flex items-center justify-between p-2 rounded bg-slate-900 border border-slate-800">
                <span className="text-slate-300">Jump to Button Page 1..6</span>
                <kbd className="px-2 py-0.5 rounded bg-slate-800 text-cyan-300 font-mono">Alt + 1 .. 6</kbd>
              </div>
              <div className="flex items-center justify-between p-2 rounded bg-slate-900 border border-slate-800">
                <span className="text-slate-300">Show Keyboard Guide</span>
                <kbd className="px-2 py-0.5 rounded bg-slate-800 text-cyan-300 font-mono">Alt + H</kbd>
              </div>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="flex items-center justify-end px-5 py-3 border-t border-slate-800 bg-slate-950/80">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-slate-950 font-bold text-xs rounded-xl shadow-lg transition"
          >
            Got it
          </button>
        </div>

      </div>
    </div>
  );
};
