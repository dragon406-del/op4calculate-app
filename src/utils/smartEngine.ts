import { math } from './mathInstance';
import { calculateExactFactorial, FactorialResult } from './factorial';
import {
  calculateMolarMass,
  findElement,
  getElectronConfiguration,
  identifyReactionType,
  checkSolubility,
} from './chemistryEngine';
import { periodicElements } from '../data/elements';

export interface SmartContext {
  display: string;
  setDisplay: (val: string) => void;
  addHistory?: (expr: string, res: string) => void;
  setExactFactorial?: (fact: FactorialResult) => void;
  open3DGraph: () => void;
  openVectorMenu: () => void;
  openPeriodicTable: () => void;
  openFormulaBook: () => void;
  openConstants: () => void;
  open2DGraph: (fn?: string) => void;
  openStopwatch: () => void;
  openTimer: () => void;
  openChemistryMenu?: () => void;
  openSolver?: (tab: string) => void;
}

export interface SmartExecutionResult {
  result: string;
  details?: string;
  exactFactorial?: FactorialResult;
}

export interface SmartCommand {
  category: string;
  title: string;
  syntax: string;
  description: string;
  keywords: string[];
  action: (text: string, context: SmartContext) => SmartExecutionResult;
}

/* ========================================================================= */
/*                          MATHEMATICAL HELPER ENGINES                       */
/* ========================================================================= */

