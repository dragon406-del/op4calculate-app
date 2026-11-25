/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { 
  calculatorEngine, 
  EngineState, 
} from './utils/calculatorEngine';
import { formatLargeNumber } from './utils/factorial';
import { ThreeGraph3D } from './components/ThreeGraph3D';
import { Graph2D } from './components/Graph2D';
import { SmartAIModal } from './components/SmartAIModal';
import { FunctionReferenceModal } from './components/FunctionReferenceModal';
import { SolverModal, SolverTab } from './components/SolverModal';
import { ChemistrySolverModal } from './components/ChemistrySolverModal';
import { KeyboardMouseHelpModal } from './components/KeyboardMouseHelpModal';
import { 
  StopwatchModal, 
  TimerModal, 
  WorldClockModal, 
  CalendarModal, 
  VectorModal, 
  PeriodicTableModal,
  AlphaModal,
  SequenceModal,
  ConstantsModal,
  ProgrammingModal,
  TableModal
} from './components/ToolsModals';
import { 
  Sparkles, 
  Settings as SettingsIcon, 
  Menu, 
  Copy, 
  Check, 
  Clock, 
  Calendar as CalendarIcon, 
  History as HistoryIcon,
  Trash2,
  Keyboard as KeyboardIcon
} from 'lucide-react';

/* ========================================================================= */
/*       MEMOIZED ISOLATED CLOCK BAR (Prevents full-chassis re-renders)      */
/* ========================================================================= */
const LiveClockBar = React.memo(({ 
  onOpenWorldClock, 
  onOpenCalendar 
}: { 
  onOpenWorldClock: () => void; 
  onOpenCalendar: () => void; 
}) => {
  const [time, setTime] = useState<string>('');
  const [date, setDate] = useState<string>('');

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
      setDate(now.toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric' }));
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="infoPanel flex items-center justify-between h-7 px-3 bg-slate-950/90 rounded-lg border border-slate-800/90 text-[11px] font-mono text-slate-400 select-none shadow-sm">
      <div 
        id="liveClock"
        onClick={onOpenWorldClock}
        className="flex items-center gap-1.5 text-cyan-400 hover:text-cyan-300 cursor-pointer font-bold transition"
        title="Click to view World Clock"
      >
        <Clock className="w-3 h-3 text-cyan-400" />
        <span>{time || '00:00:00'}</span>
      </div>

      <div 
        id="liveDate"
        onClick={onOpenCalendar}
        className="flex items-center gap-1.5 text-slate-400 hover:text-slate-200 cursor-pointer transition"
        title="Click to view Calendar"
      >
        <CalendarIcon className="w-3 h-3 text-slate-500" />
        <span>{date || 'Loading...'}</span>
      </div>
    </div>
  );
});

