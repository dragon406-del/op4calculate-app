import React, { useState } from 'react';
import { X, Check, Calculator, ArrowRight } from 'lucide-react';
import { math } from '../utils/mathInstance';

export type SolverTab = 
  | 'solve' 
  | 'quad' 
  | 'cubic' 
  | 'quartic' 
  | '2var' 
  | '3var' 
  | 'newton' 
  | 'bisect' 
  | 'verify';

interface SolverModalProps {
  isOpen: boolean;
  initialTab?: SolverTab;
  onClose: () => void;
  onApplyResult: (val: string) => void;
  displayValue: string;
}

export const SolverModal: React.FC<SolverModalProps> = ({
  isOpen,
  initialTab = 'solve',
  onClose,
  onApplyResult,
  displayValue,
}) => {
  const [tab, setTab] = useState<SolverTab>(initialTab);

  React.useEffect(() => {
    if (initialTab) {
      setTab(initialTab);
    }
  }, [initialTab, isOpen]);

  // States for each solver
  const [generalEq, setGeneralEq] = useState<string>(displayValue.includes('=') ? displayValue : '2*x - 10 = 0');
  
  // Quadratic: ax^2 + bx + c = 0
  const [quadA, setQuadA] = useState<string>('1');
  const [quadB, setQuadB] = useState<string>('-5');
  const [quadC, setQuadC] = useState<string>('6');

  // Cubic: ax^3 + bx^2 + cx + d = 0
  const [cubicA, setCubicA] = useState<string>('1');
  const [cubicB, setCubicB] = useState<string>('-6');
  const [cubicC, setCubicC] = useState<string>('11');
  const [cubicD, setCubicD] = useState<string>('-6');

  // Quartic: ax^4 + bx^3 + cx^2 + dx + e = 0
  const [quartA, setQuartA] = useState<string>('1');
  const [quartB, setQuartB] = useState<string>('-4');
  const [quartC, setQuartC] = useState<string>('6');
  const [quartD, setQuartD] = useState<string>('-4');
  const [quartE, setQuartE] = useState<string>('1');

  // 2-Var: a1 x + b1 y = c1, a2 x + b2 y = c2
  const [lin2A1, setLin2A1] = useState<string>('2');
  const [lin2B1, setLin2B1] = useState<string>('3');
  const [lin2C1, setLin2C1] = useState<string>('8');
  const [lin2A2, setLin2A2] = useState<string>('1');
  const [lin2B2, setLin2B2] = useState<string>('-1');
  const [lin2C2, setLin2C2] = useState<string>('1');

  // 3-Var
  const [lin3Row1, setLin3Row1] = useState<string>('1, 1, 1, 6');
  const [lin3Row2, setLin3Row2] = useState<string>('0, 2, 5, -4');
  const [lin3Row3, setLin3Row3] = useState<string>('2, 5, -1, 27');

  // Newton
  const [newtonFunc, setNewtonFunc] = useState<string>('x^3 - 2*x - 5');
  const [newtonGuess, setNewtonGuess] = useState<string>('2');

  // Bisect
  const [bisectFunc, setBisectFunc] = useState<string>('x^3 - 2*x - 5');
  const [bisectA, setBisectA] = useState<string>('2');
  const [bisectB, setBisectB] = useState<string>('3');

  // Verify
  const [verifyEq, setVerifyEq] = useState<string>(displayValue.includes('=') ? displayValue : 'sin(x)^2 + cos(x)^2 = 1');

  const [resultText, setResultText] = useState<string>('');

  if (!isOpen) return null;

  const handleSolveGeneral = () => {
    try {
      if (!generalEq.includes('=')) {
        setResultText('Error: Equation requires an "=" sign');
        return;
      }
      const [lhs, rhs] = generalEq.split('=');
      const diff = `(${lhs}) - (${rhs})`;
      const f = (x: number) => Number(math.evaluate(diff, { x }));

      let root: number | null = null;
      for (let x = -50; x <= 50; x += 0.25) {
        if (Math.abs(f(x)) < 1e-4) {
          root = x;
          break;
        }
      }
      if (root !== null) {
        setResultText(`x = ${root.toFixed(4)}`);
      } else {
        // Newton search
        let x = 1;
        const dExpr = math.derivative(diff, 'x').toString();
        for (let i = 0; i < 30; i++) {
          const fx = Number(math.evaluate(diff, { x }));
          const dfx = Number(math.evaluate(dExpr, { x }));
          if (Math.abs(dfx) < 1e-12) break;
          x = x - fx / dfx;
        }
        if (Math.abs(f(x)) < 1e-3) {
          setResultText(`x ≈ ${x.toFixed(4)}`);
        } else {
          setResultText('No real root found near origin');
        }
      }
    } catch {
      setResultText('Solver Error');
    }
  };

  const handleSolveQuad = () => {
    const a = Number(quadA), b = Number(quadB), c = Number(quadC);
    if (a === 0) {
      setResultText('Error: Coefficient a cannot be 0');
      return;
    }
    const disc = b * b - 4 * a * c;
    if (disc >= 0) {
      const x1 = (-b + Math.sqrt(disc)) / (2 * a);
      const x2 = (-b - Math.sqrt(disc)) / (2 * a);
      setResultText(`x₁ = ${x1.toFixed(4)}, x₂ = ${x2.toFixed(4)}`);
    } else {
      const real = (-b / (2 * a)).toFixed(4);
      const imag = (Math.sqrt(-disc) / (2 * a)).toFixed(4);
      setResultText(`x = ${real} ± ${imag}i`);
    }
  };

  const handleSolveCubic = () => {
    const a = Number(cubicA), b = Number(cubicB), c = Number(cubicC), d = Number(cubicD);
    const f = (x: number) => a*x*x*x + b*x*x + c*x + d;
    const roots: number[] = [];
    for (let g = -100; g <= 100; g++) {
      let x = g;
      for (let iter = 0; iter < 30; iter++) {
        const fx = f(x);
        const dfx = 3*a*x*x + 2*b*x + c;
        if (Math.abs(dfx) < 1e-12) break;
        x = x - fx / dfx;
      }
      if (Math.abs(f(x)) < 1e-5 && !roots.some(r => Math.abs(r - x) < 1e-3)) {
        roots.push(Number(x.toFixed(4)));
      }
    }
    setResultText(roots.length > 0 ? `Roots: ${roots.join(', ')}` : 'No real roots found');
  };

  const handleSolveQuartic = () => {
    const a = Number(quartA), b = Number(quartB), c = Number(quartC), d = Number(quartD), e = Number(quartE);
    const f = (x: number) => a*x*x*x*x + b*x*x*x + c*x*x + d*x + e;
    const roots: number[] = [];
    for (let g = -50; g <= 50; g++) {
      let x = g;
      for (let iter = 0; iter < 40; iter++) {
        const fx = f(x);
        const dfx = 4*a*x*x*x + 3*b*x*x + 2*c*x + d;
        if (Math.abs(dfx) < 1e-12) break;
        x = x - fx / dfx;
      }
      if (Math.abs(f(x)) < 1e-5 && !roots.some(r => Math.abs(r - x) < 1e-3)) {
        roots.push(Number(x.toFixed(4)));
      }
    }
    setResultText(roots.length > 0 ? `Roots: ${roots.join(', ')}` : 'No real roots found');
  };

  const handleSolve2Var = () => {
    const a1 = Number(lin2A1), b1 = Number(lin2B1), c1 = Number(lin2C1);
    const a2 = Number(lin2A2), b2 = Number(lin2B2), c2 = Number(lin2C2);
    const det = a1 * b2 - a2 * b1;
    if (Math.abs(det) < 1e-12) {
      setResultText('No Unique Solution (Det = 0)');
    } else {
      const x = (c1 * b2 - c2 * b1) / det;
      const y = (a1 * c2 - a2 * c1) / det;
      setResultText(`x = ${x.toFixed(4)}, y = ${y.toFixed(4)}`);
    }
  };

  const handleSolve3Var = () => {
    try {
      const parseRow = (str: string) => str.split(',').map(n => Number(n.trim()));
      const r1 = parseRow(lin3Row1), r2 = parseRow(lin3Row2), r3 = parseRow(lin3Row3);
      const A = [r1.slice(0, 3), r2.slice(0, 3), r3.slice(0, 3)];
      const B = [r1[3], r2[3], r3[3]];
      const sol = (math as any).lusolve(A, B);
      setResultText(`x = ${sol[0][0].toFixed(3)}, y = ${sol[1][0].toFixed(3)}, z = ${sol[2][0].toFixed(3)}`);
    } catch {
      setResultText('3-Var System Error');
    }
  };

  const handleSolveNewton = () => {
    try {
      let x = Number(newtonGuess);
      const dExpr = math.derivative(newtonFunc, 'x').toString();
      for (let i = 0; i < 30; i++) {
        const fx = Number(math.evaluate(newtonFunc, { x }));
        const dfx = Number(math.evaluate(dExpr, { x }));
        if (Math.abs(dfx) < 1e-12) break;
        x = x - fx / dfx;
      }
      setResultText(`x = ${x.toFixed(6)}`);
    } catch {
      setResultText('Newton-Raphson Error');
    }
  };

  const handleSolveBisect = () => {
    try {
      let a = Number(bisectA), b = Number(bisectB);
      const f = (x: number) => Number(math.evaluate(bisectFunc, { x }));
      if (f(a) * f(b) > 0) {
        setResultText('f(a) and f(b) must have opposite signs');
        return;
      }
      for (let i = 0; i < 50; i++) {
        const mid = (a + b) / 2;
        if (Math.abs(f(mid)) < 1e-7 || (b - a) / 2 < 1e-7) {
          a = mid;
          break;
        }
        if (f(a) * f(mid) < 0) b = mid;
        else a = mid;
      }
      setResultText(`x = ${((a + b) / 2).toFixed(6)}`);
    } catch {
      setResultText('Bisection Error');
    }
  };

  const handleVerify = () => {
    try {
      if (!verifyEq.includes('=')) {
        setResultText('Must include =');
        return;
      }
      const [lhs, rhs] = verifyEq.split('=');
      const v1 = Number(math.evaluate(lhs, { x: 1.234 }));
      const v2 = Number(math.evaluate(rhs, { x: 1.234 }));
      setResultText(Math.abs(v1 - v2) < 1e-4 ? 'TRUE (LHS = RHS)' : 'FALSE (Not Equal)');
    } catch {
      setResultText('Verification Error');
    }
  };

  const tabs: { id: SolverTab; label: string }[] = [
    { id: 'solve', label: 'Solve' },
    { id: 'quad', label: 'Quad' },
    { id: 'cubic', label: 'Cubic' },
    { id: 'quartic', label: 'Quartic' },
    { id: '2var', label: '2-Var' },
    { id: '3var', label: '3-Var' },
    { id: 'newton', label: 'Newton' },
    { id: 'bisect', label: 'Bisect' },
    { id: 'verify', label: 'Verify' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-150">
      <div className="flex flex-col w-full max-w-lg bg-slate-900 border border-cyan-500/30 rounded-2xl shadow-2xl p-5 text-slate-100">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-3">
          <div className="flex items-center gap-2 text-cyan-400 font-bold text-sm">
            <Calculator className="w-4 h-4" />
            Equation Solver Suite
          </div>
          <button onClick={onClose} className="p-1 rounded-lg text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Selector */}
        <div className="flex items-center gap-1 overflow-x-auto pb-2 border-b border-slate-800/80 text-xs font-mono">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => { setTab(t.id); setResultText(''); }}
              className={`px-2.5 py-1 rounded-md transition whitespace-nowrap ${
                tab === t.id
                  ? 'bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/40'
                  : 'text-slate-400 hover:bg-slate-800'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Form Body */}
        <div className="py-4 space-y-3">
          {tab === 'solve' && (
            <div className="space-y-2">
              <label className="text-xs text-slate-400">Equation f(x) = 0:</label>
              <input
                type="text"
                value={generalEq}
                onChange={(e) => setGeneralEq(e.target.value)}
                placeholder="e.g. 2*x - 10 = 0"
                className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs font-mono text-cyan-200"
              />
              <button
                onClick={handleSolveGeneral}
                className="w-full py-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold rounded-lg text-xs transition"
              >
                Solve for x
              </button>
            </div>
          )}

          {tab === 'quad' && (
            <div className="space-y-2">
              <div className="text-xs text-slate-400">ax² + bx + c = 0</div>
              <div className="grid grid-cols-3 gap-2">
                <input
                  type="text"
                  value={quadA}
                  onChange={(e) => setQuadA(e.target.value)}
                  placeholder="a"
                  className="px-2 py-1.5 bg-slate-950 border border-slate-700 rounded-lg text-center font-mono text-xs"
                />
                <input
                  type="text"
                  value={quadB}
                  onChange={(e) => setQuadB(e.target.value)}
                  placeholder="b"
                  className="px-2 py-1.5 bg-slate-950 border border-slate-700 rounded-lg text-center font-mono text-xs"
                />
                <input
                  type="text"
                  value={quadC}
                  onChange={(e) => setQuadC(e.target.value)}
                  placeholder="c"
                  className="px-2 py-1.5 bg-slate-950 border border-slate-700 rounded-lg text-center font-mono text-xs"
                />
              </div>
              <button
                onClick={handleSolveQuad}
                className="w-full py-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold rounded-lg text-xs transition"
              >
                Solve Quadratic
              </button>
            </div>
          )}

          {tab === 'cubic' && (
            <div className="space-y-2">
              <div className="text-xs text-slate-400">ax³ + bx² + cx + d = 0</div>
              <div className="grid grid-cols-4 gap-2">
                <input type="text" value={cubicA} onChange={(e) => setCubicA(e.target.value)} placeholder="a" className="px-2 py-1.5 bg-slate-950 border border-slate-700 rounded text-center text-xs font-mono" />
                <input type="text" value={cubicB} onChange={(e) => setCubicB(e.target.value)} placeholder="b" className="px-2 py-1.5 bg-slate-950 border border-slate-700 rounded text-center text-xs font-mono" />
                <input type="text" value={cubicC} onChange={(e) => setCubicC(e.target.value)} placeholder="c" className="px-2 py-1.5 bg-slate-950 border border-slate-700 rounded text-center text-xs font-mono" />
                <input type="text" value={cubicD} onChange={(e) => setCubicD(e.target.value)} placeholder="d" className="px-2 py-1.5 bg-slate-950 border border-slate-700 rounded text-center text-xs font-mono" />
              </div>
              <button onClick={handleSolveCubic} className="w-full py-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold rounded-lg text-xs transition">
                Solve Cubic
              </button>
            </div>
          )}

          {tab === 'quartic' && (
            <div className="space-y-2">
              <div className="text-xs text-slate-400">ax⁴ + bx³ + cx² + dx + e = 0</div>
              <div className="grid grid-cols-5 gap-1.5">
                <input type="text" value={quartA} onChange={(e) => setQuartA(e.target.value)} placeholder="a" className="px-1 py-1.5 bg-slate-950 border border-slate-700 rounded text-center text-xs font-mono" />
                <input type="text" value={quartB} onChange={(e) => setQuartB(e.target.value)} placeholder="b" className="px-1 py-1.5 bg-slate-950 border border-slate-700 rounded text-center text-xs font-mono" />
                <input type="text" value={quartC} onChange={(e) => setQuartC(e.target.value)} placeholder="c" className="px-1 py-1.5 bg-slate-950 border border-slate-700 rounded text-center text-xs font-mono" />
                <input type="text" value={quartD} onChange={(e) => setQuartD(e.target.value)} placeholder="d" className="px-1 py-1.5 bg-slate-950 border border-slate-700 rounded text-center text-xs font-mono" />
                <input type="text" value={quartE} onChange={(e) => setQuartE(e.target.value)} placeholder="e" className="px-1 py-1.5 bg-slate-950 border border-slate-700 rounded text-center text-xs font-mono" />
              </div>
              <button onClick={handleSolveQuartic} className="w-full py-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold rounded-lg text-xs transition">
                Solve Quartic
              </button>
            </div>
          )}

          {tab === '2var' && (
            <div className="space-y-2">
              <div className="text-xs text-slate-400">Equation 1: a₁·x + b₁·y = c₁</div>
              <div className="grid grid-cols-3 gap-2">
                <input type="text" value={lin2A1} onChange={(e) => setLin2A1(e.target.value)} placeholder="a1" className="px-2 py-1 bg-slate-950 border border-slate-700 rounded text-xs font-mono" />
                <input type="text" value={lin2B1} onChange={(e) => setLin2B1(e.target.value)} placeholder="b1" className="px-2 py-1 bg-slate-950 border border-slate-700 rounded text-xs font-mono" />
                <input type="text" value={lin2C1} onChange={(e) => setLin2C1(e.target.value)} placeholder="c1" className="px-2 py-1 bg-slate-950 border border-slate-700 rounded text-xs font-mono" />
              </div>
              <div className="text-xs text-slate-400 mt-2">Equation 2: a₂·x + b₂·y = c₂</div>
              <div className="grid grid-cols-3 gap-2">
                <input type="text" value={lin2A2} onChange={(e) => setLin2A2(e.target.value)} placeholder="a2" className="px-2 py-1 bg-slate-950 border border-slate-700 rounded text-xs font-mono" />
                <input type="text" value={lin2B2} onChange={(e) => setLin2B2(e.target.value)} placeholder="b2" className="px-2 py-1 bg-slate-950 border border-slate-700 rounded text-xs font-mono" />
                <input type="text" value={lin2C2} onChange={(e) => setLin2C2(e.target.value)} placeholder="c2" className="px-2 py-1 bg-slate-950 border border-slate-700 rounded text-xs font-mono" />
              </div>
              <button onClick={handleSolve2Var} className="w-full py-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold rounded-lg text-xs transition mt-2">
                Solve 2-Var System
              </button>
            </div>
          )}

          {tab === '3var' && (
            <div className="space-y-2">
              <div className="text-xs text-slate-400">Rows [a, b, c, d] for a·x + b·y + c·z = d:</div>
              <input type="text" value={lin3Row1} onChange={(e) => setLin3Row1(e.target.value)} placeholder="Row 1" className="w-full px-2 py-1.5 bg-slate-950 border border-slate-700 rounded text-xs font-mono" />
              <input type="text" value={lin3Row2} onChange={(e) => setLin3Row2(e.target.value)} placeholder="Row 2" className="w-full px-2 py-1.5 bg-slate-950 border border-slate-700 rounded text-xs font-mono" />
              <input type="text" value={lin3Row3} onChange={(e) => setLin3Row3(e.target.value)} placeholder="Row 3" className="w-full px-2 py-1.5 bg-slate-950 border border-slate-700 rounded text-xs font-mono" />
              <button onClick={handleSolve3Var} className="w-full py-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold rounded-lg text-xs transition">
                Solve 3-Var System
              </button>
            </div>
          )}

          {tab === 'newton' && (
            <div className="space-y-2">
              <label className="text-xs text-slate-400">Function f(x):</label>
              <input type="text" value={newtonFunc} onChange={(e) => setNewtonFunc(e.target.value)} className="w-full px-3 py-1.5 bg-slate-950 border border-slate-700 rounded text-xs font-mono" />
              <label className="text-xs text-slate-400">Initial Guess x₀:</label>
              <input type="text" value={newtonGuess} onChange={(e) => setNewtonGuess(e.target.value)} className="w-full px-3 py-1.5 bg-slate-950 border border-slate-700 rounded text-xs font-mono" />
              <button onClick={handleSolveNewton} className="w-full py-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold rounded-lg text-xs transition">
                Run Newton-Raphson
              </button>
            </div>
          )}

          {tab === 'bisect' && (
            <div className="space-y-2">
              <label className="text-xs text-slate-400">Function f(x):</label>
              <input type="text" value={bisectFunc} onChange={(e) => setBisectFunc(e.target.value)} className="w-full px-3 py-1.5 bg-slate-950 border border-slate-700 rounded text-xs font-mono" />
              <div className="grid grid-cols-2 gap-2">
                <input type="text" value={bisectA} onChange={(e) => setBisectA(e.target.value)} placeholder="Left a" className="px-2 py-1.5 bg-slate-950 border border-slate-700 rounded text-xs font-mono" />
                <input type="text" value={bisectB} onChange={(e) => setBisectB(e.target.value)} placeholder="Right b" className="px-2 py-1.5 bg-slate-950 border border-slate-700 rounded text-xs font-mono" />
              </div>
              <button onClick={handleSolveBisect} className="w-full py-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold rounded-lg text-xs transition">
                Run Bisection
              </button>
            </div>
          )}

          {tab === 'verify' && (
            <div className="space-y-2">
              <label className="text-xs text-slate-400">Equation to Verify:</label>
              <input type="text" value={verifyEq} onChange={(e) => setVerifyEq(e.target.value)} className="w-full px-3 py-1.5 bg-slate-950 border border-slate-700 rounded text-xs font-mono" />
              <button onClick={handleVerify} className="w-full py-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold rounded-lg text-xs transition">
                Verify Equation
              </button>
            </div>
          )}

          {/* Solution display box */}
          {resultText && (
            <div className="p-3 bg-cyan-950/40 border border-cyan-500/40 rounded-xl flex items-center justify-between text-xs font-mono text-cyan-300">
              <span>{resultText}</span>
              <button
                onClick={() => {
                  onApplyResult(resultText.replace(/^x = /i, ''));
                  onClose();
                }}
                className="px-2.5 py-1 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold rounded flex items-center gap-1 text-[11px]"
              >
                Apply
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