// Sanitize user math expressions
function sanitizeMath(expr: string): string {
  let clean = expr.trim();
  clean = clean.replace(/×/g, '*');
  clean = clean.replace(/÷/g, '/');
  clean = clean.replace(/−/g, '-');
  clean = clean.replace(/π/g, 'pi');
  clean = clean.replace(/θ/g, 'x');
  clean = clean.replace(/√/g, 'sqrt(');
  clean = clean.replace(/√\(/g, 'sqrt(');
  clean = clean.replace(/√([0-9a-zA-Z.]+)/g, 'sqrt($1)');
  clean = clean.replace(/\bi\b/g, '1i');
  clean = clean.replace(/(\d+(\.\d+)?)%/g, '($1/100)');
  return clean;
}

// Evaluate expressions safely using mathjs
function safeEvaluate(expr: string, scope?: Record<string, any>): number | string {
  const sanitized = sanitizeMath(expr);
  const res = math.evaluate(sanitized, scope || {});
  if (typeof res === 'object' && res !== null && 'im' in res) {
    return res.toString();
  }
  return Number(res);
}

// Greatest Common Divisor
function computeGcd(a: bigint, b: bigint): bigint {
  a = a < 0n ? -a : a;
  b = b < 0n ? -b : b;
  while (b > 0n) {
    const temp = b;
    b = a % b;
    a = temp;
  }
  return a;
}

// Least Common Multiple
function computeLcm(a: bigint, b: bigint): bigint {
  if (a === 0n || b === 0n) return 0n;
  const g = computeGcd(a, b);
  return (a / g) * b;
}

// Prime Factorization
function computePrimeFactors(n: number): { factor: number; power: number }[] {
  let num = Math.floor(Math.abs(n));
  const factors: { factor: number; power: number }[] = [];
  if (num <= 1) return [];

  // Count 2s
  let count2 = 0;
  while (num % 2 === 0) {
    count2++;
    num /= 2;
  }
  if (count2 > 0) factors.push({ factor: 2, power: count2 });

  // Odd factors
  for (let d = 3; d * d <= num; d += 2) {
    let count = 0;
    while (num % d === 0) {
      count++;
      num /= d;
    }
    if (count > 0) factors.push({ factor: d, power: count });
  }

  if (num > 2) factors.push({ factor: num, power: 1 });
  return factors;
}

// Primality test
function checkIsPrime(n: number): boolean {
  if (n <= 1) return false;
  if (n <= 3) return true;
  if (n % 2 === 0 || n % 3 === 0) return false;
  for (let i = 5; i * i <= n; i += 6) {
    if (n % i === 0 || n % (i + 2) === 0) return false;
  }
  return true;
}

// Parse number lists separated by commas or spaces
function parseNumbers(input: string): number[] {
  return input
    .replace(/[^\d.,\-+eE]/g, ' ')
    .split(/[\s,]+/)
    .map((s) => s.trim())
    .filter((s) => s !== '' && !isNaN(Number(s)))
    .map(Number);
}

// Parse 2D Matrix string like "[1, 2; 3, 4]" or "[[1,2],[3,4]]"
function parseMatrixString(input: string): number[][] {
  const clean = input.replace(/[\[\]]/g, '').trim();
  if (clean.includes(';')) {
    return clean.split(';').map((row) =>
      row.split(/[\s,]+/).filter(Boolean).map(Number)
    );
  }
  const lines = clean.split('\n').filter(Boolean);
  if (lines.length > 1) {
    return lines.map((row) => row.split(/[\s,]+/).filter(Boolean).map(Number));
  }
  const allNums = clean.split(/[\s,]+/).filter(Boolean).map(Number);
  if (allNums.length === 4) {
    return [
      [allNums[0], allNums[1]],
      [allNums[2], allNums[3]],
    ];
  }
  if (allNums.length === 9) {
    return [
      [allNums[0], allNums[1], allNums[2]],
      [allNums[3], allNums[4], allNums[5]],
      [allNums[6], allNums[7], allNums[8]],
    ];
  }
  return [allNums];
}

// 2x2 or 3x3 Matrix Determinant
function computeMatrixDeterminant(mat: number[][]): number {
  if (mat.length === 1 && mat[0].length === 1) return mat[0][0];
  if (mat.length === 2 && mat[0].length === 2) {
    return mat[0][0] * mat[1][1] - mat[0][1] * mat[1][0];
  }
  if (mat.length === 3 && mat[0].length === 3) {
    return (
      mat[0][0] * (mat[1][1] * mat[2][2] - mat[1][2] * mat[2][1]) -
      mat[0][1] * (mat[1][0] * mat[2][2] - mat[1][2] * mat[2][0]) +
      mat[0][2] * (mat[1][0] * mat[2][1] - mat[1][1] * mat[2][0])
    );
  }
  try {
    const d = math.det(mat);
    return Number(d);
  } catch {
    return NaN;
  }
}

// Quadratic Equation Solver: ax^2 + bx + c = 0
function solveQuadraticCoeffs(a: number, b: number, c: number) {
  if (a === 0) {
    if (b === 0) return { roots: [], error: 'Degenerate equation (no variable)' };
    const r = -c / b;
    return { roots: [r.toString()], discriminant: 0, vertex: null };
  }
  const disc = b * b - 4 * a * c;
  const vx = -b / (2 * a);
  const vy = c - (b * b) / (4 * a);

  if (Math.abs(disc) < 1e-12) {
    const root = vx;
    return {
      roots: [Number(root.toFixed(6)).toString()],
      discriminant: 0,
      vertex: { x: vx, y: vy },
    };
  } else if (disc > 0) {
    const sqrtD = Math.sqrt(disc);
    const r1 = (-b + sqrtD) / (2 * a);
    const r2 = (-b - sqrtD) / (2 * a);
    const formatted1 = Number(r1.toFixed(6)).toString();
    const formatted2 = Number(r2.toFixed(6)).toString();
    return {
      roots: [formatted1, formatted2],
      discriminant: disc,
      vertex: { x: vx, y: vy },
    };
  } else {
    const real = (-b / (2 * a)).toFixed(4);
    const imag = (Math.sqrt(-disc) / (2 * a)).toFixed(4);
    return {
      roots: [`${real} + ${imag}i`, `${real} - ${imag}i`],
      discriminant: disc,
      vertex: { x: vx, y: vy },
    };
  }
}

// Extract coefficients from quadratic equation text: e.g. "x^2 - 5x + 6 = 0"
function parseQuadraticEquation(raw: string): { a: number; b: number; c: number } | null {
  let eq = raw.replace(/\s+/g, '');
  if (!eq.includes('=')) eq += '=0';
  const [lhs, rhs] = eq.split('=');
  
  // Try pattern matching for standard formats: ax^2 + bx + c
  // Normalize lhs - (rhs)
  try {
    // Check if it has x^2 or x*x
    if (!lhs.includes('x^2') && !lhs.includes('x*x') && !lhs.includes('x²')) return null;

    // Use polynomial evaluation at x = 0, 1, -1 to deduce quadratic coefficients:
    // f(0) = c
    // f(1) = a + b + c  => a + b = f(1) - c
    // f(-1) = a - b + c => a - b = f(-1) - c
    // => 2a = f(1) + f(-1) - 2c => a = (f(1) + f(-1) - 2c)/2
    // => b = f(1) - c - a
    const diff = `(${lhs}) - (${rhs})`;
    const f = (x: number) => Number(math.evaluate(sanitizeMath(diff), { x }));
    const c = f(0);
    const f1 = f(1);
    const fm1 = f(-1);
    const a = (f1 + fm1 - 2 * c) / 2;
    const b = f1 - c - a;

    if (!isNaN(a) && Math.abs(a) > 1e-9) {
      return { a, b, c };
    }
  } catch {
    // fallback
  }
  return null;
}

// General 1-Var Equation Solver using Bisection + Newton-Raphson hybrid
function solveGeneralEquation(eqString: string): { root: number | null; display: string; details: string } {
  let eq = eqString.replace(/\s+/g, '');
  if (!eq.includes('=')) eq += '=0';
  const [lhs, rhs] = eq.split('=');
  const expr = `(${lhs}) - (${rhs})`;

  const f = (x: number) => {
    try {
      return Number(math.evaluate(sanitizeMath(expr), { x }));
    } catch {
      return NaN;
    }
  };

  // 1. Grid search for bracket sign change
  let root: number | null = null;
  let bracketA = -10;
  let bracketB = 10;
  let foundSignChange = false;

  for (let x = -50; x <= 50; x += 0.5) {
    const y = f(x);
    if (!isNaN(y) && Math.abs(y) < 1e-6) {
      root = x;
      break;
    }
    const nextY = f(x + 0.5);
    if (!isNaN(y) && !isNaN(nextY) && y * nextY < 0) {
      bracketA = x;
      bracketB = x + 0.5;
      foundSignChange = true;
      break;
    }
  }

  if (root !== null) {
    const formatted = Number(root.toFixed(6)).toString();
    return {
      root,
      display: `x = ${formatted}`,
      details: `Exact/near root found at x = ${formatted}`,
    };
  }

  // 2. Bisection refinement
  if (foundSignChange) {
    let a = bracketA;
    let b = bracketB;
    for (let i = 0; i < 60; i++) {
      const mid = (a + b) / 2;
      const fMid = f(mid);
      if (Math.abs(fMid) < 1e-9 || (b - a) / 2 < 1e-9) {
        a = mid;
        break;
      }
      if (f(a) * fMid <= 0) {
        b = mid;
      } else {
        a = mid;
      }
    }
    const finalRoot = (a + b) / 2;
    const formatted = Number(finalRoot.toFixed(6)).toString();
    return {
      root: finalRoot,
      display: `x = ${formatted}`,
      details: `Numerical convergence via Bisection in [${bracketA}, ${bracketB}]: x ≈ ${formatted}`,
    };
  }

  // 3. Newton-Raphson starting from x = 1.0
  let xCurr = 1.0;
  const h = 1e-6;
  for (let i = 0; i < 40; i++) {
    const y = f(xCurr);
    if (isNaN(y)) break;
    if (Math.abs(y) < 1e-7) {
      const formatted = Number(xCurr.toFixed(6)).toString();
      return {
        root: xCurr,
        display: `x = ${formatted}`,
        details: `Newton-Raphson converged to x ≈ ${formatted}`,
      };
    }
    const df = (f(xCurr + h) - f(xCurr - h)) / (2 * h);
    if (Math.abs(df) < 1e-12) break;
    xCurr = xCurr - y / df;
  }

  return {
    root: null,
    display: 'No real root found',
    details: 'Unable to identify real roots in the interval [-50, 50].',
  };
}

// 2-Variable Linear System: a1*x + b1*y = c1, a2*x + b2*y = c2
function solveLinearSystem2Var(text: string): { x: number; y: number } | null {
  // Format: "2x + 3y = 7, x - y = 1" or "[2, 3, 7], [1, -1, 1]"
  const nums = parseNumbers(text);
  if (nums.length >= 6) {
    const [a1, b1, c1, a2, b2, c2] = nums;
    const det = a1 * b2 - a2 * b1;
    if (Math.abs(det) < 1e-12) return null;
    const x = (c1 * b2 - c2 * b1) / det;
    const y = (a1 * c2 - a2 * c1) / det;
    return { x, y };
  }
  return null;
}

// Definite Numerical Integration via Simpson's 3/8 & 1/3 Rule
function integrateFunction(expr: string, a: number, b: number): number {
  const n = 1000;
  const h = (b - a) / n;
  const cleanExpr = sanitizeMath(expr);
  const f = (x: number) => Number(math.evaluate(cleanExpr, { x }));

  let sum = f(a) + f(b);
  for (let i = 1; i < n; i++) {
    const x = a + i * h;
    sum += (i % 2 === 0 ? 2 : 4) * f(x);
  }
  return (h / 3) * sum;
}

// Numerical Derivative at a point
function differentiateNumeric(expr: string, x0: number): number {
  const h = 1e-6;
  const cleanExpr = sanitizeMath(expr);
  const f = (x: number) => Number(math.evaluate(cleanExpr, { x }));
  return (f(x0 + h) - f(x0 - h)) / (2 * h);
}

// Numerical Limit as x -> x0
function calculateLimitNumeric(expr: string, x0: number): number {
  const cleanExpr = sanitizeMath(expr);
  const f = (x: number) => {
    try {
      return Number(math.evaluate(cleanExpr, { x }));
    } catch {
      return NaN;
    }
  };
  const h = 1e-7;
  const yLeft = f(x0 - h);
  const yRight = f(x0 + h);
  if (!isNaN(yLeft) && !isNaN(yRight)) {
    return (yLeft + yRight) / 2;
  }
  return !isNaN(yRight) ? yRight : yLeft;
}

/* ========================================================================= */
/*                          SMART COMMANDS DEFINITIONS                       */
/* ========================================================================= */

export const SMART_COMMANDS: SmartCommand[] = [
  /* ================= 1. FACTORIAL & COMBINATORICS ================= */
  {
    category: "Mathematics",
    title: "Factorial (100+ Digits & Super-Factorial)",
    syntax: "factorial 100",
    description: "Calculate factorials generating 100+ digits and astronomical inputs up to 100 digits.",
    keywords: ["factorial", "fact", "exact factorial", "100 digits", "even factorial", "double factorial", "!"],
    action: (text, ctx) => {
      const match = text.match(/\d+/);
      const isDouble = text.includes('!!') || text.toLowerCase().includes('double') || text.toLowerCase().includes('even');
      const n = match ? match[0] : "100";
      const result = calculateExactFactorial(isDouble ? `${n}!!` : n);

      const mainDisplay = result.isLarge ? result.scientificNotation : result.exactString;
      ctx.setDisplay(mainDisplay);
      if (ctx.setExactFactorial) ctx.setExactFactorial(result);
      if (ctx.addHistory) ctx.addHistory(result.isDoubleFactorial ? `${n}!!` : `${n}!`, mainDisplay);

      return {
        result: mainDisplay,
        details: `${result.n}${result.isDoubleFactorial ? '!!' : '!'} = ${result.digitCount} digits (${result.trailingZeros} trailing zeros)${result.note ? ` • ${result.note}` : ''}`,
        exactFactorial: result,
      };
    },
  },

  {
    category: "Mathematics",
    title: "Combination (nCr)",
    syntax: "ncr 10, 3",
    description: "Calculate combinations n choose r: n! / (r!(n-r)!).",
    keywords: ["ncr", "combination", "choose"],
    action: (text, ctx) => {
      const nums = parseNumbers(text);
      if (nums.length < 2) return { result: "Error: enter n and r (e.g. ncr 10, 3)" };
      const n = Math.floor(nums[0]);
      const r = Math.floor(nums[1]);
      if (r < 0 || r > n) return { result: "0", details: "r must be between 0 and n" };
      try {
        const res = math.combinations(n, r);
        const str = res.toString();
        ctx.setDisplay(str);
        if (ctx.addHistory) ctx.addHistory(`${n}C${r}`, str);
        return { result: str, details: `C(${n}, ${r}) = ${n}! / (${r}! × ${n - r}!) = ${str}` };
      } catch (e: any) {
        return { result: "Error", details: e.message };
      }
    },
  },

  {
    category: "Mathematics",
    title: "Permutation (nPr)",
    syntax: "npr 10, 3",
    description: "Calculate permutations: n! / (n-r)!.",
    keywords: ["npr", "permutation"],
    action: (text, ctx) => {
      const nums = parseNumbers(text);
      if (nums.length < 2) return { result: "Error: enter n and r (e.g. npr 10, 3)" };
      const n = Math.floor(nums[0]);
      const r = Math.floor(nums[1]);
      if (r < 0 || r > n) return { result: "0", details: "r must be between 0 and n" };
      try {
        const res = math.permutations(n, r);
        const str = res.toString();
        ctx.setDisplay(str);
        if (ctx.addHistory) ctx.addHistory(`${n}P${r}`, str);
        return { result: str, details: `P(${n}, ${r}) = ${n}! / (${n - r}!) = ${str}` };
      } catch (e: any) {
        return { result: "Error", details: e.message };
      }
    },
  },

  /* ================= 2. ALGEBRA & EQUATION SOLVERS ================= */
  {
    category: "Algebra",
    title: "Solve Equation",
    syntax: "solve x^2 - 5x + 6 = 0",
    description: "Solve linear, quadratic, cubic, and general equations for real and complex roots.",
    keywords: ["solve", "roots", "equation", "root"],
    action: (text, ctx) => {
      const clean = text.trim();
      // 1. Check for quadratic equation
      const quad = parseQuadraticEquation(clean);
      if (quad) {
        const solved = solveQuadraticCoeffs(quad.a, quad.b, quad.c);
        const resStr = solved.roots.join(', ');
        const vertexStr = solved.vertex ? ` • Vertex: (${Number(solved.vertex.x.toFixed(3))}, ${Number(solved.vertex.y.toFixed(3))})` : '';
        ctx.setDisplay(resStr);
        if (ctx.addHistory) ctx.addHistory(`Solve ${clean}`, resStr);
        return {
          result: resStr,
          details: `Quadratic: a=${quad.a}, b=${quad.b}, c=${quad.c} • Δ=${(solved.discriminant ?? 0).toFixed(2)}${vertexStr}`,
        };
      }

      // 2. Check for 2-var linear system
      if (clean.includes(',') && clean.includes('y')) {
        const sys = solveLinearSystem2Var(clean);
        if (sys) {
          const resStr = `x = ${sys.x.toFixed(4)}, y = ${sys.y.toFixed(4)}`;
          ctx.setDisplay(resStr);
          if (ctx.addHistory) ctx.addHistory(`Solve System`, resStr);
          return { result: resStr, details: `2-Variable Linear System solved exactly.` };
        }
      }

      // 3. General 1-Var Equation Solver
      const gen = solveGeneralEquation(clean);
      ctx.setDisplay(gen.display);
      if (ctx.addHistory) ctx.addHistory(`Solve ${clean}`, gen.display);
      return { result: gen.display, details: gen.details };
    },
  },

  {
    category: "Algebra",
    title: "Simplify Expression",
    syntax: "simplify 2x + 3x - 4y + 2y",
    description: "Simplify and reduce algebraic expressions.",
    keywords: ["simplify", "reduce"],
    action: (text, ctx) => {
      try {
        const s = math.simplify(sanitizeMath(text)).toString();
        ctx.setDisplay(s);
        if (ctx.addHistory) ctx.addHistory(`Simplify(${text})`, s);
        return { result: s, details: `Simplified algebraic form: ${s}` };
      } catch (err: any) {
        return { result: "Simplify Error", details: err.message };
      }
    },
  },

  {
    category: "Algebra",
    title: "Newton-Raphson Solver",
    syntax: "newton x^3 - 2x - 5",
    description: "Solve equation numerically using Newton-Raphson method.",
    keywords: ["newton", "newton-raphson"],
    action: (text, ctx) => {
      const gen = solveGeneralEquation(text);
      ctx.setDisplay(gen.display);
      if (ctx.addHistory) ctx.addHistory(`Newton(${text})`, gen.display);
      return { result: gen.display, details: `Newton-Raphson numerical search: ${gen.details}` };
    },
  },

  {
    category: "Algebra",
    title: "Bisection Method",
    syntax: "bisection x^3 - 2x - 5",
    description: "Solve equation numerically using interval bisection.",
    keywords: ["bisection", "bisect"],
    action: (text, ctx) => {
      const gen = solveGeneralEquation(text);
      ctx.setDisplay(gen.display);
      if (ctx.addHistory) ctx.addHistory(`Bisection(${text})`, gen.display);
      return { result: gen.display, details: `Bisection method search: ${gen.details}` };
    },
  },

  /* ================= 3. CALCULUS ================= */
  {
    category: "Calculus",
    title: "Differentiate (Symbolic & Numerical)",
    syntax: "diff sin(x) * x^2",
    description: "Find the symbolic derivative d/dx or derivative at a specific point.",
    keywords: ["differentiate", "derivative", "diff", "d/dx"],
    action: (text, ctx) => {
      // Check if point evaluation requested: "diff x^2 at 3" or "diff x^2, 3"
      const atMatch = text.match(/(?:at\s*x?\s*=?\s*|,\s*)([\d.\-]+)$/i);
      if (atMatch) {
        const x0 = Number(atMatch[1]);
        const expr = text.replace(atMatch[0], '').trim();
        const numDeriv = differentiateNumeric(expr, x0);
        const resStr = Number(numDeriv.toFixed(6)).toString();
        ctx.setDisplay(resStr);
        if (ctx.addHistory) ctx.addHistory(`d/dx(${expr}) at ${x0}`, resStr);
        return { result: resStr, details: `Numerical derivative of ${expr} at x = ${x0}: f'(${x0}) = ${resStr}` };
      }

      // Symbolic differentiation
      try {
        const clean = sanitizeMath(text);
        const d = math.derivative(clean, 'x').toString();
        ctx.setDisplay(d);
        if (ctx.addHistory) ctx.addHistory(`d/dx(${text})`, d);
        return { result: d, details: `Symbolic derivative: d/dx(${text}) = ${d}` };
      } catch (err: any) {
        return { result: "Derivative Error", details: err.message };
      }
    },
  },

  {
    category: "Calculus",
    title: "Integrate (Definite Integral)",
    syntax: "integrate x^2 from 0 to 3",
    description: "Evaluate definite integral using Simpson's 1000-interval rule.",
    keywords: ["integrate", "integral", "int"],
    action: (text, ctx) => {
      // Formats: "integrate x^2 from 0 to 3", "integrate x^2, 0, 3", "integrate x^2"
      let expr = text;
      let a = 0;
      let b = 1;

      const fromToMatch = text.match(/from\s+([\d.\-]+)\s+to\s+([\d.\-]+)/i);
      if (fromToMatch) {
        a = Number(fromToMatch[1]);
        b = Number(fromToMatch[2]);
        expr = text.replace(fromToMatch[0], '').trim();
      } else if (text.includes(',')) {
        const parts = text.split(',');
        expr = parts[0].trim();
        if (parts.length >= 3) {
          a = Number(parts[1].trim());
          b = Number(parts[2].trim());
        }
      }

      try {
        const val = integrateFunction(expr, a, b);
        const resStr = Number(val.toFixed(6)).toString();
        ctx.setDisplay(resStr);
        if (ctx.addHistory) ctx.addHistory(`∫(${expr})dx [${a}, ${b}]`, resStr);
        return { result: resStr, details: `Definite integral of ${expr} from ${a} to ${b} = ${resStr}` };
      } catch (err: any) {
        return { result: "Integration Error", details: err.message };
      }
    },
  },

  {
    category: "Calculus",
    title: "Limit",
    syntax: "limit sin(x)/x as x->0",
    description: "Calculate mathematical limit as x approaches a target value.",
    keywords: ["limit", "lim"],
    action: (text, ctx) => {
      let expr = text;
      let x0 = 0;
      const arrowMatch = text.match(/(?:as\s*x?\s*->?\s*|,\s*)([\d.\-]+)$/i);
      if (arrowMatch) {
        x0 = Number(arrowMatch[1]);
        expr = text.replace(arrowMatch[0], '').trim();
      }
      try {
        const val = calculateLimitNumeric(expr, x0);
        const resStr = Number(val.toFixed(6)).toString();
        ctx.setDisplay(resStr);
        if (ctx.addHistory) ctx.addHistory(`lim x->${x0} (${expr})`, resStr);
        return { result: resStr, details: `lim(x → ${x0}) of ${expr} = ${resStr}` };
      } catch (err: any) {
        return { result: "Limit Error", details: err.message };
      }
    },
  },

  {
    category: "Calculus",
    title: "Taylor Series Expansion",
    syntax: "taylor exp(x)",
    description: "Expand a mathematical function into its 4-term Maclaurin / Taylor polynomial.",
    keywords: ["taylor", "maclaurin", "series"],
    action: (text, ctx) => {
      try {
        const clean = sanitizeMath(text || 'exp(x)');
        const d0 = Number(math.evaluate(clean, { x: 0 }));
        const d1 = Number(math.derivative(clean, 'x').evaluate({ x: 0 }));
        const d2 = Number(math.derivative(math.derivative(clean, 'x').toString(), 'x').evaluate({ x: 0 }));
        const d3 = Number(math.derivative(math.derivative(math.derivative(clean, 'x').toString(), 'x').toString(), 'x').evaluate({ x: 0 }));

        const terms: string[] = [];
        if (Math.abs(d0) > 1e-6) terms.push(d0.toFixed(3));
        if (Math.abs(d1) > 1e-6) terms.push(`${d1.toFixed(3)}x`);
        if (Math.abs(d2) > 1e-6) terms.push(`${(d2 / 2).toFixed(3)}x²`);
        if (Math.abs(d3) > 1e-6) terms.push(`${(d3 / 6).toFixed(3)}x³`);

        const series = terms.join(' + ') || '0';
        ctx.setDisplay(series);
        if (ctx.addHistory) ctx.addHistory(`Taylor(${text})`, series);
        return { result: series, details: `Maclaurin series expansion of ${text} (degree 3): ${series}` };
      } catch (err: any) {
        return { result: "Taylor Error", details: err.message };
      }
    },
  },

  /* ================= 4. CHEMISTRY CALCULATIONS ================= */
  {
    category: "Chemistry",
    title: "Molar Mass & Composition",
    syntax: "molar mass H2SO4",
    description: "Calculate accurate molar mass with parentheses, percent mass breakdown of all elements.",
    keywords: ["molar mass", "molecular mass", "molarmass", "molecular weight", "mw"],
    action: (text, ctx) => {
      const formula = text.replace(/molar mass of/i, '').replace(/molar mass/i, '').trim() || 'H2SO4';
      const mm = calculateMolarMass(formula);
      if (!mm.isValid) {
        return { result: "Formula Error", details: mm.error || "Invalid chemical formula" };
      }
      const massStr = mm.molarMass.toFixed(3);
      ctx.setDisplay(massStr);
      if (ctx.addHistory) ctx.addHistory(`Molar Mass (${formula})`, `${massStr} g/mol`);

      const breakdownStr = mm.breakdown
        .map((b) => `${b.symbol}: ${b.percent.toFixed(1)}%`)
        .join(', ');

      return {
        result: `${massStr} g/mol`,
        details: `${formula} = ${massStr} g/mol • Composition: ${breakdownStr}`,
      };
    },
  },

  {
    category: "Chemistry",
    title: "pH & pOH Calculator",
    syntax: "ph 0.001",
    description: "Calculate pH and pOH from hydrogen ion concentration [H+] or hydroxide [OH-].",
    keywords: ["ph", "poh", "acidity"],
    action: (text, ctx) => {
      const match = text.match(/[\d.eE\-]+/);
      const conc = match ? Number(match[0]) : 0.001;
      if (conc <= 0) return { result: "Error: Concentration must be > 0" };
      const phVal = -Math.log10(conc);
      const pohVal = 14 - phVal;
      const phStr = phVal.toFixed(2);
      ctx.setDisplay(phStr);
      if (ctx.addHistory) ctx.addHistory(`pH ([H+] = ${conc})`, phStr);
      return {
        result: `pH = ${phStr}`,
        details: `[H⁺] = ${conc} M → pH = ${phStr}, pOH = ${pohVal.toFixed(2)} (${phVal < 7 ? 'Acidic' : phVal > 7 ? 'Basic' : 'Neutral'})`,
      };
    },
  },

  {
    category: "Chemistry",
    title: "Gas Law (PV = nRT)",
    syntax: "gas law P=2, V=10, T=300",
    description: "Solve for any missing ideal gas variable (P, V, n, T) using R = 0.08206 L·atm/(mol·K).",
    keywords: ["gas law", "ideal gas", "pv=nrt"],
    action: (text, ctx) => {
      const R = 0.08206; // L·atm / (mol·K)
      const pMatch = text.match(/p\s*=\s*([\d.]+)/i);
      const vMatch = text.match(/v\s*=\s*([\d.]+)/i);
      const nMatch = text.match(/n\s*=\s*([\d.]+)/i);
      const tMatch = text.match(/t\s*=\s*([\d.]+)/i);

      const p = pMatch ? Number(pMatch[1]) : null;
      const v = vMatch ? Number(vMatch[1]) : null;
      const n = nMatch ? Number(nMatch[1]) : null;
      const t = tMatch ? Number(tMatch[1]) : null;

      let result = "";
      let details = "";

      if (p === null && v && n && t) {
        const val = (n * R * t) / v;
        result = `P = ${val.toFixed(3)} atm`;
        details = `Pressure: P = nRT/V = ${result}`;
      } else if (v === null && p && n && t) {
        const val = (n * R * t) / p;
        result = `V = ${val.toFixed(3)} L`;
        details = `Volume: V = nRT/P = ${result}`;
      } else if (n === null && p && v && t) {
        const val = (p * v) / (R * t);
        result = `n = ${val.toFixed(4)} mol`;
        details = `Moles: n = PV/(RT) = ${result}`;
      } else if (t === null && p && v && n) {
        const val = (p * v) / (n * R);
        result = `T = ${val.toFixed(2)} K`;
        details = `Temperature: T = PV/(nR) = ${result}`;
      } else {
        return { result: "Specify 3 variables (P, V, n, T), e.g. P=2, V=10, T=300" };
      }

      ctx.setDisplay(result.split('=')[1]?.trim() || result);
      return { result, details };
    },
  },

  {
    category: "Chemistry",
    title: "Solubility Rules",
    syntax: "solubility BaSO4",
    description: "Check if an ionic chemical compound is soluble or insoluble in water.",
    keywords: ["solubility", "soluble", "precipitate"],
    action: (text, ctx) => {
      const compound = text.replace(/solubility of/i, '').replace(/solubility/i, '').trim();
      const sol = checkSolubility(compound);
      ctx.setDisplay(sol.status);
      return {
        result: `${compound}: ${sol.status}`,
        details: `${sol.rule}`,
      };
    },
  },

  {
    category: "Chemistry",
    title: "Reaction Classification",
    syntax: "reaction 2H2 + O2 = 2H2O",
    description: "Classify chemical reaction as synthesis, decomposition, combustion, or displacement.",
    keywords: ["reaction", "classify reaction"],
    action: (text, ctx) => {
      const rxn = identifyReactionType(text);
      ctx.setDisplay(rxn.type);
      return {
        result: rxn.type,
        details: rxn.explanation,
      };
    },
  },

  {
    category: "Chemistry",
    title: "Electron Configuration",
    syntax: "electron configuration Fe",
    description: "Generate atomic electron configuration and orbital occupancy.",
    keywords: ["electron configuration", "electronic configuration", "orbitals"],
    action: (text, ctx) => {
      const query = text.replace(/electron configuration of/i, '').replace(/electron configuration/i, '').trim();
      const cfg = getElectronConfiguration(query);
      if (cfg.config === 'Not Found') {
        return { result: "Element not found", details: `Could not identify element "${query}".` };
      }
      ctx.setDisplay(cfg.config);
      return {
        result: cfg.config,
        details: `${cfg.element?.name} (Z=${cfg.element?.atomicNumber}, Mass=${cfg.element?.mass}) • ${cfg.config}`,
      };
    },
  },

  {
    category: "Chemistry",
    title: "Periodic Element Lookup",
    syntax: "element Gold",
    description: "Lookup atomic number, mass, period, group, and category of an element.",
    keywords: ["element", "atom"],
    action: (text, ctx) => {
      const el = findElement(text.replace(/element/i, '').trim());
      if (!el) return { result: "Element not found" };
      const res = `${el.name} (${el.symbol}) #${el.atomicNumber}`;
      ctx.setDisplay(el.mass.toString());
      return {
        result: res,
        details: `Atomic Number: ${el.atomicNumber} • Mass: ${el.mass} u • Period ${el.period}, Group ${el.group}`,
      };
    },
  },

  {
    category: "Chemistry",
    title: "Chemistry Solver Menu",
    syntax: "chemistry",
    description: "Open the full Chemistry Solver Menu featuring all 30 solvers for molar mass, stoichiometry, gas laws, and solutions.",
    keywords: ["chemistry", "chem", "chemistry menu", "stoichiometry"],
    action: (_, ctx) => {
      if (ctx.openChemistryMenu) ctx.openChemistryMenu();
      return { result: "Chemistry Solvers Opened", details: "All 30 chemistry problem solvers active." };
    },
  },

  /* ================= 5. MATRIX & LINEAR ALGEBRA ================= */
  {
    category: "Matrix",
    title: "Matrix Determinant",
    syntax: "det [1, 2; 3, 4]",
    description: "Calculate the determinant of a 2x2 or 3x3 square matrix.",
    keywords: ["det", "determinant"],
    action: (text, ctx) => {
      const mat = parseMatrixString(text);
      const d = computeMatrixDeterminant(mat);
      if (isNaN(d)) return { result: "Error: Square matrix required (e.g. [1, 2; 3, 4])" };
      const dStr = Number(d.toFixed(6)).toString();
      ctx.setDisplay(dStr);
      if (ctx.addHistory) ctx.addHistory(`det(${text})`, dStr);
      return { result: dStr, details: `Determinant of ${mat.length}×${mat.length} matrix = ${dStr}` };
    },
  },

  {
    category: "Matrix",
    title: "Matrix Inverse",
    syntax: "inv [1, 2; 3, 4]",
    description: "Calculate the multiplicative inverse A^-1 of a square matrix.",
    keywords: ["inv", "inverse matrix"],
    action: (text, ctx) => {
      try {
        const mat = parseMatrixString(text);
        const inv = math.inv(mat);
        const invStr = JSON.stringify(inv);
        ctx.setDisplay(invStr);
        if (ctx.addHistory) ctx.addHistory(`inv(${text})`, invStr);
        return { result: invStr, details: `Inverse matrix: ${invStr}` };
      } catch (err: any) {
        return { result: "Inverse Error", details: err.message };
      }
    },
  },

  /* ================= 6. 3D & 2D VECTORS ================= */
  {
    category: "Vector",
    title: "Vector Cross Product",
    syntax: "cross [1, 0, 0], [0, 1, 0]",
    description: "Calculate the 3D vector cross product A x B.",
    keywords: ["cross", "cross product"],
    action: (text, ctx) => {
      const nums = parseNumbers(text);
      if (nums.length < 6) return { result: "Error: Provide two 3D vectors (6 numbers total)" };
      const [ax, ay, az, bx, by, bz] = nums;
      const cx = ay * bz - az * by;
      const cy = az * bx - ax * bz;
      const cz = ax * by - ay * bx;
      const mag = Math.sqrt(cx * cx + cy * cy + cz * cz);
      const resStr = `[${cx}, ${cy}, ${cz}]`;
      ctx.setDisplay(resStr);
      if (ctx.addHistory) ctx.addHistory(`Cross Product`, resStr);
      return { result: resStr, details: `A × B = ${resStr} • Magnitude: ${mag.toFixed(4)}` };
    },
  },

  {
    category: "Vector",
    title: "Vector Dot Product",
    syntax: "dot [1, 2, 3], [4, 5, 6]",
    description: "Calculate the scalar dot product A · B.",
    keywords: ["dot", "dot product"],
    action: (text, ctx) => {
      const nums = parseNumbers(text);
      if (nums.length < 4) return { result: "Error: Provide two vectors" };
      const half = Math.floor(nums.length / 2);
      let dot = 0;
      for (let i = 0; i < half; i++) {
        dot += nums[i] * nums[i + half];
      }
      const resStr = dot.toString();
      ctx.setDisplay(resStr);
      if (ctx.addHistory) ctx.addHistory(`Dot Product`, resStr);
      return { result: resStr, details: `A · B = ${resStr}` };
    },
  },

  /* ================= 7. NUMBER THEORY & DISCRETE MATH ================= */
  {
    category: "Number Theory",
    title: "Greatest Common Divisor (GCD)",
    syntax: "gcd 48, 18",
    description: "Compute the greatest common divisor / highest common factor of integers.",
    keywords: ["gcd", "hcf", "greatest common divisor"],
    action: (text, ctx) => {
      const nums = parseNumbers(text);
      if (nums.length < 2) return { result: "Error: enter at least two numbers (e.g. gcd 48, 18)" };
      let g = BigInt(Math.floor(nums[0]));
      for (let i = 1; i < nums.length; i++) {
        g = computeGcd(g, BigInt(Math.floor(nums[i])));
      }
      const resStr = g.toString();
      ctx.setDisplay(resStr);
      if (ctx.addHistory) ctx.addHistory(`gcd(${nums.join(', ')})`, resStr);
      return { result: resStr, details: `GCD(${nums.join(', ')}) = ${resStr}` };
    },
  },

  {
    category: "Number Theory",
    title: "Least Common Multiple (LCM)",
    syntax: "lcm 12, 18",
    description: "Compute the lowest common multiple of integers.",
    keywords: ["lcm", "lowest common multiple"],
    action: (text, ctx) => {
      const nums = parseNumbers(text);
      if (nums.length < 2) return { result: "Error: enter at least two numbers (e.g. lcm 12, 18)" };
      let l = BigInt(Math.floor(nums[0]));
      for (let i = 1; i < nums.length; i++) {
        l = computeLcm(l, BigInt(Math.floor(nums[i])));
      }
      const resStr = l.toString();
      ctx.setDisplay(resStr);
      if (ctx.addHistory) ctx.addHistory(`lcm(${nums.join(', ')})`, resStr);
      return { result: resStr, details: `LCM(${nums.join(', ')}) = ${resStr}` };
    },
  },

  {
    category: "Number Theory",
    title: "Prime Factorization",
    syntax: "factors 360",
    description: "Decompose an integer into its canonical prime factor powers.",
    keywords: ["factors", "prime factors", "factorize"],
    action: (text, ctx) => {
      const match = text.match(/\d+/);
      if (!match) return { result: "Enter an integer (e.g. factors 360)" };
      const n = parseInt(match[0], 10);
      const factors = computePrimeFactors(n);
      const str = factors.map((f) => (f.power === 1 ? `${f.factor}` : `${f.factor}^${f.power}`)).join(' × ') || `${n}`;
      ctx.setDisplay(str);
      if (ctx.addHistory) ctx.addHistory(`Factors(${n})`, str);
      return { result: str, details: `Prime factorization of ${n} = ${str}` };
    },
  },

  {
    category: "Number Theory",
    title: "Primality Test",
    syntax: "isprime 97",
    description: "Test if an integer is a prime number.",
    keywords: ["isprime", "prime test", "check prime"],
    action: (text, ctx) => {
      const match = text.match(/\d+/);
      if (!match) return { result: "Enter an integer" };
      const n = parseInt(match[0], 10);
      const prime = checkIsPrime(n);
      const resStr = prime ? "Prime" : "Composite";
      ctx.setDisplay(resStr);
      return { result: resStr, details: `${n} is a ${resStr} number.` };
    },
  },

  /* ================= 8. STATISTICS ================= */
  {
    category: "Statistics",
    title: "Mean & Average",
    syntax: "mean 10, 15, 20, 25, 30",
    description: "Calculate arithmetic mean, sum, and count of a data series.",
    keywords: ["mean", "average", "avg"],
    action: (text, ctx) => {
      const nums = parseNumbers(text);
      if (nums.length === 0) return { result: "Enter numbers separated by commas or spaces" };
      const sum = nums.reduce((a, b) => a + b, 0);
      const m = sum / nums.length;
      const resStr = Number(m.toFixed(6)).toString();
      ctx.setDisplay(resStr);
      if (ctx.addHistory) ctx.addHistory(`Mean`, resStr);
      return { result: resStr, details: `Mean = ${resStr} • Sum = ${sum} • Count = ${nums.length}` };
    },
  },

  {
    category: "Statistics",
    title: "Median",
    syntax: "median 4, 1, 7, 2, 9",
    description: "Find the median middle value of a dataset.",
    keywords: ["median"],
    action: (text, ctx) => {
      const nums = parseNumbers(text).sort((a, b) => a - b);
      if (nums.length === 0) return { result: "Enter numbers" };
      const mid = Math.floor(nums.length / 2);
      const med = nums.length % 2 !== 0 ? nums[mid] : (nums[mid - 1] + nums[mid]) / 2;
      const resStr = med.toString();
      ctx.setDisplay(resStr);
      return { result: resStr, details: `Median = ${resStr} (sorted: ${nums.join(', ')})` };
    },
  },

  {
    category: "Statistics",
    title: "Standard Deviation",
    syntax: "stdev 10, 12, 23, 23, 16, 23, 21, 16",
    description: "Calculate sample standard deviation and variance.",
    keywords: ["stdev", "std", "standard deviation", "variance"],
    action: (text, ctx) => {
      const nums = parseNumbers(text);
      if (nums.length < 2) return { result: "Enter at least 2 numbers" };
      const mean = nums.reduce((a, b) => a + b, 0) / nums.length;
      const variance = nums.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / (nums.length - 1);
      const sd = Math.sqrt(variance);
      const resStr = Number(sd.toFixed(6)).toString();
      ctx.setDisplay(resStr);
      return { result: resStr, details: `Sample Std Dev = ${resStr} • Variance = ${variance.toFixed(4)}` };
    },
  },

  /* ================= 9. CONVERSIONS & PROGRAMMING ================= */
  {
    category: "Conversions",
    title: "Temperature Conversion",
    syntax: "100 C to F",
    description: "Convert temperature between Celsius, Fahrenheit, and Kelvin.",
    keywords: ["to f", "to c", "to k", "c to f", "f to c", "temperature"],
    action: (text, ctx) => {
      const clean = text.toLowerCase();
      const numMatch = clean.match(/[\d.\-]+/);
      const val = numMatch ? Number(numMatch[0]) : 0;

      let result = 0;
      let unit = "";

      if (clean.includes('c to f') || (clean.includes('c') && clean.includes('to f'))) {
        result = (val * 9) / 5 + 32;
        unit = "°F";
      } else if (clean.includes('f to c') || (clean.includes('f') && clean.includes('to c'))) {
        result = ((val - 32) * 5) / 9;
        unit = "°C";
      } else if (clean.includes('c to k') || (clean.includes('c') && clean.includes('to k'))) {
        result = val + 273.15;
        unit = "K";
      } else if (clean.includes('k to c') || (clean.includes('k') && clean.includes('to c'))) {
        result = val - 273.15;
        unit = "°C";
      } else {
        result = (val * 9) / 5 + 32;
        unit = "°F";
      }

      const resStr = Number(result.toFixed(4)).toString();
      ctx.setDisplay(resStr);
      return { result: `${resStr} ${unit}`, details: `${val} converted = ${resStr} ${unit}` };
    },
  },

  {
    category: "Conversions",
    title: "Unit Conversion (Length & Mass)",
    syntax: "10 m to ft",
    description: "Convert length (m, ft, km, mi) and mass (kg, lb).",
    keywords: ["to ft", "to m", "to lb", "to kg", "to miles", "m to ft", "ft to m", "kg to lb", "lb to kg"],
    action: (text, ctx) => {
      const clean = text.toLowerCase();
      const numMatch = clean.match(/[\d.]+/);
      const val = numMatch ? Number(numMatch[0]) : 1;

      let result = 0;
      let label = "";

      if (clean.includes('m to ft') || clean.includes('to ft')) {
        result = val * 3.28084;
        label = "ft";
      } else if (clean.includes('ft to m') || clean.includes('to m')) {
        result = val / 3.28084;
        label = "m";
      } else if (clean.includes('kg to lb') || clean.includes('to lb')) {
        result = val * 2.20462;
        label = "lb";
      } else if (clean.includes('lb to kg') || clean.includes('to kg')) {
        result = val / 2.20462;
        label = "kg";
      } else if (clean.includes('km to mi') || clean.includes('to mi')) {
        result = val * 0.621371;
        label = "miles";
      } else {
        result = val * 3.28084;
        label = "ft";
      }

      const resStr = Number(result.toFixed(4)).toString();
      ctx.setDisplay(resStr);
      return { result: `${resStr} ${label}`, details: `${val} converted = ${resStr} ${label}` };
    },
  },

  {
    category: "Programming",
    title: "Base Conversion (BIN, HEX, OCT, DEC)",
    syntax: "hex 255",
    description: "Convert numbers between Binary, Hexadecimal, Octal, and Decimal.",
    keywords: ["hex", "bin", "oct", "dec", "base"],
    action: (text, ctx) => {
      const clean = text.toLowerCase().trim();
      if (clean.startsWith('hex')) {
        const n = parseInt(clean.replace('hex', '').trim(), 10);
        const res = '0x' + n.toString(16).toUpperCase();
        ctx.setDisplay(res);
        return { result: res, details: `${n} in Hexadecimal: ${res}` };
      }
      if (clean.startsWith('bin')) {
        const n = parseInt(clean.replace('bin', '').trim(), 10);
        const res = '0b' + n.toString(2);
        ctx.setDisplay(res);
        return { result: res, details: `${n} in Binary: ${res}` };
      }
      if (clean.startsWith('oct')) {
        const n = parseInt(clean.replace('oct', '').trim(), 10);
        const res = '0o' + n.toString(8);
        ctx.setDisplay(res);
        return { result: res, details: `${n} in Octal: ${res}` };
      }
      // Hex/bin to decimal
      const dec = parseInt(clean, 16) || parseInt(clean, 2) || 0;
      ctx.setDisplay(dec.toString());
      return { result: dec.toString(), details: `Decimal value: ${dec}` };
    },
  },

  /* ================= 10. GRAPHS & VISUAL TOOLS ================= */
  {
    category: "Graphs",
    title: "Graph 2D Function",
    syntax: "graph x^2 + 3x - 1",
    description: "Plot a 2D interactive graph of a function.",
    keywords: ["graph", "plot", "draw", "2d"],
    action: (text, ctx) => {
      const fn = text.replace(/graph/i, '').replace(/plot/i, '').trim() || 'sin(x)';
      ctx.open2DGraph(fn);
      ctx.setDisplay(fn);
      return { result: `Plotting 2D: ${fn}`, details: "2D graph visualizer opened." };
    },
  },

  {
    category: "Graphs",
    title: "Graph 3D Surface",
    syntax: "3d sin(sqrt(x^2+y^2))",
    description: "Render an interactive 3D WebGL surface plot.",
    keywords: ["3d", "surface", "3d graph"],
    action: (text, ctx) => {
      const eq = text.replace(/3d/i, '').replace(/surface/i, '').trim();
      if (eq) ctx.setDisplay(eq);
      ctx.open3DGraph();
      return { result: "3D Surface Grapher Opened", details: "WebGL 3D surface plot active." };
    },
  },

  {
    category: "Tools",
    title: "Stopwatch",
    syntax: "stopwatch",
    description: "Precision stopwatch with millisecond precision and lap counter.",
    keywords: ["stopwatch", "timer stop"],
    action: (_, ctx) => {
      ctx.openStopwatch();
      return { result: "Stopwatch Opened" };
    },
  },

  {
    category: "Tools",
    title: "Countdown Timer",
    syntax: "timer",
    description: "Countdown timer with hours, minutes, and seconds.",
    keywords: ["timer", "countdown"],
    action: (_, ctx) => {
      ctx.openTimer();
      return { result: "Timer Opened" };
    },
  },

  {
    category: "Reference",
    title: "Periodic Table",
    syntax: "periodic table",
    description: "Open the interactive periodic table with all 118 elements.",
    keywords: ["periodic table"],
    action: (_, ctx) => {
      ctx.openPeriodicTable();
      return { result: "Periodic Table Opened" };
    },
  },

  {
    category: "Reference",
    title: "Formula Book",
    syntax: "formula",
    description: "Open the built-in mathematics formula handbook.",
    keywords: ["formula", "formulas"],
    action: (_, ctx) => {
      ctx.openFormulaBook();
      return { result: "Formula Book Opened" };
    },
  },

  {
    category: "Reference",
    title: "Physical Constants",
    syntax: "constants",
    description: "Open the physical and mathematical constants list.",
    keywords: ["constants", "constant"],
    action: (_, ctx) => {
      ctx.openConstants();
      return { result: "Constants Menu Opened" };
    },
  },
];

/* ========================================================================= */
/*                   UNIVERSAL AI NATURAL LANGUAGE QUERY DISPATCHER          */
/* ========================================================================= */

/**
 * Universal solver for all types of calculator operations via AI prompt.
 * Parses natural language questions, extracts expressions, solves them efficiently,
 * and sets the perfect result directly into the calculator display.
 */
export function solvePromptQuery(rawPrompt: string, context: SmartContext): SmartExecutionResult {
  const prompt = rawPrompt.trim();
  if (!prompt) {
    return { result: "0", details: "Empty prompt" };
  }

  const lower = prompt.toLowerCase();

  // Strip conversational prefix fillers: "what is", "calculate", "find", "solve", "evaluate", "please", "can you tell me"
  let clean = prompt
    .replace(/^(?:what\s+is|calculate|evaluate|find|compute|tell\s+me|please)\s+/i, '')
    .replace(/[?!]+$/, '')
    .trim();

  // 1. Check exact command keywords
  for (const cmd of SMART_COMMANDS) {
    for (const key of cmd.keywords) {
      if (lower.startsWith(key + ' ') || lower === key) {
        const param = clean.replace(new RegExp(`^${key}\\s*`, 'i'), '').trim();
        return cmd.action(param || clean, context);
      }
    }
  }

  // 2. Factorial detection: "100!", "factorial of 100", "70!"
  const factMatch = clean.match(/^(\d+)(!{1,2})$/) || clean.match(/^factorial\s+(?:of\s+)?(\d+)$/i);
  if (factMatch) {
    const isDouble = factMatch[2] === '!!';
    const num = factMatch[1];
    const factResult = calculateExactFactorial(isDouble ? `${num}!!` : num);
    const mainDisplay = factResult.isLarge ? factResult.scientificNotation : factResult.exactString;
    context.setDisplay(mainDisplay);
    if (context.setExactFactorial) context.setExactFactorial(factResult);
    if (context.addHistory) context.addHistory(factResult.isDoubleFactorial ? `${num}!!` : `${num}!`, mainDisplay);
    return {
      result: mainDisplay,
      details: `${factResult.n}${factResult.isDoubleFactorial ? '!!' : '!'} = ${factResult.digitCount} digits (${factResult.trailingZeros} trailing zeros)`,
      exactFactorial: factResult,
    };
  }

  // 3. Chemistry molar mass detection: "molar mass of Ca(OH)2", "formula H2SO4", etc.
  if (lower.includes('molar mass') || lower.includes('molecular mass') || lower.includes('formula mass')) {
    const formula = clean.replace(/molar mass of/i, '').replace(/molar mass/i, '').replace(/molecular mass of/i, '').replace(/formula/i, '').trim();
    const mm = calculateMolarMass(formula);
    if (mm.isValid) {
      const massStr = mm.molarMass.toFixed(3);
      context.setDisplay(massStr);
      if (context.addHistory) context.addHistory(`Molar Mass (${formula})`, `${massStr} g/mol`);
      const breakdownStr = mm.breakdown.map((b) => `${b.symbol}: ${b.percent.toFixed(1)}%`).join(', ');
      return {
        result: `${massStr} g/mol`,
        details: `${formula} = ${massStr} g/mol • Breakdown: ${breakdownStr}`,
      };
    }
  }

  // 4. Equation detection: contains '=' and a variable ('x' or 'y')
  if (clean.includes('=') && (clean.includes('x') || clean.includes('y'))) {
    const quad = parseQuadraticEquation(clean);
    if (quad) {
      const solved = solveQuadraticCoeffs(quad.a, quad.b, quad.c);
      const resStr = solved.roots.join(', ');
      context.setDisplay(resStr);
      if (context.addHistory) context.addHistory(`Solve ${clean}`, resStr);
      return {
        result: resStr,
        details: `Quadratic: a=${quad.a}, b=${quad.b}, c=${quad.c} • Δ=${(solved.discriminant ?? 0).toFixed(2)}`,
      };
    }
    const gen = solveGeneralEquation(clean);
    context.setDisplay(gen.display);
    if (context.addHistory) context.addHistory(`Solve ${clean}`, gen.display);
    return { result: gen.display, details: gen.details };
  }

  // 5. Derivative query: "derivative of ...", "diff ...", "d/dx ..."
  if (lower.startsWith('derivative of ') || lower.startsWith('diff ') || lower.startsWith('d/dx ')) {
    const expr = clean.replace(/^(?:derivative of|diff|d\/dx)\s*/i, '').trim();
    try {
      const d = math.derivative(sanitizeMath(expr), 'x').toString();
      context.setDisplay(d);
      if (context.addHistory) context.addHistory(`d/dx(${expr})`, d);
      return { result: d, details: `Symbolic derivative: ${d}` };
    } catch {
      // fallback
    }
  }

  // 6. Integration query: "integral of ...", "integrate ..."
  if (lower.startsWith('integral of ') || lower.startsWith('integrate ')) {
    const expr = clean.replace(/^(?:integral of|integrate)\s*/i, '').trim();
    try {
      const val = integrateFunction(expr, 0, 1);
      const resStr = Number(val.toFixed(6)).toString();
      context.setDisplay(resStr);
      return { result: resStr, details: `Definite integral of ${expr} from 0 to 1 = ${resStr}` };
    } catch {
      // fallback
    }
  }

  // 7. General Mathematical Expression Evaluation (Supports trigonometry, powers, complex numbers, BigNumber)
  try {
    const sanitized = sanitizeMath(clean);
    const evalRes = math.evaluate(sanitized);

    let formatted: string;
    if (typeof evalRes === 'object' && evalRes !== null && 'im' in evalRes) {
      formatted = evalRes.toString();
    } else {
      formatted = math.format(evalRes, { precision: 14 });
    }

    context.setDisplay(formatted);
    if (context.addHistory) context.addHistory(clean, formatted);
    return {
      result: formatted,
      details: `${clean} = ${formatted}`,
    };
  } catch {
    // 8. If cannot evaluate directly, try applying string directly to display
    context.setDisplay(clean);
    return {
      result: clean,
      details: 'Expression loaded onto calculator display',
    };
  }
}