export default function App() {
  const [engineState, setEngineState] = useState<EngineState>(calculatorEngine.getState());
  const [currentButtonPage, setCurrentButtonPage] = useState<number>(1);
  const [isPageMenuOpen, setIsPageMenuOpen] = useState<boolean>(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const [displayToast, setDisplayToast] = useState<string | null>(null);
  const [isGrouped, setIsGrouped] = useState<boolean>(false);
  const [themeLight, setThemeLight] = useState<boolean>(false);

  // Modals state
  const [is3DOpen, setIs3DOpen] = useState<boolean>(false);
  const [isAIOpen, setIsAIOpen] = useState<boolean>(false);
  const [isFunctionMenuOpen, setIsFunctionMenuOpen] = useState<boolean>(false);
  const [isStopwatchOpen, setIsStopwatchOpen] = useState<boolean>(false);
  const [isTimerOpen, setIsTimerOpen] = useState<boolean>(false);
  const [isWorldClockOpen, setIsWorldClockOpen] = useState<boolean>(false);
  const [isCalendarOpen, setIsCalendarOpen] = useState<boolean>(false);
  const [isVectorMenuOpen, setIsVectorMenuOpen] = useState<boolean>(false);
  const [isPeriodicTableOpen, setIsPeriodicTableOpen] = useState<boolean>(false);
  const [show2DGraph, setShow2DGraph] = useState<boolean>(false);
  const [isHelpOpen, setIsHelpOpen] = useState<boolean>(false);

  // Advanced Solvers & Tools modals
  const [solverState, setSolverState] = useState<{ isOpen: boolean; tab: SolverTab }>({
    isOpen: false,
    tab: 'solve',
  });
  const [isAlphaOpen, setIsAlphaOpen] = useState<boolean>(false);
  const [isSequenceOpen, setIsSequenceOpen] = useState<boolean>(false);
  const [isConstantsOpen, setIsConstantsOpen] = useState<boolean>(false);
  const [isProgOpen, setIsProgOpen] = useState<boolean>(false);
  const [isTableOpen, setIsTableOpen] = useState<boolean>(false);
  const [isChemistryOpen, setIsChemistryOpen] = useState<boolean>(false);

  const historyIndexRef = useRef<number>(-1);
  const lastWheelTimeRef = useRef<number>(0);
  const backspaceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const backspaceIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const openSolver = (tab: SolverTab) => {
    setSolverState({ isOpen: true, tab });
  };

  // Subscribe to engine state
  useEffect(() => {
    const unsub = calculatorEngine.subscribe((state) => {
      setEngineState(state);
    });
    return unsub;
  }, []);

  // Continuous Backspace hold handler for mouse and touch
  const startContinuousBackspace = useCallback(() => {
    calculatorEngine.backspace();
    backspaceTimerRef.current = setTimeout(() => {
      backspaceIntervalRef.current = setInterval(() => {
        calculatorEngine.backspace();
      }, 75);
    }, 350);
  }, []);

  const stopContinuousBackspace = useCallback(() => {
    if (backspaceTimerRef.current) clearTimeout(backspaceTimerRef.current);
    if (backspaceIntervalRef.current) clearInterval(backspaceIntervalRef.current);
    backspaceTimerRef.current = null;
    backspaceIntervalRef.current = null;
  }, []);

  // Mouse wheel page flipping: scroll over buttons to cycle 1-6 seamlessly
  const handleButtonsWheel = useCallback((e: React.WheelEvent) => {
    const now = Date.now();
    if (now - lastWheelTimeRef.current < 160) return;
    lastWheelTimeRef.current = now;

    if (e.deltaY > 0) {
      setCurrentButtonPage((p) => (p < 6 ? p + 1 : 1));
    } else if (e.deltaY < 0) {
      setCurrentButtonPage((p) => (p > 1 ? p - 1 : 6));
    }
  }, []);

  // Copy display value with visual feedback
  const handleCopyDisplay = useCallback(() => {
    const val = engineState.display || '0';
    navigator.clipboard.writeText(val);
    setDisplayToast('Copied to clipboard');
    setTimeout(() => setDisplayToast(null), 1800);
  }, [engineState.display]);

  // Comprehensive Keyboard & Mouse navigation listener
  const isAnyModalOpen = is3DOpen || isAIOpen || isFunctionMenuOpen || 
    isStopwatchOpen || isTimerOpen || isWorldClockOpen || isCalendarOpen || 
    isVectorMenuOpen || isPeriodicTableOpen || solverState.isOpen || 
    isAlphaOpen || isSequenceOpen || isConstantsOpen || isProgOpen || 
    isTableOpen || isChemistryOpen || isHelpOpen;

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;

      // If a modal is open and user is typing in a modal input, don't intercept
      if (isAnyModalOpen && target && ['INPUT', 'TEXTAREA'].includes(target.tagName) && target.id !== 'display') {
        return;
      }

      const isDisplayInput = target?.id === 'display';

      // 1. Enter or Equals: calculate
      if (e.key === 'Enter' || e.code === 'NumpadEnter' || (e.key === '=' && !e.shiftKey)) {
        e.preventDefault();
        calculatorEngine.calculate();
        historyIndexRef.current = -1;
        return;
      }

      // 2. Escape: clear AC
      if (e.key === 'Escape') {
        e.preventDefault();
        calculatorEngine.clear();
        historyIndexRef.current = -1;
        return;
      }

      // 3. Alt shortcuts
      if (e.altKey) {
        if (e.key >= '1' && e.key <= '6') {
          e.preventDefault();
          setCurrentButtonPage(Number(e.key));
          return;
        }
        if (e.key.toLowerCase() === 'd') {
          e.preventDefault();
          calculatorEngine.toggleDegreeMode();
          return;
        }
        if (e.key.toLowerCase() === 'a') {
          e.preventDefault();
          setIsAIOpen(true);
          return;
        }
        if (e.key.toLowerCase() === 'g') {
          e.preventDefault();
          setShow2DGraph((prev) => !prev);
          return;
        }
        if (e.key === '3') {
          e.preventDefault();
          setIs3DOpen(true);
          return;
        }
        if (e.key.toLowerCase() === 'h') {
          e.preventDefault();
          setIsHelpOpen((prev) => !prev);
          return;
        }
      }

      // 4. Ctrl+K or / (when not typing in display) opens AI assistant
      if ((e.ctrlKey && e.key.toLowerCase() === 'k') || (e.key === '/' && !isDisplayInput)) {
        e.preventDefault();
        setIsAIOpen(true);
        return;
      }

      // 5. Page Navigation via ArrowLeft / ArrowRight or PageUp / PageDown
      if (!isDisplayInput) {
        if (e.key === 'ArrowRight' || e.key === 'PageDown') {
          e.preventDefault();
          setCurrentButtonPage((p) => (p < 6 ? p + 1 : 1));
          return;
        }
        if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
          e.preventDefault();
          setCurrentButtonPage((p) => (p > 1 ? p - 1 : 6));
          return;
        }
      }

      // 6. History navigation via ArrowUp / ArrowDown
      if (e.key === 'ArrowUp') {
        const hist = calculatorEngine.getState().history;
        if (hist.length > 0) {
          e.preventDefault();
          const nextIdx = Math.min(historyIndexRef.current + 1, hist.length - 1);
          historyIndexRef.current = nextIdx;
          calculatorEngine.setDisplay(hist[nextIdx].expression || hist[nextIdx].result);
        }
        return;
      }
      if (e.key === 'ArrowDown') {
        const hist = calculatorEngine.getState().history;
        if (hist.length > 0 && historyIndexRef.current >= 0) {
          e.preventDefault();
          const nextIdx = historyIndexRef.current - 1;
          historyIndexRef.current = nextIdx;
          if (nextIdx >= 0) {
            calculatorEngine.setDisplay(hist[nextIdx].expression || hist[nextIdx].result);
          } else {
            calculatorEngine.setDisplay('');
          }
        }
        return;
      }

      // 7. If currently directly editing #display, let standard typing update input value
      if (isDisplayInput) {
        return;
      }

      // 8. Global calculator key bindings:
      // Digits & Numpad keys
      if ((e.key >= '0' && e.key <= '9') || (e.code.startsWith('Numpad') && e.code.length === 7)) {
        calculatorEngine.append(e.key);
        return;
      }

      // Basic Operators
      if (e.key === '+') {
        calculatorEngine.append('+');
        return;
      }
      if (e.key === '-' || e.code === 'NumpadSubtract') {
        calculatorEngine.append('−');
        return;
      }
      if (e.key === '*' || e.code === 'NumpadMultiply') {
        calculatorEngine.append('×');
        return;
      }
      if (e.key === '/' || e.code === 'NumpadDivide') {
        calculatorEngine.append('÷');
        return;
      }
      if (e.key === '.' || e.key === ',' || e.code === 'NumpadDecimal') {
        calculatorEngine.append('.');
        return;
      }

      // Advanced math symbols
      if (e.key === '^') {
        calculatorEngine.append('^');
        return;
      }
      if (e.key === '%') {
        calculatorEngine.append('%');
        return;
      }
      if (e.key === '!') {
        calculatorEngine.append('!');
        return;
      }
      if (e.key === '(' || e.key === ')') {
        calculatorEngine.append(e.key);
        return;
      }

      // Backspace & Delete
      if (e.key === 'Backspace') {
        calculatorEngine.backspace();
        return;
      }
      if (e.key === 'Delete') {
        calculatorEngine.clear();
        return;
      }

      // Variables & Functions
      const lower = e.key.toLowerCase();
      if (['x', 'y', 'z', 'a', 'b', 'c', 't', 'n', 'i'].includes(lower) && !e.ctrlKey && !e.metaKey) {
        calculatorEngine.append(lower);
        return;
      }
      if (lower === 'p' && !e.ctrlKey && !e.metaKey) {
        calculatorEngine.append('π');
        return;
      }
      if (lower === 'e' && !e.ctrlKey && !e.metaKey) {
        calculatorEngine.append('e');
        return;
      }
      if (lower === 's' && !e.ctrlKey && !e.metaKey) {
        calculatorEngine.sin();
        return;
      }
      if (lower === 'q' && !e.ctrlKey && !e.metaKey) {
        calculatorEngine.squareRoot();
        return;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isAnyModalOpen]);

  const handleCopyExactFactorial = () => {
    if (!engineState.exactFactorial) return;
    navigator.clipboard.writeText(engineState.exactFactorial.exactString);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handlePageSelect = (page: number) => {
    setCurrentButtonPage(page);
    setIsPageMenuOpen(false);
  };

  const pageNames: Record<number, string> = {
    1: '1 · Basic',
    2: '2 · Scientific',
    3: '3 · Solvers & Calculus',
    4: '4 · Graphs & Matrix',
    5: '5 · Advanced Math',
    6: '6 · Tools & Physics',
  };

  // Smart Context passed to AI modal
  const smartContext = {
    display: engineState.display,
    setDisplay: (val: string) => calculatorEngine.setDisplay(val),
    addHistory: (expr: string, res: string) => calculatorEngine.addHistory(expr, res),
    setExactFactorial: (fact: any) => {
      if (fact?.n) {
        calculatorEngine.computeFactorial(fact.isDoubleFactorial ? `${fact.n}!!` : fact.n);
      }
    },
    open3DGraph: () => setIs3DOpen(true),
    openVectorMenu: () => setIsVectorMenuOpen(true),
    openPeriodicTable: () => setIsPeriodicTableOpen(true),
    openFormulaBook: () => setIsFunctionMenuOpen(true),
    openConstants: () => setIsConstantsOpen(true),
    open2DGraph: (fn?: string) => {
      setShow2DGraph(true);
      if (fn) calculatorEngine.setDisplay(fn);
    },
    openStopwatch: () => setIsStopwatchOpen(true),
    openTimer: () => setIsTimerOpen(true),
    openChemistryMenu: () => setIsChemistryOpen(true),
    openSolver: (tab: any) => openSolver(tab),
  };

  return (
    <div className={`min-h-screen py-4 px-2 sm:px-4 flex flex-col items-center justify-center transition-colors duration-200 ${
      themeLight ? 'bg-slate-200 text-slate-900 light-mode' : 'bg-[#090d16] text-slate-100'
    }`}>
      
      {/* Container holding Calculator chassis, 2D Graph, and History */}
      <div className="w-full max-w-6xl flex flex-col lg:flex-row gap-6 items-start justify-center">

        {/* ================= SCIENTIFIC CALCULATOR CHASSIS ================= */}
        <div className="calculator-chassis w-full max-w-[500px] mx-auto rounded-3xl p-4 sm:p-5 relative flex flex-col gap-3">
          
          {/* Top Brand Header with Cyan-to-Purple Gradient & Blinking Cyan Dot */}
          <div className="calculatorHeader flex items-center justify-between pt-1">
            <div className="flex items-center gap-2.5">
              {/* Small round cyan blue blinking indicator */}
              <div className="relative flex items-center justify-center w-3 h-3 shrink-0">
                <span className="animate-ping absolute inline-flex h-2.5 w-2.5 rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400 shadow-[0_0_8px_#00d9ff]"></span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black tracking-wider bg-gradient-to-br from-[#00d9ff] via-[#38bdf8] to-[#c084fc] bg-clip-text text-transparent select-none drop-shadow font-mono">
                OP4CALCULATE
              </h2>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                className="p-1.5 rounded-lg text-slate-400 hover:text-cyan-300 hover:bg-slate-800/60 transition"
                onClick={() => setIsHelpOpen(true)}
                title="Keyboard & Mouse Shortcuts Guide (Alt+H)"
              >
                <KeyboardIcon className="w-4 h-4 text-cyan-400/80" />
              </button>
              <button
                className="menuButton p-1.5 rounded-lg text-slate-400 hover:text-cyan-300 hover:bg-slate-800/60 transition"
                onClick={() => setIsFunctionMenuOpen(true)}
                title="Function Reference Menu"
              >
                <Menu className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* COMPACT DATE & TIME STATUS BAR (Isolated memoized component for low-power performance) */}
          <LiveClockBar 
            onOpenWorldClock={() => setIsWorldClockOpen(true)}
            onOpenCalendar={() => setIsCalendarOpen(true)}
          />

          {/* MULTI-LINE LCD GLASS SCREEN */}
          <div 
            className="lcd-screen rounded-2xl p-3.5 flex flex-col justify-between min-h-[114px] relative overflow-hidden group cursor-text"
            onDoubleClick={handleCopyDisplay}
            onContextMenu={(e) => {
              e.preventDefault();
              handleCopyDisplay();
            }}
            title="Double-click or right-click to copy to clipboard"
          >
            {/* Subtle glass reflection gradient */}
            <div className="absolute top-0 left-0 right-0 h-10 bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />

            {/* Display Top Bar with Indicators */}
            <div className="displayTop flex items-center justify-between text-xs font-mono font-semibold relative z-10">
              <div className="flex items-center gap-2">
                <span 
                  id="modeIndicator" 
                  onClick={() => calculatorEngine.toggleDegreeMode()}
                  className="px-1.5 py-0.5 rounded bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 text-[10px] cursor-pointer hover:bg-cyan-900 transition font-bold"
                  title="Toggle DEG / RAD (Alt+D)"
                >
                  {engineState.degreeMode ? 'DEG' : 'RAD'}
                </span>

                {engineState.memory !== 0 && (
                  <span id="memoryIndicator" className="px-1.5 py-0.5 rounded bg-purple-950/80 border border-purple-500/40 text-purple-300 text-[10px] font-bold">
                    M
                  </span>
                )}

                <span className="text-[10px] text-slate-500 font-mono">MATH</span>
              </div>

              {/* Live Preview Result */}
              <div id="previewDisplay" className="text-right text-xs text-cyan-300/70 font-mono overflow-hidden text-ellipsis whitespace-nowrap min-h-[16px]">
                {engineState.preview}
              </div>
            </div>

            <hr className="displayLine my-1.5 border-t border-slate-800/80" />

            {/* Primary High-Contrast Readout */}
            <div className="relative">
              <input
                type="text"
                id="display"
                className="display w-full bg-transparent border-none outline-none text-right text-3xl sm:text-4xl font-mono text-cyan-100 font-bold tracking-tight select-all placeholder-slate-600 relative z-10"
                value={engineState.display}
                onChange={(e) => calculatorEngine.setDisplay(e.target.value)}
                placeholder="0"
              />
              {displayToast && (
                <div className="absolute top-1/2 left-2 -translate-y-1/2 px-2 py-0.5 rounded bg-emerald-500/90 text-slate-950 font-sans font-bold text-[11px] animate-in fade-in duration-100 z-20 shadow-md">
                  {displayToast}
                </div>
              )}
            </div>
          </div>

          {/* ================= EXACT 100+ DIGIT FACTORIAL RESULT PANEL ================= */}
          {engineState.exactFactorial && (
            <div id="factorialResultPanel" className="factorial-result-panel animate-in fade-in slide-in-from-top-2 duration-200">
              <div className="factorial-result-header flex items-center justify-between gap-2 mb-2 pb-2 border-b border-emerald-500/30 text-xs">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-bold text-emerald-400">
                    {engineState.exactFactorial.isApproximate ? 'Super-Factorial' : 'Exact Factorial'} ({engineState.exactFactorial.n.endsWith('!') ? engineState.exactFactorial.n : `${engineState.exactFactorial.n}!`})
                  </span>
                  <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-mono text-[10px] border border-emerald-500/40">
                    {engineState.exactFactorial.digitCount} Digits
                  </span>
                  <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-mono text-[10px] border border-slate-700">
                    {engineState.exactFactorial.trailingZeros} Zeros
                  </span>
                  {engineState.exactFactorial.note && (
                    <span className="text-[10px] text-cyan-300/80 font-sans">
                      • {engineState.exactFactorial.note}
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => setIsGrouped(!isGrouped)}
                    className="px-2 py-1 text-[10px] rounded bg-slate-800 hover:bg-slate-700 text-slate-300 transition"
                    title="Toggle digit grouping for easier readability"
                  >
                    {isGrouped ? 'Normal' : 'Group 5s'}
                  </button>

                  <button
                    onClick={handleCopyExactFactorial}
                    className="px-2.5 py-1 text-[10px] rounded bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold transition flex items-center gap-1"
                  >
                    {isCopied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                    {isCopied ? 'Copied!' : 'Copy Exact'}
                  </button>
                </div>
              </div>

              {/* Exact full numeric digits */}
              <div id="factorialResultText" className="factorial-result-text font-mono text-xs text-emerald-300 bg-slate-950/80 p-3 rounded-lg border border-emerald-950/60 max-h-36 overflow-y-auto break-all select-all leading-relaxed">
                {isGrouped 
                  ? formatLargeNumber(engineState.exactFactorial.exactString, 5)
                  : engineState.exactFactorial.exactString}
              </div>
            </div>
          )}

          {/* ================= PAGE SELECTOR TOOLBAR WITH MOUSE WHEEL ================= */}
          <div 
            className="buttonsContainer relative w-full"
            onWheel={handleButtonsWheel}
            title="Scroll mouse wheel over buttons to cycle pages"
          >
            <div className="pageSelectorBar relative flex items-center justify-between gap-2 mb-2 z-20">
              
              {/* Settings button: STRICTLY TRANSPARENT BACKGROUND as requested */}
              <button
                type="button"
                className="settingsGear text-slate-400 hover:text-cyan-300 transition-transform duration-200 hover:rotate-90"
                onClick={() => setIsSettingsOpen(!isSettingsOpen)}
                title="Calculator Settings"
                aria-label="Settings"
              >
                <SettingsIcon className="w-5 h-5" />
              </button>

              {/* AI Assistant Button */}
              <button
                id="AI"
                onClick={() => setIsAIOpen(true)}
                className="px-3 py-1 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 hover:from-cyan-500/30 hover:to-purple-500/30 text-cyan-300 border border-cyan-500/40 rounded-lg text-xs font-bold transition flex items-center gap-1.5 shadow-sm active:scale-95"
                title="AI Math Assistant (Alt+A or /)"
              >
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                ✧AI
              </button>

              {/* Page Selector dropdown button with scroll hint */}
              <div className="relative">
                <button
                  type="button"
                  id="pageSelector"
                  className="pageSelector px-3 py-1 bg-cyan-600/30 hover:bg-cyan-600/40 text-cyan-200 border border-cyan-500/50 rounded-lg text-xs font-bold font-mono transition flex items-center gap-1"
                  onClick={() => setIsPageMenuOpen(!isPageMenuOpen)}
                  title="Click to select or scroll wheel over buttons to flip (Alt+1..6)"
                >
                  ▤ {currentButtonPage}/6 ▾
                </button>

                {/* Dropdown Menu */}
                {isPageMenuOpen && (
                  <div id="pageMenu" className="pageMenu absolute top-full right-0 mt-1 w-48 bg-slate-900 border border-cyan-500/40 rounded-xl shadow-2xl p-1.5 z-50 flex flex-col gap-1">
                    {[1, 2, 3, 4, 5, 6].map((p) => (
                      <button
                        key={p}
                        type="button"
                        onClick={() => handlePageSelect(p)}
                        className={`w-full px-3 py-1.5 rounded-lg text-xs text-left font-mono transition flex items-center justify-between ${
                          currentButtonPage === p
                            ? 'bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/30'
                            : 'text-slate-300 hover:bg-slate-800'
                        }`}
                      >
                        <span>{pageNames[p]}</span>
                        {currentButtonPage === p && <span className="text-cyan-400">●</span>}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* SETTINGS DRAWER */}
            {isSettingsOpen && (
              <div id="settingsPanel" className="settings-panel mb-3 p-3.5 bg-slate-950 border border-slate-800 rounded-xl flex flex-wrap gap-2 text-xs animate-in fade-in duration-150">
                <h3 className="w-full font-bold text-slate-300 uppercase tracking-wider text-[10px] mb-1">Preferences</h3>
                <button 
                  onClick={() => setThemeLight(!themeLight)}
                  className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg transition"
                >
                  {themeLight ? 'Dark Mode' : 'Light Mode'}
                </button>
                <button 
                  onClick={() => calculatorEngine.toggleDegreeMode()}
                  className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg transition"
                >
                  Toggle DEG / RAD ({engineState.degreeMode ? 'DEG' : 'RAD'})
                </button>
                <button 
                  onClick={() => calculatorEngine.clearHistory()}
                  className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg transition"
                >
                  Clear History
                </button>
                <button 
                  onClick={() => setIsHelpOpen(true)}
                  className="px-3 py-1.5 bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 hover:bg-cyan-900 rounded-lg transition flex items-center gap-1.5 font-bold"
                >
                  <KeyboardIcon className="w-3.5 h-3.5" />
                  Keyboard & Mouse Controls Guide
                </button>
                <button 
                  onClick={() => {
                    const data = JSON.stringify(engineState.history, null, 2);
                    navigator.clipboard.writeText(data);
                    setDisplayToast("History copied!");
                    setTimeout(() => setDisplayToast(null), 1800);
                  }}
                  className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg transition"
                >
                  Export History
                </button>
              </div>
            )}

            {/* ================= 6 PAGES OF BUTTONS ================= */}
            
            {/* PAGE 1: BASIC & ESSENTIALS */}
            <div className={`buttons ${currentButtonPage === 1 ? 'grid' : 'hidden'}`} data-page="1">
              {/* Row 1: Memory */}
              <button className="memory" onClick={() => calculatorEngine.memoryClear()}>MC</button>
              <button className="memory" onClick={() => calculatorEngine.memoryRecall()}>MR</button>
              <button className="memory" onClick={() => calculatorEngine.memoryAdd()}>M+</button>
              <button className="memory" onClick={() => calculatorEngine.memorySubtract()}>M-</button>
              <button className="clear" onClick={() => calculatorEngine.clear()}>AC</button>

              {/* Row 2: Basic */}
              <button className="function" onClick={() => calculatorEngine.append('(')}>(</button>
              <button className="function" onClick={() => calculatorEngine.append(')')}>)</button>
              
              {/* BACKSPACE WITH RAPID MOUSE HOLD REPEAT SUPPORT */}
              <button 
                className="function active:bg-cyan-700 select-none" 
                onClick={() => calculatorEngine.backspace()}
                onMouseDown={startContinuousBackspace}
                onMouseUp={stopContinuousBackspace}
                onMouseLeave={stopContinuousBackspace}
                onTouchStart={startContinuousBackspace}
                onTouchEnd={stopContinuousBackspace}
                title="Backspace (Hold mouse down to delete rapidly)"
              >
                ⌫
              </button>

              <button className="operator" onClick={() => calculatorEngine.append('%')}>%</button>
              <button className="operator" onClick={() => calculatorEngine.append('÷')}>÷</button>

              {/* Row 3 */}
              <button className="number" onClick={() => calculatorEngine.append('7')}>7</button>
              <button className="number" onClick={() => calculatorEngine.append('8')}>8</button>
              <button className="number" onClick={() => calculatorEngine.append('9')}>9</button>
              <button className="operator" onClick={() => calculatorEngine.append('×')}>×</button>
              <button className="function" onClick={() => calculatorEngine.squareRoot()}>√</button>

              {/* Row 4 */}
              <button className="number" onClick={() => calculatorEngine.append('4')}>4</button>
              <button className="number" onClick={() => calculatorEngine.append('5')}>5</button>
              <button className="number" onClick={() => calculatorEngine.append('6')}>6</button>
              <button className="operator" onClick={() => calculatorEngine.append('−')}>−</button>
              <button className="function" onClick={() => calculatorEngine.square()}>x²</button>

              {/* Row 5 */}
              <button className="number" onClick={() => calculatorEngine.append('1')}>1</button>
              <button className="number" onClick={() => calculatorEngine.append('2')}>2</button>
              <button className="number" onClick={() => calculatorEngine.append('3')}>3</button>
              <button className="operator" onClick={() => calculatorEngine.append('+')}>+</button>
              <button className="function" onClick={() => calculatorEngine.power()}>xʸ</button>

              {/* Row 6 */}
              <button className="number" onClick={() => calculatorEngine.append('0')}>0</button>
              <button className="number" onClick={() => calculatorEngine.append('.')}>.</button>
              <button className="equal" onClick={() => calculatorEngine.calculate()}>=</button>
              <button className="clear" onClick={() => calculatorEngine.clearHistory()}>HC</button>
              <button className="function" onClick={() => calculatorEngine.inverse()}>1/x</button>
            </div>

            {/* PAGE 2: SCIENTIFIC */}
            <div className={`buttonPage ${currentButtonPage === 2 ? 'activePage' : ''}`} data-page="2">
              <button className="function" onClick={() => calculatorEngine.sin()}>sin</button>
              <button className="function" onClick={() => calculatorEngine.cos()}>cos</button>
              <button className="function" onClick={() => calculatorEngine.tan()}>tan</button>
              <button className="function" onClick={() => calculatorEngine.asin()}>sin⁻¹</button>
              <button className="function" onClick={() => calculatorEngine.acos()}>cos⁻¹</button>

              <button className="function" onClick={() => calculatorEngine.atan()}>tan⁻¹</button>
              <button className="function" onClick={() => calculatorEngine.log10()}>log</button>
              <button className="function" onClick={() => calculatorEngine.ln()}>ln</button>
              <button className="function" onClick={() => calculatorEngine.append('π')}>π</button>
              <button className="function" onClick={() => calculatorEngine.append('e')}>e</button>

              {/* UPGRADED FACTORIAL BUTTON */}
              <button className="function font-bold text-cyan-200" onClick={() => calculatorEngine.computeFactorial()}>
                x!
              </button>
              <button className="function" onClick={() => calculatorEngine.toggleDegreeMode()} id="modeBtn">
                {engineState.degreeMode ? 'DEG' : 'RAD'}
              </button>
              <button className="function" onClick={() => calculatorEngine.tenPower()}>10ˣ</button>
              <button className="function" onClick={() => calculatorEngine.expPower()}>eˣ</button>
              <button className="function" onClick={() => calculatorEngine.absolute()}>|x|</button>
            </div>

            {/* PAGE 3: SOLVERS & CALCULUS */}
            <div className={`buttonPage ${currentButtonPage === 3 ? 'activePage' : ''}`} data-page="3">
              {/* Row 1: Powers */}
              <button className="function" onClick={() => calculatorEngine.cube()}>x³</button>
              <button className="function" onClick={() => calculatorEngine.cubeRoot()}>∛x</button>
              <button className="function" onClick={() => calculatorEngine.tenPower()}>10ˣ</button>
              <button className="function" onClick={() => calculatorEngine.expPower()}>eˣ</button>
              <button className="function" onClick={() => calculatorEngine.absolute()}>|x|</button>

              {/* Row 2: Signs, Equals, Comma, 'x' and 'y' */}
              <button className="function" onClick={() => calculatorEngine.plusMinus()}>±</button>
              <button className="function" onClick={() => calculatorEngine.append('=')}>=</button>
              <button className="function" onClick={() => calculatorEngine.append(',')}>,</button>
              <button className="variable font-bold text-cyan-900 bg-cyan-100" onClick={() => calculatorEngine.append('x')}>x</button>
              <button className="variable" onClick={() => calculatorEngine.append('y')}>y</button>

              {/* Row 3: Variables */}
              <button className="variable" onClick={() => calculatorEngine.append('z')}>z</button>
              <button className="variable" onClick={() => calculatorEngine.append('a')}>a</button>
              <button className="variable" onClick={() => calculatorEngine.append('b')}>b</button>
              <button className="variable" onClick={() => calculatorEngine.append('c')}>c</button>
              <button className="variable" onClick={() => calculatorEngine.append('t')}>t</button>

              {/* Row 4: Variables & Solvers */}
              <button className="variable" onClick={() => calculatorEngine.append('n')}>n</button>
              <button className="variable" onClick={() => calculatorEngine.append('θ')}>θ</button>
              <button className="function" onClick={() => openSolver('solve')}>Solver</button>
              <button className="function" onClick={() => openSolver('solve')}>Solve</button>
              <button className="function" onClick={() => openSolver('2var')}>2-Var</button>

              {/* Row 5: Advanced Solvers */}
              <button className="function" onClick={() => openSolver('3var')}>3-Var</button>
              <button className="function" onClick={() => openSolver('quad')}>Quad</button>
              <button className="function" onClick={() => openSolver('cubic')}>Cubic</button>
              <button className="function" onClick={() => openSolver('quartic')}>Quartic</button>
              <button className="function" onClick={() => openSolver('cubic')}>Poly</button>

              {/* Row 6: Numerical Methods & Calculus */}
              <button className="function" onClick={() => openSolver('newton')}>Newton</button>
              <button className="function" onClick={() => openSolver('bisect')}>Bisect</button>
              <button className="function" onClick={() => openSolver('verify')}>Verify</button>
              <button className="function" onClick={() => calculatorEngine.differentiateNumeric()}>d/dx</button>
              <button className="function" onClick={() => calculatorEngine.symbolicDerivative()}>d/dx f(x)</button>

              {/* Row 7: Calculus Continued */}
              <button className="function" onClick={() => calculatorEngine.integrateNumeric()}>∫dx</button>
              <button className="function" onClick={() => calculatorEngine.limitNumeric()}>Limit</button>
              <button className="function" onClick={() => calculatorEngine.taylorSeries()}>Taylor</button>
              <button className="function" onClick={() => calculatorEngine.simplify()}>Simplify</button>
              <button className="function" onClick={() => setShow2DGraph((prev) => !prev)}>Trace</button>

              {/* Row 8: Graphing */}
              <button className="function" onClick={() => setShow2DGraph((prev) => !prev)}>Tangent</button>
              <button className="function" onClick={() => setShow2DGraph((prev) => !prev)}>Normal</button>
              <button className="function" onClick={() => setShow2DGraph((prev) => !prev)}>Analyze</button>
              <button className="function" onClick={() => setIsTableOpen(true)}>TABLE</button>
              <button className="function" onClick={() => setShow2DGraph(true)}>Zoom +</button>

              {/* Row 9 */}
              <button className="function" onClick={() => setShow2DGraph(true)}>Zoom −</button>
            </div>

            {/* PAGE 4: MATRIX, VECTOR & GRAPHS */}
            <div className={`buttonPage ${currentButtonPage === 4 ? 'activePage' : ''}`} data-page="4">
              <button className="function" onClick={() => calculatorEngine.matrixMenu()}>Matrix</button>
              <button className="function" onClick={() => calculatorEngine.matrixDet()}>Det</button>
              <button className="function" onClick={() => calculatorEngine.matrixTranspose()}>Aᵀ</button>
              <button className="function" onClick={() => calculatorEngine.matrixInverse()}>A⁻¹</button>
              <button className="function" onClick={() => setIsVectorMenuOpen(true)}>Vector</button>

              <button className="function" onClick={() => setShow2DGraph((prev) => !prev)}>Graph</button>
              <button className="function" onClick={() => {
                if (show2DGraph) {
                  setShow2DGraph(false);
                } else {
                  calculatorEngine.setDisplay('sin(x), cos(x)');
                  setShow2DGraph(true);
                }
              }}>Multi Graph</button>
              
              {/* UPGRADED 3D GRAPH BUTTON */}
              <button className="function font-bold text-cyan-300" onClick={() => setIs3DOpen(true)}>
                3D Graph
              </button>
              <button className="function" onClick={() => {
                setShow2DGraph(true);
                setDisplayToast("2D Graph ready");
                setTimeout(() => setDisplayToast(null), 1500);
              }}>Save Graph</button>
              <button className="function" onClick={() => calculatorEngine.append('i')}>i</button>
            </div>

            {/* PAGE 5: ADVANCED MATH (COMPLEX, STATS, NUMBER THEORY, BASE) */}
            <div className={`buttonPage ${currentButtonPage === 5 ? 'activePage' : ''}`} data-page="5">
              <button className="function" onClick={() => calculatorEngine.complexMenu()}>Comp</button>
              <button className="function" onClick={() => calculatorEngine.append('i')}>i</button>
              <button className="function" onClick={() => calculatorEngine.toComplex()}>a+bi</button>
              <button className="function" onClick={() => calculatorEngine.complexAbs()}>|z|</button>
              <button className="function" onClick={() => calculatorEngine.complexConjugate()}>conj</button>

              <button className="function" onClick={() => calculatorEngine.statisticsMenu()}>STAT</button>
              <button className="function" onClick={() => calculatorEngine.mean()}>Mean</button>
              <button className="function" onClick={() => calculatorEngine.probabilityMenu()}>Prob</button>
              <button className="function" onClick={() => calculatorEngine.linearRegression()}>Reg</button>
              <button className="function" onClick={() => calculatorEngine.numberTheoryMenu()}>Number</button>

              <button className="function" onClick={() => calculatorEngine.baseMenu()}>BASE</button>
              <button className="function" onClick={() => calculatorEngine.toBinary()}>BIN</button>
              <button className="function" onClick={() => calculatorEngine.toDecimalBase()}>DEC</button>
              <button className="function" onClick={() => calculatorEngine.toOctal()}>OCT</button>
              <button className="function" onClick={() => calculatorEngine.toHex()}>HEX</button>
            </div>

            {/* PAGE 6: TOOLS, ENGINEERING, CHEMISTRY & PHYSICS */}
            <div className={`buttonPage ${currentButtonPage === 6 ? 'activePage' : ''}`} data-page="6">
              <button className="function" onClick={() => calculatorEngine.eng()}>ENG</button>
              <button className="function" onClick={() => calculatorEngine.engUp()}>ENG▶</button>
              <button className="function" onClick={() => calculatorEngine.engDown()}>◀ENG</button>
              <button className="function" onClick={() => calculatorEngine.toFraction()}>a/b</button>
              <button className="function" onClick={() => calculatorEngine.toDecimalBase()}>a↔b</button>

              <button className="function" onClick={() => calculatorEngine.combination()}>nCr</button>
              <button className="function" onClick={() => calculatorEngine.permutation()}>nPr</button>
              <button className="function" onClick={() => calculatorEngine.random()}>Rand</button>
              <button className="memory" onClick={() => calculatorEngine.answer()}>Ans</button>
              <button className="function" onClick={() => setIsAlphaOpen(true)}>ALPHA</button>

              <button className="function" onClick={() => setIsSequenceOpen(true)}>SEQ</button>
              <button className="function" onClick={() => {
                const val = Number(engineState.display) || 1;
                calculatorEngine.setDisplay((val * 3.28084).toFixed(4));
              }}>m→ft</button>
              <button className="function" onClick={() => {
                const val = Number(engineState.display) || 1;
                calculatorEngine.setDisplay((val / 3.28084).toFixed(4));
              }}>ft→m</button>
              <button className="function" onClick={() => {
                const val = Number(engineState.display) || 0;
                calculatorEngine.setDisplay((val * 9/5 + 32).toFixed(2));
              }}>°C→°F</button>
              <button className="function" onClick={() => {
                const val = Number(engineState.display) || 32;
                calculatorEngine.setDisplay(((val - 32) * 5/9).toFixed(2));
              }}>°F→°C</button>

              <button className="function" onClick={() => {
                const val = Number(engineState.display) || 1;
                calculatorEngine.setDisplay((val * 2.20462).toFixed(4));
              }}>kg→lb</button>
              <button className="function" onClick={() => {
                const val = Number(engineState.display) || 1;
                calculatorEngine.setDisplay((val / 2.20462).toFixed(4));
              }}>lb→kg</button>
              <button className="function font-bold text-cyan-200" onClick={() => setIsChemistryOpen(true)} title="Chemistry Solver Menu">CHEM</button>
              <button className="function" onClick={() => setIsPeriodicTableOpen(true)}>PERIOD</button>
              <button className="function" onClick={() => setIsConstantsOpen(true)}>Const</button>

              <button className="function" onClick={() => setIsFunctionMenuOpen(true)}>Formula</button>
              <button className="function" onClick={() => setIsProgOpen(true)}>PROG</button>
              <button className="function" onClick={() => setIsProgOpen(true)}>Run Prog</button>
              <button className="function text-base" onClick={() => setIsStopwatchOpen(true)} title="Stopwatch">⏱</button>
              <button className="function text-base" onClick={() => setIsTimerOpen(true)} title="Timer">⏳</button>
            </div>

          </div>
        </div>

        {/* ================= RIGHT COLUMN: 2D GRAPH & HISTORY ================= */}
        <div className="w-full max-w-[500px] flex flex-col gap-5">
          
          {/* Optional 2D Graph Visualizer */}
          {show2DGraph && (
            <div className="animate-in fade-in zoom-in-95 duration-200">
              <Graph2D 
                initialExpression={engineState.display.includes('x') ? engineState.display : 'sin(x)'} 
                onClose={() => setShow2DGraph(false)}
              />
            </div>
          )}

          {/* HISTORY LOG PANEL */}
          <div className="history w-full bg-slate-900/90 border border-slate-800 rounded-3xl p-4 sm:p-5 shadow-xl text-slate-100 flex flex-col min-h-[320px]">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-3">
              <div className="flex items-center gap-2 font-bold text-sm text-cyan-400">
                <HistoryIcon className="w-4 h-4" />
                Calculation History
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] text-slate-500 font-mono hidden sm:inline">Use ↑/↓ keys</span>
                {engineState.history.length > 0 && (
                  <button
                    onClick={() => calculatorEngine.clearHistory()}
                    className="p-1 rounded text-slate-400 hover:text-rose-400 hover:bg-slate-800 transition"
                    title="Clear history"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>

            <div id="historyList" className="flex-1 max-h-[460px] overflow-y-auto space-y-2 pr-1">
              {engineState.history.length === 0 ? (
                <div className="text-center py-12 text-slate-500 font-mono text-xs">
                  No previous calculations recorded yet
                </div>
              ) : (
                engineState.history.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => {
                      calculatorEngine.setDisplay(item.result);
                    }}
                    className="historyItem p-2.5 rounded-xl bg-slate-950/80 border border-slate-800/80 hover:border-cyan-500/40 hover:bg-slate-800/60 cursor-pointer transition flex flex-col gap-0.5 group"
                  >
                    <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono">
                      <span className="truncate max-w-[200px]">{item.expression}</span>
                      <span className="text-[10px] text-slate-500">{item.timestamp}</span>
                    </div>
                    <div className="font-mono text-xs font-bold text-cyan-300 group-hover:text-cyan-200 break-all">
                      = {item.result}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

        </div>

      </div>

      {/* ================= ALL COMPREHENSIVE MODALS ================= */}
      
      {/* 3D GRAPH MODAL */}
      <ThreeGraph3D
        isOpen={is3DOpen}
        onClose={() => setIs3DOpen(false)}
        initialEquation={engineState.display.includes('x') || engineState.display.includes('y') ? engineState.display : undefined}
      />

      {/* AI COMMAND MODAL */}
      <SmartAIModal
        isOpen={isAIOpen}
        onClose={() => setIsAIOpen(false)}
        onOpenHelp={() => {
          setIsAIOpen(false);
          setIsFunctionMenuOpen(true);
        }}
        context={smartContext}
      />

      {/* FUNCTION REFERENCE HANDBOOK */}
      <FunctionReferenceModal
        isOpen={isFunctionMenuOpen}
        onClose={() => setIsFunctionMenuOpen(false)}
        onSelectCommand={(syntax) => {
          calculatorEngine.setDisplay(syntax);
        }}
      />

      {/* KEYBOARD & MOUSE SHORTCUTS GUIDE MODAL */}
      <KeyboardMouseHelpModal
        isOpen={isHelpOpen}
        onClose={() => setIsHelpOpen(false)}
      />

      {/* TOOLS & TIME UTILITIES */}
      <StopwatchModal isOpen={isStopwatchOpen} onClose={() => setIsStopwatchOpen(false)} />
      <TimerModal isOpen={isTimerOpen} onClose={() => setIsTimerOpen(false)} />
      <WorldClockModal isOpen={isWorldClockOpen} onClose={() => setIsWorldClockOpen(false)} />
      <CalendarModal isOpen={isCalendarOpen} onClose={() => setIsCalendarOpen(false)} />
      <VectorModal 
        isOpen={isVectorMenuOpen} 
        onClose={() => setIsVectorMenuOpen(false)} 
        onApplyResult={(val) => calculatorEngine.setDisplay(val)}
      />
      <PeriodicTableModal isOpen={isPeriodicTableOpen} onClose={() => setIsPeriodicTableOpen(false)} />

      {/* ADVANCED SOLVER MODAL */}
      <SolverModal
        isOpen={solverState.isOpen}
        initialTab={solverState.tab}
        onClose={() => setSolverState((prev) => ({ ...prev, isOpen: false }))}
        onApplyResult={(val) => calculatorEngine.setDisplay(val)}
        displayValue={engineState.display}
      />

      {/* ALPHA VARIABLES MODAL */}
      <AlphaModal
        isOpen={isAlphaOpen}
        onClose={() => setIsAlphaOpen(false)}
        variables={engineState.variables}
        onStore={(k) => calculatorEngine.storeVariable(k)}
        onRecall={(k) => calculatorEngine.recallVariable(k)}
        currentDisplay={engineState.display}
      />

      {/* SEQUENCE CALCULATOR MODAL */}
      <SequenceModal
        isOpen={isSequenceOpen}
        onClose={() => setIsSequenceOpen(false)}
        onApplyResult={(val) => calculatorEngine.setDisplay(val)}
      />

      {/* PHYSICAL CONSTANTS MODAL */}
      <ConstantsModal
        isOpen={isConstantsOpen}
        onClose={() => setIsConstantsOpen(false)}
        onInsert={(val) => calculatorEngine.append(val)}
      />

      {/* PROGRAMMING BITWISE MODAL */}
      <ProgrammingModal
        isOpen={isProgOpen}
        onClose={() => setIsProgOpen(false)}
        onInsert={(val) => calculatorEngine.setDisplay(val)}
      />

      {/* FUNCTION TABLE MODAL */}
      <TableModal
        isOpen={isTableOpen}
        onClose={() => setIsTableOpen(false)}
        initialFunc={engineState.display.includes('x') ? engineState.display : 'x^2 - 4'}
      />

      {/* FULL CHEMISTRY SOLVER MODAL */}
      <ChemistrySolverModal
        isOpen={isChemistryOpen}
        onClose={() => setIsChemistryOpen(false)}
        onApplyResult={(val) => calculatorEngine.setDisplay(val)}
        initialFormula={engineState.display && /[A-Z]/.test(engineState.display) && !engineState.display.includes('(') ? engineState.display : 'H2SO4'}
      />

    </div>
  );
}
