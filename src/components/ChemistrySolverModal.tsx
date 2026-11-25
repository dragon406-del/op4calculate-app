import React, { useState } from 'react';
import { 
  X, 
  FlaskConical, 
  Atom, 
  Flame, 
  Droplet, 
  Wind, 
  Layers, 
  Scale, 
  Check, 
  Copy, 
  BookOpen,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { 
  calculateMolarMass, 
  parseChemicalFormula,
  findElement, 
  getElectronConfiguration, 
  identifyReactionType, 
  checkSolubility 
} from '../utils/chemistryEngine';

export type ChemistryCategory = 
  | 'molar' 
  | 'solutions' 
  | 'gases' 
  | 'stoichiometry' 
  | 'reactions' 
  | 'thermo' 
  | 'atomic' 
  | 'constants';

interface ChemistrySolverModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyResult: (val: string) => void;
  initialFormula?: string;
}

export const ChemistrySolverModal: React.FC<ChemistrySolverModalProps> = ({
  isOpen,
  onClose,
  onApplyResult,
  initialFormula = 'H2SO4',
}) => {
  const [activeTab, setActiveTab] = useState<ChemistryCategory>('molar');
  const [copied, setCopied] = useState<boolean>(false);

  // 1. Molar Mass & Composition States
  const [formula, setFormula] = useState<string>(initialFormula || 'H2SO4');
  const [empFormula, setEmpFormula] = useState<string>('CH2O');
  const [knownMolarMass, setKnownMolarMass] = useState<string>('180.16');

  // 2. Solutions States
  const [soluteMoles, setSoluteMoles] = useState<string>('0.5');
  const [solutionVolumeL, setSolutionVolumeL] = useState<string>('2.0');
  const [solventMassKg, setSolventMassKg] = useState<string>('1.5');
  const [equivalents, setEquivalents] = useState<string>('1.0');
  const [dilM1, setDilM1] = useState<string>('12.0');
  const [dilV1, setDilV1] = useState<string>('0.05');
  const [dilM2, setDilM2] = useState<string>('0.5');
  const [dilTarget, setDilTarget] = useState<'V2' | 'M2' | 'V1'>('V2');
  const [phMode, setPhMode] = useState<'fromH' | 'fromOH' | 'fromPH' | 'fromPOH'>('fromH');
  const [phVal, setPhVal] = useState<string>('1e-3');

  // 3. Gas Laws States
  const [gasLawType, setGasLawType] = useState<'ideal' | 'combined' | 'charles' | 'boyle' | 'gay'>('ideal');
  const [gasP, setGasP] = useState<string>('1.0'); // atm
  const [gasV, setGasV] = useState<string>('22.414'); // L
  const [gasN, setGasN] = useState<string>('1.0'); // mol
  const [gasT, setGasT] = useState<string>('273.15'); // K
  const [gasSolveTarget, setGasSolveTarget] = useState<'P' | 'V' | 'n' | 'T'>('P');

  const [combP1, setCombP1] = useState<string>('1.0');
  const [combV1, setCombV1] = useState<string>('2.0');
  const [combT1, setCombT1] = useState<string>('298');
  const [combP2, setCombP2] = useState<string>('2.0');
  const [combV2, setCombV2] = useState<string>('1.5');
  const [combT2, setCombT2] = useState<string>(''); // solved or user input

  // 4. Stoichiometry States
  const [stoichFormula, setStoichFormula] = useState<string>('H2O');
  const [stoichMass, setStoichMass] = useState<string>('36');
  const [reag1Formula, setReag1Formula] = useState<string>('H2');
  const [reag1Coeff, setReag1Coeff] = useState<string>('2');
  const [reag1Mass, setReag1Mass] = useState<string>('4.0');
  const [reag2Formula, setReag2Formula] = useState<string>('O2');
  const [reag2Coeff, setReag2Coeff] = useState<string>('1');
  const [reag2Mass, setReag2Mass] = useState<string>('32.0');
  const [actualYield, setActualYield] = useState<string>('32.4');
  const [theoYield, setTheoYield] = useState<string>('36.0');

  // 5. Reactions States
  const [reactionEq, setReactionEq] = useState<string>('2H2 + O2 -> 2H2O');
  const [solCompound, setSolCompound] = useState<string>('AgCl');

  // 6. Thermodynamics & Half Life
  const [heatMass, setHeatMass] = useState<string>('250'); // g
  const [heatC, setHeatC] = useState<string>('4.184'); // J/(g·°C) for water
  const [heatDeltaT, setHeatDeltaT] = useState<string>('25'); // °C
  const [halfLifeN0, setHalfLifeN0] = useState<string>('100'); // initial
  const [halfLifeT12, setHalfLifeT12] = useState<string>('5730'); // years (C-14)
  const [halfLifeTime, setHalfLifeTime] = useState<string>('11460'); // elapsed years

  // 7. Atomic & Orbitals
  const [elementQuery, setElementQuery] = useState<string>('Fe');

  if (!isOpen) return null;

  const handleApply = (val: string) => {
    onApplyResult(val);
    onClose();
  };

  const copyText = (txt: string) => {
    navigator.clipboard.writeText(txt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Calculations
  const molarRes = calculateMolarMass(formula);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="flex flex-col w-full max-w-4xl max-h-[92vh] bg-slate-900 border border-slate-700/80 rounded-3xl shadow-2xl text-slate-100 overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/60">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
              <FlaskConical className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-100 flex items-center gap-2">
                Chemistry Solver Menu
                <span className="text-xs px-2 py-0.5 rounded-full bg-cyan-900/60 text-cyan-300 border border-cyan-700/50">
                  All 30 Solvers
                </span>
              </h2>
              <p className="text-xs text-slate-400">
                Full-spectrum chemistry problem solvers: Molar mass, Stoichiometry, Solutions, Gases & Atomic
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Categories Tab Navigation */}
        <div className="flex items-center gap-1.5 px-4 sm:px-6 py-2.5 border-b border-slate-800/80 bg-slate-950/40 overflow-x-auto no-scrollbar text-xs">
          {[
            { id: 'molar', label: 'Molar Mass & Composition', icon: Scale },
            { id: 'solutions', label: 'Solutions & pH', icon: Droplet },
            { id: 'gases', label: 'Gas Laws', icon: Wind },
            { id: 'stoichiometry', label: 'Stoichiometry & Yield', icon: Layers },
            { id: 'reactions', label: 'Reactions & Solubility', icon: Sparkles },
            { id: 'thermo', label: 'Heat & Half-Life', icon: Flame },
            { id: 'atomic', label: 'Orbitals & Trends', icon: Atom },
            { id: 'constants', label: 'Constants & Units', icon: BookOpen },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as ChemistryCategory)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl font-medium whitespace-nowrap transition ${
                  isActive
                    ? 'bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-300 border border-cyan-500/40 font-bold shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">

          {/* ================= 1. MOLAR MASS & COMPOSITION ================= */}
          {activeTab === 'molar' && (
            <div className="space-y-6">
              {/* Formula Input Card */}
              <div className="p-4 sm:p-5 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">
                    Chemical Formula (supports parentheses like Ca(OH)2, (NH4)2SO4)
                  </span>
                  <div className="flex gap-1.5 text-[11px]">
                    {['H2SO4', 'Ca(OH)2', 'C6H12O6', 'CuSO4', '(NH4)2SO4'].map((s) => (
                      <button
                        key={s}
                        onClick={() => setFormula(s)}
                        className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 hover:text-cyan-300 hover:bg-slate-700 transition font-mono"
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex gap-2">
                  <input
                    type="text"
                    value={formula}
                    onChange={(e) => setFormula(e.target.value)}
                    placeholder="Enter formula e.g. H2SO4, Fe2(SO4)3"
                    className="flex-1 px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 font-mono text-sm text-cyan-300 focus:outline-none focus:border-cyan-500"
                  />
                  <button
                    onClick={() => handleApply(molarRes.molarMass.toFixed(4))}
                    disabled={!molarRes.isValid}
                    className="px-4 py-2.5 bg-cyan-500 hover:bg-cyan-400 disabled:opacity-50 text-slate-950 font-bold rounded-xl text-xs flex items-center gap-1.5 transition"
                  >
                    Apply Mass
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

                {/* Result Display */}
                {molarRes.isValid ? (
                  <div className="p-4 rounded-xl bg-slate-900/90 border border-cyan-500/30 space-y-3">
                    <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                      <div className="text-xs text-slate-400">Total Molecular Mass:</div>
                      <div className="text-lg font-mono font-bold text-cyan-300">
                        {molarRes.molarMass.toFixed(5)} <span className="text-xs text-slate-400 font-normal">g/mol</span>
                      </div>
                    </div>

                    <div className="text-xs font-semibold text-slate-300">Percentage Composition (% by mass):</div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                      {molarRes.breakdown.map((b) => (
                        <div key={b.symbol} className="p-2.5 rounded-lg bg-slate-950/80 border border-slate-800 flex flex-col gap-1">
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-sm text-amber-300 font-mono">{b.symbol}</span>
                            <span className="text-[11px] text-slate-400">{b.name}</span>
                          </div>
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-slate-400 font-mono">{b.count} × {b.atomicMass.toFixed(3)}</span>
                            <span className="font-bold text-cyan-300 font-mono">{b.percent.toFixed(2)}%</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="text-xs text-rose-400 font-mono">
                    {molarRes.error || 'Enter a valid chemical formula'}
                  </div>
                )}
              </div>

              {/* Empirical to Molecular Formula */}
              <div className="p-4 sm:p-5 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-4">
                <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider block">
                  Empirical to Molecular Formula
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="text-slate-400 block mb-1">Empirical Formula:</label>
                    <input
                      type="text"
                      value={empFormula}
                      onChange={(e) => setEmpFormula(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl font-mono text-cyan-300"
                    />
                  </div>
                  <div>
                    <label className="text-slate-400 block mb-1">Experimental Molar Mass (g/mol):</label>
                    <input
                      type="text"
                      value={knownMolarMass}
                      onChange={(e) => setKnownMolarMass(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl font-mono text-cyan-300"
                    />
                  </div>
                </div>

                {(() => {
                  const empRes = calculateMolarMass(empFormula);
                  const expMass = parseFloat(knownMolarMass);
                  if (empRes.isValid && !isNaN(expMass) && empRes.molarMass > 0) {
                    const ratio = Math.round(expMass / empRes.molarMass);
                    const counts: Record<string, number> = parseChemicalFormula(empFormula);
                    const molecularFormulaStr = Object.entries(counts)
                      .map(([sym, c]) => `${sym}${(c as number) * ratio > 1 ? (c as number) * ratio : ''}`)
                      .join('');

                    return (
                      <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 flex items-center justify-between">
                        <div>
                          <div className="text-xs text-slate-400">
                            Empirical Mass: <span className="font-mono text-slate-200">{empRes.molarMass.toFixed(2)} g/mol</span> | Multiplier n = <span className="text-amber-300 font-bold">{ratio}</span>
                          </div>
                          <div className="text-sm font-bold text-cyan-300 font-mono mt-0.5">
                            Molecular Formula: {molecularFormulaStr}
                          </div>
                        </div>
                        <button
                          onClick={() => handleApply(molecularFormulaStr)}
                          className="px-3 py-1.5 bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 font-bold text-xs rounded-lg border border-cyan-500/30"
                        >
                          Apply Formula
                        </button>
                      </div>
                    );
                  }
                  return null;
                })()}
              </div>
            </div>
          )}

          {/* ================= 2. SOLUTIONS & pH ================= */}
          {activeTab === 'solutions' && (
            <div className="space-y-6">
              {/* Molarity, Molality, Normality */}
              <div className="p-4 sm:p-5 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-4">
                <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider block">
                  Concentration Solvers (Molarity, Molality & Normality)
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
                  <div>
                    <label className="text-slate-400 block mb-1">Moles Solute (mol):</label>
                    <input
                      type="text"
                      value={soluteMoles}
                      onChange={(e) => setSoluteMoles(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl font-mono text-cyan-300"
                    />
                  </div>
                  <div>
                    <label className="text-slate-400 block mb-1">Solution Volume (L):</label>
                    <input
                      type="text"
                      value={solutionVolumeL}
                      onChange={(e) => setSolutionVolumeL(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl font-mono text-cyan-300"
                    />
                  </div>
                  <div>
                    <label className="text-slate-400 block mb-1">Solvent Mass (kg):</label>
                    <input
                      type="text"
                      value={solventMassKg}
                      onChange={(e) => setSolventMassKg(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl font-mono text-cyan-300"
                    />
                  </div>
                  <div>
                    <label className="text-slate-400 block mb-1">Equivalents (eq):</label>
                    <input
                      type="text"
                      value={equivalents}
                      onChange={(e) => setEquivalents(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl font-mono text-cyan-300"
                    />
                  </div>
                </div>

                {(() => {
                  const n = parseFloat(soluteMoles) || 0;
                  const v = parseFloat(solutionVolumeL) || 1;
                  const kg = parseFloat(solventMassKg) || 1;
                  const eq = parseFloat(equivalents) || 1;

                  const molarity = n / v;
                  const molality = n / kg;
                  const normality = eq / v;

                  return (
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                        <div className="text-[11px] text-slate-400">Molarity (M = n/V)</div>
                        <div className="text-base font-bold font-mono text-cyan-300 mt-1">
                          {molarity.toFixed(4)} <span className="text-xs text-slate-500 font-normal">mol/L</span>
                        </div>
                        <button
                          onClick={() => handleApply(molarity.toFixed(4))}
                          className="mt-2 text-[10px] text-cyan-400 hover:underline"
                        >
                          Apply to calc →
                        </button>
                      </div>
                      <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                        <div className="text-[11px] text-slate-400">Molality (m = n/kg solvent)</div>
                        <div className="text-base font-bold font-mono text-amber-300 mt-1">
                          {molality.toFixed(4)} <span className="text-xs text-slate-500 font-normal">mol/kg</span>
                        </div>
                        <button
                          onClick={() => handleApply(molality.toFixed(4))}
                          className="mt-2 text-[10px] text-amber-400 hover:underline"
                        >
                          Apply to calc →
                        </button>
                      </div>
                      <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                        <div className="text-[11px] text-slate-400">Normality (N = eq/V)</div>
                        <div className="text-base font-bold font-mono text-emerald-300 mt-1">
                          {normality.toFixed(4)} <span className="text-xs text-slate-500 font-normal">N</span>
                        </div>
                        <button
                          onClick={() => handleApply(normality.toFixed(4))}
                          className="mt-2 text-[10px] text-emerald-400 hover:underline"
                        >
                          Apply to calc →
                        </button>
                      </div>
                    </div>
                  );
                })()}
              </div>

              {/* Dilution Equation M1*V1 = M2*V2 */}
              <div className="p-4 sm:p-5 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-4">
                <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider block">
                  Dilution Calculator: M₁ × V₁ = M₂ × V₂
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
                  <div>
                    <label className="text-slate-400 block mb-1">M₁ (Initial M):</label>
                    <input
                      type="text"
                      value={dilM1}
                      onChange={(e) => setDilM1(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl font-mono text-cyan-300"
                    />
                  </div>
                  <div>
                    <label className="text-slate-400 block mb-1">V₁ (Initial Vol L):</label>
                    <input
                      type="text"
                      value={dilV1}
                      onChange={(e) => setDilV1(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl font-mono text-cyan-300"
                    />
                  </div>
                  <div>
                    <label className="text-slate-400 block mb-1">M₂ (Final M):</label>
                    <input
                      type="text"
                      value={dilM2}
                      onChange={(e) => setDilM2(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl font-mono text-cyan-300"
                    />
                  </div>
                  <div className="flex flex-col justify-end">
                    <button
                      onClick={() => {
                        const m1 = parseFloat(dilM1) || 0;
                        const v1 = parseFloat(dilV1) || 0;
                        const m2 = parseFloat(dilM2) || 1;
                        const v2 = (m1 * v1) / m2;
                        handleApply(v2.toFixed(4));
                      }}
                      className="w-full py-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold rounded-xl transition"
                    >
                      Solve V₂ = {((parseFloat(dilM1) * parseFloat(dilV1)) / (parseFloat(dilM2) || 1)).toFixed(4)} L
                    </button>
                  </div>
                </div>
              </div>

              {/* pH & pOH Calculator */}
              <div className="p-4 sm:p-5 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-4">
                <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider block">
                  pH, pOH, [H⁺] & [OH⁻] Interconverter
                </span>
                <div className="flex flex-wrap gap-2 text-xs">
                  {[
                    { id: 'fromH', label: 'From [H⁺]' },
                    { id: 'fromOH', label: 'From [OH⁻]' },
                    { id: 'fromPH', label: 'From pH' },
                    { id: 'fromPOH', label: 'From pOH' },
                  ].map((m) => (
                    <button
                      key={m.id}
                      onClick={() => setPhMode(m.id as any)}
                      className={`px-3 py-1 rounded-lg ${
                        phMode === m.id
                          ? 'bg-cyan-500/30 text-cyan-300 border border-cyan-500/40 font-bold'
                          : 'bg-slate-800 text-slate-400 hover:text-white'
                      }`}
                    >
                      {m.label}
                    </button>
                  ))}
                </div>

                <div className="flex gap-2 text-xs">
                  <input
                    type="text"
                    value={phVal}
                    onChange={(e) => setPhVal(e.target.value)}
                    placeholder={phMode.includes('H') && !phMode.includes('P') ? 'e.g. 1e-7 or 0.001' : 'e.g. 7.0 or 2.5'}
                    className="flex-1 px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl font-mono text-cyan-300 text-sm"
                  />
                </div>

                {(() => {
                  const val = parseFloat(phVal);
                  let pH = 7, pOH = 7, h = 1e-7, oh = 1e-7;
                  if (!isNaN(val) && val > 0) {
                    if (phMode === 'fromH') {
                      h = val;
                      pH = -Math.log10(h);
                      pOH = 14 - pH;
                      oh = Math.pow(10, -pOH);
                    } else if (phMode === 'fromOH') {
                      oh = val;
                      pOH = -Math.log10(oh);
                      pH = 14 - pOH;
                      h = Math.pow(10, -pH);
                    } else if (phMode === 'fromPH') {
                      pH = val;
                      pOH = 14 - pH;
                      h = Math.pow(10, -pH);
                      oh = Math.pow(10, -pOH);
                    } else if (phMode === 'fromPOH') {
                      pOH = val;
                      pH = 14 - pOH;
                      h = Math.pow(10, -pH);
                      oh = Math.pow(10, -pOH);
                    }
                  }

                  const acidity = pH < 7 ? 'Acidic' : pH > 7 ? 'Basic (Alkaline)' : 'Neutral';

                  return (
                    <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
                      <div>
                        <div className="text-slate-400">Solution Character: <span className="font-bold text-amber-300">{acidity}</span></div>
                        <div className="font-mono text-cyan-300 font-bold text-sm mt-1">
                          pH = {pH.toFixed(2)} | pOH = {pOH.toFixed(2)}
                        </div>
                        <div className="font-mono text-slate-300 text-[11px] mt-0.5">
                          [H⁺] = {h.toExponential(3)} M | [OH⁻] = {oh.toExponential(3)} M
                        </div>
                      </div>
                      <button
                        onClick={() => handleApply(pH.toFixed(2))}
                        className="px-3 py-1.5 bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 font-bold rounded-lg border border-cyan-500/30"
                      >
                        Apply pH
                      </button>
                    </div>
                  );
                })()}
              </div>
            </div>
          )}

          {/* ================= 3. GAS LAWS ================= */}
          {activeTab === 'gases' && (
            <div className="space-y-6">
              {/* Ideal Gas Law PV = nRT */}
              <div className="p-4 sm:p-5 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">
                    Ideal Gas Law: P × V = n × R × T (R = 0.08206 L·atm/(mol·K))
                  </span>
                  <div className="flex gap-1 text-xs">
                    <span className="text-slate-400 mr-1">Solve for:</span>
                    {(['P', 'V', 'n', 'T'] as const).map((t) => (
                      <button
                        key={t}
                        onClick={() => setGasSolveTarget(t)}
                        className={`px-2 py-0.5 rounded ${
                          gasSolveTarget === t ? 'bg-cyan-500 text-slate-950 font-bold' : 'bg-slate-800 text-slate-400'
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                  <div>
                    <label className="text-slate-400 block mb-1">Pressure P (atm):</label>
                    <input
                      type="text"
                      disabled={gasSolveTarget === 'P'}
                      value={gasP}
                      onChange={(e) => setGasP(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl font-mono text-cyan-300 disabled:opacity-50"
                    />
                  </div>
                  <div>
                    <label className="text-slate-400 block mb-1">Volume V (L):</label>
                    <input
                      type="text"
                      disabled={gasSolveTarget === 'V'}
                      value={gasV}
                      onChange={(e) => setGasV(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl font-mono text-cyan-300 disabled:opacity-50"
                    />
                  </div>
                  <div>
                    <label className="text-slate-400 block mb-1">Moles n (mol):</label>
                    <input
                      type="text"
                      disabled={gasSolveTarget === 'n'}
                      value={gasN}
                      onChange={(e) => setGasN(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl font-mono text-cyan-300 disabled:opacity-50"
                    />
                  </div>
                  <div>
                    <label className="text-slate-400 block mb-1">Temp T (K):</label>
                    <input
                      type="text"
                      disabled={gasSolveTarget === 'T'}
                      value={gasT}
                      onChange={(e) => setGasT(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl font-mono text-cyan-300 disabled:opacity-50"
                    />
                  </div>
                </div>

                {(() => {
                  const R = 0.082057;
                  const p = parseFloat(gasP) || 1;
                  const v = parseFloat(gasV) || 1;
                  const n = parseFloat(gasN) || 1;
                  const t = parseFloat(gasT) || 298.15;

                  let res = 0;
                  let unit = '';
                  if (gasSolveTarget === 'P') {
                    res = (n * R * t) / v;
                    unit = 'atm';
                  } else if (gasSolveTarget === 'V') {
                    res = (n * R * t) / p;
                    unit = 'L';
                  } else if (gasSolveTarget === 'n') {
                    res = (p * v) / (R * t);
                    unit = 'mol';
                  } else if (gasSolveTarget === 'T') {
                    res = (p * v) / (n * R);
                    unit = 'K';
                  }

                  return (
                    <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 flex items-center justify-between">
                      <div>
                        <div className="text-xs text-slate-400">Calculated {gasSolveTarget}:</div>
                        <div className="text-base font-bold font-mono text-cyan-300">
                          {gasSolveTarget} = {res.toFixed(5)} {unit}
                        </div>
                      </div>
                      <button
                        onClick={() => handleApply(res.toFixed(5))}
                        className="px-3 py-1.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold rounded-xl text-xs"
                      >
                        Apply Result
                      </button>
                    </div>
                  );
                })()}
              </div>

              {/* Combined Gas Law: (P1*V1)/T1 = (P2*V2)/T2 */}
              <div className="p-4 sm:p-5 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-4">
                <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider block">
                  Combined Gas Law: (P₁ × V₁) / T₁ = (P₂ × V₂) / T₂
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 text-xs">
                  <div>
                    <label className="text-slate-400 block mb-1">P₁ (atm):</label>
                    <input type="text" value={combP1} onChange={(e) => setCombP1(e.target.value)} className="w-full px-2.5 py-1.5 bg-slate-900 border border-slate-700 rounded-lg font-mono text-cyan-300" />
                  </div>
                  <div>
                    <label className="text-slate-400 block mb-1">V₁ (L):</label>
                    <input type="text" value={combV1} onChange={(e) => setCombV1(e.target.value)} className="w-full px-2.5 py-1.5 bg-slate-900 border border-slate-700 rounded-lg font-mono text-cyan-300" />
                  </div>
                  <div>
                    <label className="text-slate-400 block mb-1">T₁ (K):</label>
                    <input type="text" value={combT1} onChange={(e) => setCombT1(e.target.value)} className="w-full px-2.5 py-1.5 bg-slate-900 border border-slate-700 rounded-lg font-mono text-cyan-300" />
                  </div>
                  <div>
                    <label className="text-slate-400 block mb-1">P₂ (atm):</label>
                    <input type="text" value={combP2} onChange={(e) => setCombP2(e.target.value)} className="w-full px-2.5 py-1.5 bg-slate-900 border border-slate-700 rounded-lg font-mono text-cyan-300" />
                  </div>
                  <div>
                    <label className="text-slate-400 block mb-1">V₂ (L):</label>
                    <input type="text" value={combV2} onChange={(e) => setCombV2(e.target.value)} className="w-full px-2.5 py-1.5 bg-slate-900 border border-slate-700 rounded-lg font-mono text-cyan-300" />
                  </div>
                </div>

                {(() => {
                  const p1 = parseFloat(combP1) || 1;
                  const v1 = parseFloat(combV1) || 1;
                  const t1 = parseFloat(combT1) || 273.15;
                  const p2 = parseFloat(combP2) || 1;
                  const v2 = parseFloat(combV2) || 1;

                  const solvedT2 = (p2 * v2 * t1) / (p1 * v1);

                  return (
                    <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 flex items-center justify-between text-xs">
                      <div>
                        <span className="text-slate-400">Solved Final Temperature T₂:</span>
                        <div className="text-sm font-bold font-mono text-cyan-300 mt-0.5">
                          T₂ = {solvedT2.toFixed(2)} K ({(solvedT2 - 273.15).toFixed(2)} °C)
                        </div>
                      </div>
                      <button
                        onClick={() => handleApply(solvedT2.toFixed(2))}
                        className="px-3 py-1.5 bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 font-bold rounded-lg border border-cyan-500/30"
                      >
                        Apply T₂
                      </button>
                    </div>
                  );
                })()}
              </div>
            </div>
          )}

          {/* ================= 4. STOICHIOMETRY & YIELD ================= */}
          {activeTab === 'stoichiometry' && (
            <div className="space-y-6">
              {/* Mass to Moles to Particles */}
              <div className="p-4 sm:p-5 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-4">
                <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider block">
                  Mass ↔ Moles ↔ Particles Converter (Avogadro = 6.022 × 10²³)
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="text-slate-400 block mb-1">Compound Formula:</label>
                    <input
                      type="text"
                      value={stoichFormula}
                      onChange={(e) => setStoichFormula(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl font-mono text-cyan-300"
                    />
                  </div>
                  <div>
                    <label className="text-slate-400 block mb-1">Given Mass (grams):</label>
                    <input
                      type="text"
                      value={stoichMass}
                      onChange={(e) => setStoichMass(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl font-mono text-cyan-300"
                    />
                  </div>
                </div>

                {(() => {
                  const res = calculateMolarMass(stoichFormula);
                  const m = parseFloat(stoichMass) || 0;
                  const AVOGADRO = 6.02214076e23;
                  if (res.isValid && res.molarMass > 0 && m > 0) {
                    const moles = m / res.molarMass;
                    const particles = moles * AVOGADRO;

                    return (
                      <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 space-y-2 text-xs">
                        <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                          <span className="text-slate-400">Moles of {stoichFormula}:</span>
                          <span className="font-mono font-bold text-cyan-300 text-sm">{moles.toFixed(5)} mol</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-slate-400">Total Particles / Molecules:</span>
                          <span className="font-mono font-bold text-amber-300 text-sm">{particles.toExponential(4)}</span>
                        </div>
                      </div>
                    );
                  }
                  return null;
                })()}
              </div>

              {/* Limiting Reagent Solver */}
              <div className="p-4 sm:p-5 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-4">
                <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider block">
                  Limiting Reagent & Theoretical Yield Calculator
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  {/* Reactant 1 */}
                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                    <span className="font-bold text-slate-300">Reactant 1</span>
                    <div className="grid grid-cols-3 gap-2">
                      <div>
                        <label className="text-slate-500 block mb-1">Formula</label>
                        <input type="text" value={reag1Formula} onChange={(e) => setReag1Formula(e.target.value)} className="w-full px-2 py-1 bg-slate-950 border border-slate-700 rounded font-mono" />
                      </div>
                      <div>
                        <label className="text-slate-500 block mb-1">Coeff</label>
                        <input type="text" value={reag1Coeff} onChange={(e) => setReag1Coeff(e.target.value)} className="w-full px-2 py-1 bg-slate-950 border border-slate-700 rounded font-mono" />
                      </div>
                      <div>
                        <label className="text-slate-500 block mb-1">Mass (g)</label>
                        <input type="text" value={reag1Mass} onChange={(e) => setReag1Mass(e.target.value)} className="w-full px-2 py-1 bg-slate-950 border border-slate-700 rounded font-mono" />
                      </div>
                    </div>
                  </div>

                  {/* Reactant 2 */}
                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                    <span className="font-bold text-slate-300">Reactant 2</span>
                    <div className="grid grid-cols-3 gap-2">
                      <div>
                        <label className="text-slate-500 block mb-1">Formula</label>
                        <input type="text" value={reag2Formula} onChange={(e) => setReag2Formula(e.target.value)} className="w-full px-2 py-1 bg-slate-950 border border-slate-700 rounded font-mono" />
                      </div>
                      <div>
                        <label className="text-slate-500 block mb-1">Coeff</label>
                        <input type="text" value={reag2Coeff} onChange={(e) => setReag2Coeff(e.target.value)} className="w-full px-2 py-1 bg-slate-950 border border-slate-700 rounded font-mono" />
                      </div>
                      <div>
                        <label className="text-slate-500 block mb-1">Mass (g)</label>
                        <input type="text" value={reag2Mass} onChange={(e) => setReag2Mass(e.target.value)} className="w-full px-2 py-1 bg-slate-950 border border-slate-700 rounded font-mono" />
                      </div>
                    </div>
                  </div>
                </div>

                {(() => {
                  const m1 = calculateMolarMass(reag1Formula);
                  const m2 = calculateMolarMass(reag2Formula);
                  const mass1 = parseFloat(reag1Mass) || 0;
                  const mass2 = parseFloat(reag2Mass) || 0;
                  const c1 = parseFloat(reag1Coeff) || 1;
                  const c2 = parseFloat(reag2Coeff) || 1;

                  if (m1.isValid && m2.isValid && mass1 > 0 && mass2 > 0) {
                    const mol1 = mass1 / m1.molarMass;
                    const mol2 = mass2 / m2.molarMass;
                    const ratio1 = mol1 / c1;
                    const ratio2 = mol2 / c2;

                    const limiting = ratio1 < ratio2 ? reag1Formula : reag2Formula;
                    const excess = ratio1 < ratio2 ? reag2Formula : reag1Formula;

                    return (
                      <div className="p-3 bg-cyan-950/40 border border-cyan-500/30 rounded-xl flex items-center justify-between text-xs">
                        <div>
                          <div className="text-slate-400">Limiting Reagent Determination:</div>
                          <div className="text-sm font-bold text-cyan-300 mt-0.5">
                            ★ <span className="underline">{limiting}</span> is the Limiting Reagent (Excess: {excess})
                          </div>
                          <div className="text-[11px] text-slate-400 mt-1">
                            {reag1Formula}: {mol1.toFixed(3)} mol ({ratio1.toFixed(3)} eq) vs {reag2Formula}: {mol2.toFixed(3)} mol ({ratio2.toFixed(3)} eq)
                          </div>
                        </div>
                        <button
                          onClick={() => handleApply(`${limiting} is limiting reagent`)}
                          className="px-3 py-1.5 bg-cyan-500 text-slate-950 font-bold rounded-lg"
                        >
                          Apply Result
                        </button>
                      </div>
                    );
                  }
                  return null;
                })()}
              </div>

              {/* Percent Yield */}
              <div className="p-4 sm:p-5 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-3">
                <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider block">
                  Percent Yield = (Actual Yield / Theoretical Yield) × 100%
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="text-slate-400 block mb-1">Actual Yield (g):</label>
                    <input type="text" value={actualYield} onChange={(e) => setActualYield(e.target.value)} className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl font-mono text-cyan-300" />
                  </div>
                  <div>
                    <label className="text-slate-400 block mb-1">Theoretical Yield (g):</label>
                    <input type="text" value={theoYield} onChange={(e) => setTheoYield(e.target.value)} className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl font-mono text-cyan-300" />
                  </div>
                </div>
                {(() => {
                  const act = parseFloat(actualYield) || 0;
                  const theo = parseFloat(theoYield) || 1;
                  const pct = (act / theo) * 100;
                  return (
                    <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 flex items-center justify-between text-xs">
                      <div>
                        <span className="text-slate-400">Percent Yield:</span>
                        <span className="font-bold font-mono text-emerald-400 text-sm ml-2">{pct.toFixed(2)}%</span>
                      </div>
                      <button onClick={() => handleApply(`${pct.toFixed(2)}%`)} className="px-3 py-1.5 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 rounded-lg font-bold">
                        Apply Yield
                      </button>
                    </div>
                  );
                })()}
              </div>
            </div>
          )}

          {/* ================= 5. REACTIONS & SOLUBILITY ================= */}
          {activeTab === 'reactions' && (
            <div className="space-y-6">
              {/* Reaction Type Classifier */}
              <div className="p-4 sm:p-5 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">
                    Chemical Reaction Classifier
                  </span>
                  <div className="flex gap-1 text-[11px]">
                    {[
                      '2H2 + O2 -> 2H2O',
                      'CaCO3 -> CaO + CO2',
                      'Zn + 2HCl -> ZnCl2 + H2',
                      'CH4 + 2O2 -> CO2 + 2H2O',
                      'AgNO3 + NaCl -> AgCl + NaNO3',
                    ].map((eq) => (
                      <button
                        key={eq}
                        onClick={() => setReactionEq(eq)}
                        className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 hover:text-cyan-300 font-mono"
                      >
                        {eq.split('->')[0]}
                      </button>
                    ))}
                  </div>
                </div>

                <input
                  type="text"
                  value={reactionEq}
                  onChange={(e) => setReactionEq(e.target.value)}
                  placeholder="Enter equation e.g. 2H2 + O2 -> 2H2O"
                  className="w-full px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-xl font-mono text-cyan-300 text-sm"
                />

                {(() => {
                  const typeRes = identifyReactionType(reactionEq);
                  return (
                    <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2">
                      <div className="text-xs text-slate-400">Classified Reaction Type:</div>
                      <div className="text-base font-bold text-amber-300 font-mono">
                        {typeRes.type}
                      </div>
                      <div className="text-xs text-slate-300">
                        {typeRes.explanation}
                      </div>
                    </div>
                  );
                })()}
              </div>

              {/* Solubility Rules Predictor */}
              <div className="p-4 sm:p-5 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-4">
                <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider block">
                  Solubility Rules & Precipitate Predictor
                </span>
                <div className="flex flex-wrap gap-1.5 text-xs">
                  {['NaCl', 'AgCl', 'BaSO4', 'KNO3', 'CaCO3', 'PbI2', 'Fe(OH)3', 'NH4Cl'].map((comp) => (
                    <button
                      key={comp}
                      onClick={() => setSolCompound(comp)}
                      className="px-2.5 py-1 rounded bg-slate-800 text-slate-300 hover:bg-slate-700 font-mono"
                    >
                      {comp}
                    </button>
                  ))}
                </div>

                <div className="flex gap-2 text-xs">
                  <input
                    type="text"
                    value={solCompound}
                    onChange={(e) => setSolCompound(e.target.value)}
                    placeholder="Enter ionic compound e.g. AgCl, BaSO4"
                    className="flex-1 px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl font-mono text-cyan-300 text-sm"
                  />
                </div>

                {(() => {
                  const sol = checkSolubility(solCompound);
                  const isSol = sol.status === 'Soluble';
                  return (
                    <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 space-y-1 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="text-slate-400">Compound: <strong className="text-white font-mono">{sol.compound}</strong></span>
                        <span className={`px-2 py-0.5 rounded font-bold text-xs ${
                          isSol ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                        }`}>
                          {sol.status}
                        </span>
                      </div>
                      <div className="text-slate-300 text-[11px] pt-1">
                        Rule: {sol.rule}
                      </div>
                    </div>
                  );
                })()}
              </div>
            </div>
          )}

          {/* ================= 6. THERMODYNAMICS & HALF-LIFE ================= */}
          {activeTab === 'thermo' && (
            <div className="space-y-6">
              {/* Heat Calculation q = mcΔT */}
              <div className="p-4 sm:p-5 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-4">
                <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider block">
                  Calorimetry: q = m × c × ΔT
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  <div>
                    <label className="text-slate-400 block mb-1">Mass m (g):</label>
                    <input type="text" value={heatMass} onChange={(e) => setHeatMass(e.target.value)} className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl font-mono text-cyan-300" />
                  </div>
                  <div>
                    <label className="text-slate-400 block mb-1">Specific Heat c (J/(g·°C)):</label>
                    <input type="text" value={heatC} onChange={(e) => setHeatC(e.target.value)} className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl font-mono text-cyan-300" />
                  </div>
                  <div>
                    <label className="text-slate-400 block mb-1">Temperature Change ΔT (°C):</label>
                    <input type="text" value={heatDeltaT} onChange={(e) => setHeatDeltaT(e.target.value)} className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl font-mono text-cyan-300" />
                  </div>
                </div>

                {(() => {
                  const m = parseFloat(heatMass) || 0;
                  const c = parseFloat(heatC) || 0;
                  const dt = parseFloat(heatDeltaT) || 0;
                  const qJoules = m * c * dt;
                  const qKJ = qJoules / 1000;

                  return (
                    <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 flex items-center justify-between text-xs">
                      <div>
                        <div className="text-slate-400">Heat Exchanged q:</div>
                        <div className="font-mono text-base font-bold text-amber-300">
                          {qJoules.toFixed(2)} Joules ({qKJ.toFixed(4)} kJ)
                        </div>
                      </div>
                      <button
                        onClick={() => handleApply(`${qKJ.toFixed(3)} kJ`)}
                        className="px-3 py-1.5 bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/30 font-bold rounded-lg"
                      >
                        Apply q (kJ)
                      </button>
                    </div>
                  );
                })()}
              </div>

              {/* Half-Life Calculator */}
              <div className="p-4 sm:p-5 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-4">
                <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider block">
                  Radioactive Decay & Half-Life: N(t) = N₀ × (1/2)^(t / t½)
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  <div>
                    <label className="text-slate-400 block mb-1">Initial Amount N₀:</label>
                    <input type="text" value={halfLifeN0} onChange={(e) => setHalfLifeN0(e.target.value)} className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl font-mono text-cyan-300" />
                  </div>
                  <div>
                    <label className="text-slate-400 block mb-1">Half-Life t½ (years/days):</label>
                    <input type="text" value={halfLifeT12} onChange={(e) => setHalfLifeT12(e.target.value)} className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl font-mono text-cyan-300" />
                  </div>
                  <div>
                    <label className="text-slate-400 block mb-1">Elapsed Time t:</label>
                    <input type="text" value={halfLifeTime} onChange={(e) => setHalfLifeTime(e.target.value)} className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl font-mono text-cyan-300" />
                  </div>
                </div>

                {(() => {
                  const n0 = parseFloat(halfLifeN0) || 0;
                  const t12 = parseFloat(halfLifeT12) || 1;
                  const t = parseFloat(halfLifeTime) || 0;
                  const halfLives = t / t12;
                  const remaining = n0 * Math.pow(0.5, halfLives);
                  const decayed = n0 - remaining;

                  return (
                    <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 flex items-center justify-between text-xs">
                      <div>
                        <div className="text-slate-400">Remaining N(t) after {halfLives.toFixed(2)} half-lives:</div>
                        <div className="font-mono text-base font-bold text-cyan-300">
                          {remaining.toFixed(4)} ({((remaining / (n0 || 1)) * 100).toFixed(2)}% remaining)
                        </div>
                        <div className="text-[11px] text-slate-400 mt-0.5">Decayed Amount = {decayed.toFixed(4)}</div>
                      </div>
                      <button
                        onClick={() => handleApply(remaining.toFixed(4))}
                        className="px-3 py-1.5 bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/30 font-bold rounded-lg"
                      >
                        Apply N(t)
                      </button>
                    </div>
                  );
                })()}
              </div>
            </div>
          )}

          {/* ================= 7. ATOMIC STRUCTURE & ORBITALS ================= */}
          {activeTab === 'atomic' && (
            <div className="space-y-6">
              <div className="p-4 sm:p-5 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-4">
                <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider block">
                  Electron Configuration & Orbital Box Diagram (Hund's Rule)
                </span>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={elementQuery}
                    onChange={(e) => setElementQuery(e.target.value)}
                    placeholder="Enter element symbol (e.g. Fe, Na, Cu) or atomic number (1-118)"
                    className="flex-1 px-4 py-2 bg-slate-900 border border-slate-700 rounded-xl font-mono text-cyan-300 text-sm"
                  />
                </div>

                {(() => {
                  const data = getElectronConfiguration(elementQuery);
                  if (!data.element) {
                    return <div className="text-xs text-rose-400 font-mono">Element not found. Enter a valid symbol (e.g. Fe) or number (1-118).</div>;
                  }

                  const el = data.element;

                  return (
                    <div className="space-y-4">
                      {/* Element Overview Banner */}
                      <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 flex items-center justify-between">
                        <div>
                          <div className="text-sm font-bold text-slate-100 flex items-center gap-2">
                            <span className="px-2 py-0.5 bg-cyan-500/20 text-cyan-300 rounded font-mono font-bold">
                              #{el.atomicNumber}
                            </span>
                            {el.name} ({el.symbol})
                          </div>
                          <div className="text-xs text-slate-400 mt-0.5">
                            Standard Mass: <span className="font-mono text-slate-300">{el.mass} g/mol</span> | Group: <span className="text-amber-300">{el.group}</span> | Period: <span className="text-amber-300">{el.period}</span>
                          </div>
                        </div>
                        <button
                          onClick={() => handleApply(data.config)}
                          className="px-3 py-1.5 bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/30 font-bold text-xs rounded-lg"
                        >
                          Apply Config
                        </button>
                      </div>

                      {/* Full Electron Config */}
                      <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                        <div className="text-xs text-slate-400 mb-1">Electron Configuration:</div>
                        <div className="font-mono text-sm font-bold text-cyan-300 break-all">
                          {data.config}
                        </div>
                      </div>

                      {/* Visual Orbital Box Diagrams */}
                      <div className="space-y-2">
                        <div className="text-xs font-semibold text-slate-300">
                          Orbital Box Diagram (↑ = Spin Up, ↑↓ = Paired):
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                          {Object.entries(data.orbitals).map(([orb, boxes]) => (
                            <div key={orb} className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 flex flex-col items-center gap-1.5">
                              <span className="text-xs font-bold font-mono text-cyan-400">{orb}</span>
                              <div className="flex gap-1">
                                {boxes.map((spin, idx) => (
                                  <div
                                    key={idx}
                                    className="w-7 h-7 bg-slate-900 border border-slate-700 rounded flex items-center justify-center font-mono text-xs font-bold text-amber-300"
                                  >
                                    {spin || '·'}
                                  </div>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  );
                })()}
              </div>
            </div>
          )}

          {/* ================= 8. CONSTANTS & UNIT CONVERTER ================= */}
          {activeTab === 'constants' && (
            <div className="space-y-6">
              <div className="p-4 sm:p-5 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-3">
                <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider block">
                  Fundamental Chemical Constants
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono">
                  {[
                    { name: 'Universal Gas Constant (R)', val: '0.0820574', unit: 'L·atm/(mol·K)' },
                    { name: 'Universal Gas Constant (R)', val: '8.3144626', unit: 'J/(mol·K)' },
                    { name: 'Avogadro Constant (N_A)', val: '6.02214076e23', unit: 'mol⁻¹' },
                    { name: 'Faraday Constant (F)', val: '96485.33', unit: 'C/mol e⁻' },
                    { name: 'Boltzmann Constant (k_B)', val: '1.380649e-23', unit: 'J/K' },
                    { name: 'Standard Temperature & Pressure (STP)', val: '0°C (273.15 K), 1 atm', unit: '22.414 L/mol' },
                    { name: 'Planck Constant (h)', val: '6.62607e-34', unit: 'J·s' },
                    { name: 'Elementary Charge (e)', val: '1.60218e-19', unit: 'C' },
                  ].map((c, i) => (
                    <div key={i} className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
                      <div>
                        <div className="text-slate-300 font-sans font-medium text-xs">{c.name}</div>
                        <div className="text-cyan-300 font-mono text-xs">{c.val} <span className="text-slate-500">{c.unit}</span></div>
                      </div>
                      <button
                        onClick={() => handleApply(c.val.split(' ')[0])}
                        className="px-2.5 py-1 bg-cyan-500/20 text-cyan-300 rounded font-bold text-[11px] hover:bg-cyan-500/30"
                      >
                        Insert
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Chemical Unit Converter */}
              <div className="p-4 sm:p-5 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-3">
                <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider block">
                  Quick Pressure & Energy Units
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                  <div className="p-2.5 bg-slate-900 rounded-lg border border-slate-800">
                    <div className="text-slate-400">1 atm =</div>
                    <div className="font-mono text-cyan-300 font-bold">101.325 kPa</div>
                  </div>
                  <div className="p-2.5 bg-slate-900 rounded-lg border border-slate-800">
                    <div className="text-slate-400">1 atm =</div>
                    <div className="font-mono text-cyan-300 font-bold">760 mmHg (torr)</div>
                  </div>
                  <div className="p-2.5 bg-slate-900 rounded-lg border border-slate-800">
                    <div className="text-slate-400">1 atm =</div>
                    <div className="font-mono text-cyan-300 font-bold">1.01325 bar</div>
                  </div>
                  <div className="p-2.5 bg-slate-900 rounded-lg border border-slate-800">
                    <div className="text-slate-400">1 cal =</div>
                    <div className="font-mono text-cyan-300 font-bold">4.184 Joules</div>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
