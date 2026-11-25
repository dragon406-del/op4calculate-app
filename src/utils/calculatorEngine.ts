import { math } from './mathInstance';
import { calculateExactFactorial, FactorialResult } from './factorial';
import { periodicElements, electronConfigs } from '../data/elements';

export interface HistoryItem {
  id: string;
  expression: string;
  result: string;
  timestamp: string;
}

export interface EngineState {
  display: string;
  preview: string;
  degreeMode: boolean;
  memory: number;
  history: HistoryItem[];
  variables: Record<string, number>;
  lastAnswer: string | number;
  exactFactorial: FactorialResult | null;
  engExponent: number;
}

export class CalculatorEngine {
  private state: EngineState = {
    display: '',
    preview: '',
    degreeMode: true,
    memory: 0,
    history: [],
    variables: { A: 0, B: 0, C: 0, D: 0, E: 0, F: 0, X: 0, Y: 0, M: 0 },
    lastAnswer: 0,
    exactFactorial: null,
    engExponent: 0,
  };

  private listeners: Array<(state: EngineState) => void> = [];

  constructor() {
    this.updatePreview();
  }

  public subscribe(listener: (state: EngineState) => void): () => void {
    this.listeners.push(listener);
    listener({ ...this.state });
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }

  private notify() {
    this.listeners.forEach((l) => l({ ...this.state }));
  }

  public getState(): EngineState {
    return { ...this.state };
  }

  public append(val: string) {
    this.state.display += val;
    this.updatePreview();
    this.notify();
  }

  public setDisplay(val: string) {
    this.state.display = val;
    this.updatePreview();
    this.notify();
  }

  public backspace() {
    this.state.display = this.state.display.slice(0, -1);
    this.updatePreview();
    this.notify();
  }

  public clear() {
    this.state.display = '';
    this.state.preview = '';
    this.state.exactFactorial = null;
    this.notify();
  }

  public clearHistory() {
    this.state.history = [];
    this.notify();
  }

  public toggleDegreeMode() {
    this.state.degreeMode = !this.state.degreeMode;
    this.updatePreview();
    this.notify();
  }

  // Memory operations
  public memoryClear() {
    this.state.memory = 0;
    this.notify();
  }

  public memoryRecall() {
    this.state.display += this.state.memory.toString();
    this.updatePreview();
    this.notify();
  }

  public memoryAdd() {
    try {
      const val = Number(math.evaluate(this.sanitizeExpression(this.state.display || '0')));
      if (!isNaN(val)) {
        this.state.memory += val;
        this.notify();
      }
    } catch {
      // ignore
    }
  }

  public memorySubtract() {
    try {
      const val = Number(math.evaluate(this.sanitizeExpression(this.state.display || '0')));
      if (!isNaN(val)) {
        this.state.memory -= val;
        this.notify();
      }
    } catch {
      // ignore
    }
  }

  public answer() {
    this.state.display += this.state.lastAnswer.toString();
    this.updatePreview();
    this.notify();
  }

  // Expression Sanitization
  public sanitizeExpression(expr: string): string {
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

    if (this.state.degreeMode) {
      clean = clean.replace(/\bsin\(([^()]*)\)/g, 'sin(($1)*pi/180)');
      clean = clean.replace(/\bcos\(([^()]*)\)/g, 'cos(($1)*pi/180)');
      clean = clean.replace(/\btan\(([^()]*)\)/g, 'tan(($1)*pi/180)');
    }

    return clean;
  }

  public updatePreview() {
    const raw = this.state.display.trim();
    if (!raw) {
      this.state.preview = '';
      return;
    }

    // Fast-path: do not attempt evaluation on trailing operators or open parens
    if (/[+\-*\/÷×−^,(]$/.test(raw)) {
      this.state.preview = '';
      return;
    }

    // Check for single factorial preview
    const factMatch = raw.match(/^(\d+)!$/);
    if (factMatch) {
      const n = Number(factMatch[1]);
      if (n <= 1000) {
        try {
          const res = calculateExactFactorial(n);
          this.state.preview = `= ${res.isLarge ? res.scientificNotation : res.exactString}`;
          return;
        } catch {
          // fallback
        }
      }
    }

    try {
      const sanitized = this.sanitizeExpression(raw);
      const res = math.evaluate(sanitized);
      const formatted = math.format(res, { precision: 12 });
      this.state.preview = `= ${formatted}`;
    } catch {
      this.state.preview = '';
    }
  }

  // Evaluate Expression
  public calculate() {
    const expr = this.state.display.trim();
    if (!expr) return;

    // Check for high-precision factorial format: "n!" or "factorial(n)"
    const factMatch = expr.match(/^(\d+)!$/) || expr.match(/^factorial\((\d+)\)$/i);
    if (factMatch) {
      this.computeFactorial(factMatch[1]);
      return;
    }

    try {
      const sanitized = this.sanitizeExpression(expr);
      const result = math.evaluate(sanitized);

      let formatted: string;
      if (typeof result === 'object' && result !== null && 'im' in result) {
        // Complex number
        formatted = result.toString();
      } else {
        formatted = math.format(result, { precision: 14 });
      }

      this.addHistory(expr, formatted);
      this.state.display = formatted;
      this.state.lastAnswer = formatted;
      this.state.preview = '';
      this.state.exactFactorial = null;
      this.notify();
    } catch {
      this.state.display = 'Error';
      this.notify();
    }
  }

  // Upgraded 100+ Digit Factorial Method
  public computeFactorial(inputVal?: string) {
    const raw = (inputVal || this.state.display).trim();
    const isDouble = raw.endsWith('!!');
    const target = raw.replace(/!/g, '').trim();
    if (!/^\d+$/.test(target)) {
      this.state.display = 'Error: Integer Required';
      this.notify();
      return;
    }

    try {
      const res = calculateExactFactorial(isDouble ? `${target}!!` : target);
      this.state.exactFactorial = res;
      
      const mainDisplayVal = res.isLarge ? res.scientificNotation : res.exactString;
      this.state.display = mainDisplayVal;
      this.state.lastAnswer = res.exactString;
      this.addHistory(res.isDoubleFactorial ? `${target}!!` : `${target}!`, res.exactString);
      this.notify();
    } catch (err: unknown) {
      this.state.display = err instanceof Error ? `Error: ${err.message}` : 'Factorial Error';
      this.notify();
    }
  }

  public addHistory(expression: string, result: string) {
    const item: HistoryItem = {
      id: Math.random().toString(36).substring(2, 9),
      expression,
      result,
      timestamp: new Date().toLocaleTimeString(),
    };
    this.state.history = [item, ...this.state.history.slice(0, 49)];
    this.notify();
  }

  // Scientific & Powers
  public square() { this.append('^2'); }
  public cube() { this.append('^3'); }
  public power() { this.append('^'); }
  public squareRoot() { this.append('sqrt('); }
  public cubeRoot() { this.append('cbrt('); }

  public inverse() {
    if (this.state.display) {
      this.state.display = `1/(${this.state.display})`;
      this.calculate();
    } else {
      this.append('1/');
    }
  }

  public absolute() {
    if (this.state.display) {
      this.state.display = `abs(${this.state.display})`;
      this.calculate();
    } else {
      this.append('abs(');
    }
  }

  public plusMinus() {
    if (this.state.display.startsWith('-')) {
      this.state.display = this.state.display.slice(1);
    } else if (this.state.display) {
      this.state.display = `-${this.state.display}`;
    }
    this.updatePreview();
    this.notify();
  }

  public tenPower() { this.append('10^('); }
  public expPower() { this.append('e^('); }
  public log10() { this.append('log10('); }
  public ln() { this.append('log('); }
  public sin() { this.append('sin('); }
  public cos() { this.append('cos('); }
  public tan() { this.append('tan('); }
  public asin() { this.append('asin('); }
  public acos() { this.append('acos('); }
  public atan() { this.append('atan('); }

  public random() {
    const r = Math.random().toFixed(6);
    this.append(r);
  }

  // ================= CALCULUS =================
  public symbolicDerivative() {
    try {
      const expr = this.state.display.trim() || 'x^3 + 2*x';
      const d = math.derivative(expr, 'x').toString();
      this.addHistory(`d/dx(${expr})`, d);
      this.state.display = d;
      this.notify();
    } catch {
      this.state.display = 'Derivative Error';
      this.notify();
    }
  }

  public differentiateNumeric() {
    const raw = this.state.display.includes(',') ? this.state.display : (this.state.display ? `${this.state.display}, 1` : 'x^2, 3');
    const parts = raw.split(',');
    if (parts.length < 2) return;
    try {
      const expr = parts[0].trim();
      const x0 = Number(parts[1].trim());
      const h = 0.00001;
      const f1 = Number(math.evaluate(expr, { x: x0 + h }));
      const f2 = Number(math.evaluate(expr, { x: x0 - h }));
      const deriv = (f1 - f2) / (2 * h);
      const rounded = Math.round(deriv * 1e8) / 1e8;
      this.state.display = rounded.toString();
      this.addHistory(`d/dx(${expr}) at ${x0}`, rounded.toString());
      this.notify();
    } catch {
      this.state.display = 'Error';
      this.notify();
    }
  }

  public integrateNumeric() {
    const raw = this.state.display.includes(',') ? this.state.display : (this.state.display ? `${this.state.display}, 0, 1` : 'x^2, 0, 1');
    const parts = raw.split(',');
    if (parts.length < 3) return;
    try {
      const expr = parts[0].trim();
      const a = Number(parts[1].trim());
      const b = Number(parts[2].trim());
      const n = 1000;
      const h = (b - a) / n;
      let sum = Number(math.evaluate(expr, { x: a })) + Number(math.evaluate(expr, { x: b }));
      for (let i = 1; i < n; i++) {
        const x = a + i * h;
        sum += (i % 2 === 0 ? 2 : 4) * Number(math.evaluate(expr, { x }));
      }
      const result = (h / 3) * sum;
      const rounded = Math.round(result * 1e8) / 1e8;
      this.state.display = rounded.toString();
      this.addHistory(`∫(${expr})dx [${a}, ${b}]`, rounded.toString());
      this.notify();
    } catch {
      this.state.display = 'Integration Error';
      this.notify();
    }
  }

  public limitNumeric() {
    const raw = this.state.display.includes(',') ? this.state.display : (this.state.display ? `${this.state.display}, 0` : 'sin(x)/x, 0');
    const parts = raw.split(',');
    if (parts.length < 2) return;
    try {
      const expr = parts[0].trim();
      const x0 = Number(parts[1].trim());
      const h = 1e-7;
      const y1 = Number(math.evaluate(expr, { x: x0 + h }));
      const y2 = Number(math.evaluate(expr, { x: x0 - h }));
      const lim = (y1 + y2) / 2;
      const rounded = Math.round(lim * 1e6) / 1e6;
      this.state.display = rounded.toString();
      this.addHistory(`lim x->${x0} (${expr})`, rounded.toString());
      this.notify();
    } catch {
      this.state.display = 'Limit Error';
      this.notify();
    }
  }

  public taylorSeries() {
    try {
      const expr = this.state.display.trim() || 'exp(x)';
      // Compute first 4 terms around 0
      const d0 = Number(math.evaluate(expr, { x: 0 }));
      const d1 = Number(math.derivative(expr, 'x').evaluate({ x: 0 }));
      const d2 = Number(math.derivative(math.derivative(expr, 'x').toString(), 'x').evaluate({ x: 0 }));
      const d3 = Number(math.derivative(math.derivative(math.derivative(expr, 'x').toString(), 'x').toString(), 'x').evaluate({ x: 0 }));

      const terms = [
        d0.toFixed(2),
        `${d1.toFixed(2)}x`,
        `${(d2 / 2).toFixed(2)}x²`,
        `${(d3 / 6).toFixed(2)}x³`
      ];
      const series = terms.filter(t => !t.startsWith('0.00')).join(' + ');
      this.state.display = series || '0';
      this.addHistory(`Taylor(${expr})`, this.state.display);
      this.notify();
    } catch {
      this.state.display = 'Taylor Error';
      this.notify();
    }
  }

  public simplify() {
    try {
      const expr = this.state.display.trim() || '2*x + 3*x';
      const s = math.simplify(expr).toString();
      this.state.display = s;
      this.addHistory(`simplify(${expr})`, s);
      this.notify();
    } catch {
      this.state.display = 'Simplify Error';
      this.notify();
    }
  }

  // ================= EQUATION SOLVERS =================
  public solverMenu() {
    const choice = prompt(
      `SOLVER MENU:\n1 = Linear Equation (f(x)=0)\n2 = Quadratic (ax²+bx+c=0)\n3 = Cubic (ax³+bx²+cx+d=0)\n4 = Quartic (ax⁴+bx³+cx²+dx+e=0)\n5 = 2-Var System\n6 = 3-Var System\n7 = Newton-Raphson\n8 = Bisection\n\nEnter choice (1-8):`
    );
    if (!choice) return;
    switch (choice.trim()) {
      case '1': this.solveGeneral(); break;
      case '2': this.solveQuadratic(); break;
      case '3': this.solveCubic(); break;
      case '4': this.solveQuartic(); break;
      case '5': this.solve2Var(); break;
      case '6': this.solve3Var(); break;
      case '7': this.solveNewton(); break;
      case '8': this.solveBisection(); break;
      default: break;
    }
  }

  public solveGeneral() {
    try {
      let eq = this.state.display.trim();
      if (!eq || !eq.includes('=')) {
        eq = prompt('Enter equation (e.g. 2x - 10 = 0 or x^2 - 4 = 0):', eq || '2*x - 10 = 0') || '';
      }
      if (!eq) return;

      const [lhs, rhs] = eq.split('=');
      const diffExpr = `(${lhs}) - (${rhs})`;

      // Numerical search for root near 0
      let root: number | null = null;
      for (let x = -50; x <= 50; x += 0.5) {
        try {
          const val = Number(math.evaluate(diffExpr, { x }));
          if (Math.abs(val) < 1e-4) {
            root = x;
            break;
          }
        } catch { /* continue */ }
      }

      if (root !== null) {
        this.state.display = `x = ${root.toFixed(4)}`;
        this.addHistory(`Solve: ${eq}`, `x = ${root.toFixed(4)}`);
      } else {
        // Try bisection
        const f = (x: number) => Number(math.evaluate(diffExpr, { x }));
        let a = -10, b = 10;
        for (let i = 0; i < 40; i++) {
          const mid = (a + b) / 2;
          if (f(a) * f(mid) <= 0) b = mid;
          else a = mid;
        }
        const found = (a + b) / 2;
        if (Math.abs(f(found)) < 0.1) {
          this.state.display = `x ≈ ${found.toFixed(4)}`;
          this.addHistory(`Solve: ${eq}`, `x ≈ ${found.toFixed(4)}`);
        } else {
          this.state.display = 'Root search: No real root near origin';
        }
      }
      this.notify();
    } catch {
      this.state.display = 'Solver Error';
      this.notify();
    }
  }

  public solveQuadratic() {
    const raw = prompt('Enter quadratic coefficients a, b, c:\nExample: 1, -5, 6 (for x² - 5x + 6 = 0)', '1, -5, 6');
    if (!raw) return;
    const parts = raw.split(',').map((p) => Number(p.trim()));
    if (parts.length < 3 || isNaN(parts[0])) return;
    const [a, b, c] = parts;
    const disc = b * b - 4 * a * c;
    if (disc >= 0) {
      const x1 = (-b + Math.sqrt(disc)) / (2 * a);
      const x2 = (-b - Math.sqrt(disc)) / (2 * a);
      const res = `x₁ = ${x1.toFixed(4)}, x₂ = ${x2.toFixed(4)}`;
      this.state.display = res;
      this.addHistory(`Quad: ${a}x² + ${b}x + ${c} = 0`, res);
    } else {
      const real = (-b / (2 * a)).toFixed(4);
      const imag = (Math.sqrt(-disc) / (2 * a)).toFixed(4);
      const res = `x = ${real} ± ${imag}i`;
      this.state.display = res;
      this.addHistory(`Quad: ${a}x² + ${b}x + ${c} = 0`, res);
    }
    this.notify();
  }

  public solveCubic() {
    const raw = prompt('Enter cubic coefficients a, b, c, d:\nExample: 1, -6, 11, -6', '1, -6, 11, -6');
    if (!raw) return;
    try {
      const [a, b, c, d] = raw.split(',').map((p) => Number(p.trim()));
      // Search roots
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
      const res = roots.length > 0 ? `Roots: ${roots.join(', ')}` : 'No real roots';
      this.state.display = res;
      this.addHistory(`Cubic: ${a}x³+${b}x²+${c}x+${d}=0`, res);
      this.notify();
    } catch {
      this.state.display = 'Cubic Solver Error';
      this.notify();
    }
  }

  public solveQuartic() {
    const raw = prompt('Enter coefficients a,b,c,d,e for ax⁴+bx³+cx²+dx+e=0:', '1, -4, 6, -4, 1');
    if (!raw) return;
    try {
      const [a, b, c, d, e] = raw.split(',').map(n => Number(n.trim()));
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
      const res = roots.length > 0 ? `Quartic roots: ${roots.join(', ')}` : 'No real roots';
      this.state.display = res;
      this.addHistory('Quartic Solver', res);
      this.notify();
    } catch {
      this.state.display = 'Quartic Error';
      this.notify();
    }
  }

  public solveNewton() {
    const raw = prompt('Newton-Raphson:\nEnter f(x) and initial guess x0 (e.g. x^3 - 2x - 5, 2):', 'x^3 - 2*x - 5, 2');
    if (!raw) return;
    const parts = raw.split(',');
    if (parts.length < 2) return;
    try {
      const expr = parts[0].trim();
      let x = Number(parts[1].trim());
      const derivExpr = math.derivative(expr, 'x').toString();

      for (let i = 0; i < 30; i++) {
        const fx = Number(math.evaluate(expr, { x }));
        const dfx = Number(math.evaluate(derivExpr, { x }));
        if (Math.abs(dfx) < 1e-12) break;
        x = x - fx / dfx;
      }
      const res = `x = ${x.toFixed(6)}`;
      this.state.display = res;
      this.addHistory(`Newton(${expr})`, res);
      this.notify();
    } catch {
      this.state.display = 'Newton Error';
      this.notify();
    }
  }

  public solveBisection() {
    const raw = prompt('Bisection Method:\nEnter equation, left a, right b:\nExample: x^3 - 2*x - 5, 2, 3', 'x^3 - 2*x - 5, 2, 3');
    if (!raw) return;
    const parts = raw.split(',');
    if (parts.length < 3) return;
    try {
      const expr = parts[0].trim();
      let a = Number(parts[1].trim());
      let b = Number(parts[2].trim());
      const f = (x: number) => Number(math.evaluate(expr, { x }));

      if (f(a) * f(b) > 0) {
        this.state.display = 'f(a) and f(b) must have opposite signs';
        this.notify();
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
      const res = `x = ${((a + b) / 2).toFixed(6)}`;
      this.state.display = res;
      this.addHistory(`Bisection(${expr})`, res);
      this.notify();
    } catch {
      this.state.display = 'Bisection Error';
      this.notify();
    }
  }

  public verifyEquation() {
    try {
      const eq = this.state.display.trim() || prompt('Enter equation to verify (e.g. sin(x)^2 + cos(x)^2 = 1):');
      if (!eq || !eq.includes('=')) {
        this.state.display = 'Requires =';
        this.notify();
        return;
      }
      const [lhs, rhs] = eq.split('=');
      const v1 = Number(math.evaluate(this.sanitizeExpression(lhs), { x: 1.23 }));
      const v2 = Number(math.evaluate(this.sanitizeExpression(rhs), { x: 1.23 }));
      const equal = Math.abs(v1 - v2) < 1e-5;
      this.state.display = equal ? 'TRUE (Verified)' : 'FALSE (Not Equal)';
      this.addHistory(`Verify: ${eq}`, this.state.display);
      this.notify();
    } catch {
      this.state.display = 'Verify Error';
      this.notify();
    }
  }

  public solve2Var() {
    const eq1 = prompt('Equation 1: a1*x + b1*y = c1\nEnter a1, b1, c1:', '2, 3, 8');
    if (!eq1) return;
    const eq2 = prompt('Equation 2: a2*x + b2*y = c2\nEnter a2, b2, c2:', '1, -1, 1');
    if (!eq2) return;
    try {
      const [a1, b1, c1] = eq1.split(',').map((p) => Number(p.trim()));
      const [a2, b2, c2] = eq2.split(',').map((p) => Number(p.trim()));
      const det = a1 * b2 - a2 * b1;
      if (Math.abs(det) < 1e-12) {
        this.state.display = 'No Unique Solution (Det = 0)';
      } else {
        const x = (c1 * b2 - c2 * b1) / det;
        const y = (a1 * c2 - a2 * c1) / det;
        const res = `x = ${x}, y = ${y}`;
        this.state.display = res;
        this.addHistory(`2-Var: {${a1}x+${b1}y=${c1}, ${a2}x+${b2}y=${c2}}`, res);
      }
      this.notify();
    } catch {
      this.state.display = 'Linear Solver Error';
      this.notify();
    }
  }

  public solve3Var() {
    const raw = prompt('Enter 3 equations rows [a,b,c | d] separated by semicolon:\nExample: 1,1,1,6; 0,2,5,-4; 2,5,-1,27', '1,1,1,6; 0,2,5,-4; 2,5,-1,27');
    if (!raw) return;
    try {
      const rows = raw.split(';').map((r) => r.split(',').map((v) => Number(v.trim())));
      const A = rows.map((r) => r.slice(0, 3));
      const B = rows.map((r) => r[3]);
      const sol = (math as any).lusolve(A, B);
      const res = `x = ${sol[0][0].toFixed(3)}, y = ${sol[1][0].toFixed(3)}, z = ${sol[2][0].toFixed(3)}`;
      this.state.display = res;
      this.addHistory('3-Var System', res);
      this.notify();
    } catch {
      this.state.display = '3-Var Solver Error';
      this.notify();
    }
  }

  // ================= TABLE MODE =================
  public tableMode() {
    const expr = prompt('Enter function in x (e.g. x^2 - 4):', this.state.display || 'x^2 - 4');
    if (!expr) return;
    const start = Number(prompt('Start value:', '-3') || '-3');
    const end = Number(prompt('End value:', '3') || '3');
    const step = Number(prompt('Step size:', '1') || '1');

    const rows: string[] = [];
    for (let x = start; x <= end + 1e-9; x += step) {
      try {
        const y = Number(math.evaluate(expr, { x }));
        rows.push(`x=${x.toFixed(1)}: y=${y.toFixed(3)}`);
      } catch {
        rows.push(`x=${x}: Error`);
      }
    }
    alert(`TABLE for ${expr}:\n\n` + rows.join('\n'));
    this.state.display = `Table (${start}..${end})`;
    this.notify();
  }

  // ================= MATRIX OPERATIONS =================
  public matrixMenu() {
    const choice = prompt(
      `MATRIX CALCULATOR:\n1 = Determinant\n2 = Transpose\n3 = Inverse\n4 = Multiply Matrix\n\nEnter choice (1-4):`
    );
    if (choice === '1') this.matrixDet();
    else if (choice === '2') this.matrixTranspose();
    else if (choice === '3') this.matrixInverse();
    else if (choice === '4') this.matrixMultiply();
  }

  public matrixDet() {
    const raw = this.state.display.includes(';') ? this.state.display : '1, 2; 3, 4';
    try {
      const rows = raw.split(';').map(r => r.split(',').map(n => Number(n.trim())));
      const d = (math as any).det(rows);
      this.state.display = `Det = ${d}`;
      this.addHistory(`Det([${raw}])`, d.toString());
      this.notify();
    } catch {
      this.state.display = 'Matrix Error';
      this.notify();
    }
  }

  public matrixTranspose() {
    const raw = this.state.display.includes(';') ? this.state.display : '1, 2, 3; 4, 5, 6';
    try {
      const rows = raw.split(';').map(r => r.split(',').map(n => Number(n.trim())));
      const t = (math as any).transpose(rows);
      const str = t.map((r: any) => r.join(', ')).join('; ');
      this.state.display = `[ ${str} ]`;
      this.addHistory(`Transpose`, str);
      this.notify();
    } catch {
      this.state.display = 'Transpose Error';
      this.notify();
    }
  }

  public matrixInverse() {
    const raw = this.state.display.includes(';') ? this.state.display : '4, 7; 2, 6';
    try {
      const rows = raw.split(';').map(r => r.split(',').map(n => Number(n.trim())));
      const inv = (math as any).inv(rows);
      const str = inv.map((r: any) => r.map((n: number) => n.toFixed(3)).join(', ')).join('; ');
      this.state.display = `[ ${str} ]`;
      this.addHistory(`Inverse`, str);
      this.notify();
    } catch {
      this.state.display = 'Singular Matrix (No Inv)';
      this.notify();
    }
  }

  public matrixMultiply() {
    const m1 = '1, 2; 3, 4';
    const m2 = '2, 0; 1, 2';
    try {
      const r1 = m1.split(';').map(r => r.split(',').map(n => Number(n.trim())));
      const r2 = m2.split(';').map(r => r.split(',').map(n => Number(n.trim())));
      const prod = (math as any).multiply(r1, r2);
      const str = prod.map((r: any) => r.join(', ')).join('; ');
      this.state.display = `[ ${str} ]`;
      this.addHistory(`Matrix Multiply`, str);
      this.notify();
    } catch {
      this.state.display = 'Dimension Error';
      this.notify();
    }
  }

  // ================= COMPLEX NUMBERS =================
  public complexMenu() {
    this.toComplex();
  }

  public toComplex() {
    const z = this.state.display.trim() || '3 + 4i';
    try {
      const res = (math as any).complex(z).toString();
      this.state.display = res;
      this.addHistory(`Complex`, res);
      this.notify();
    } catch {
      this.state.display = 'Complex Error';
      this.notify();
    }
  }

  public complexAbs() {
    try {
      const expr = this.state.display.trim() || '3 + 4i';
      const c = (math as any).complex(expr);
      const mag = (math as any).abs(c);
      this.state.display = mag.toString();
      this.addHistory(`|${expr}|`, mag.toString());
      this.notify();
    } catch {
      this.state.display = 'Error';
      this.notify();
    }
  }

  public complexConjugate() {
    try {
      const expr = this.state.display.trim() || '3 + 4i';
      const c = (math as any).complex(expr);
      const conj = (math as any).conj(c).toString();
      this.state.display = conj;
      this.addHistory(`conj(${expr})`, conj);
      this.notify();
    } catch {
      this.state.display = 'Error';
      this.notify();
    }
  }

  public polarToRect() {
    const raw = prompt('Enter r and theta (deg) separated by comma (e.g. 5, 53.13):', '5, 53.13');
    if (!raw) return;
    try {
      const [r, deg] = raw.split(',').map(n => Number(n.trim()));
      const rad = (deg * Math.PI) / 180;
      const x = r * Math.cos(rad);
      const y = r * Math.sin(rad);
      const res = `${x.toFixed(3)} + ${y.toFixed(3)}i`;
      this.state.display = res;
      this.notify();
    } catch {
      this.state.display = 'Error';
      this.notify();
    }
  }

  public rectToPolar() {
    const expr = this.state.display || prompt('Enter complex number (e.g. 3 + 4i):', '3 + 4i') || '';
    if (!expr) return;
    try {
      const c = (math as any).complex(expr);
      const r = (math as any).abs(c);
      const phi = (math as any).arg(c) * (180 / Math.PI);
      const res = `r = ${r.toFixed(3)}, θ = ${phi.toFixed(2)}°`;
      this.state.display = res;
      this.notify();
    } catch {
      this.state.display = 'Error';
      this.notify();
    }
  }

  // ================= STATISTICS =================
  public statisticsMenu() {
    const choice = prompt(
      `STATISTICS MENU:\n1 = Mean (Average)\n2 = Median\n3 = Standard Deviation\n4 = Variance\n5 = Linear Regression (y = mx + b)\n\nEnter choice (1-5):`
    );
    if (!choice) return;
    const raw = prompt('Enter comma-separated numbers (e.g. 12, 15, 20, 25, 30):', '12, 15, 20, 25, 30');
    if (!raw) return;
    const nums = raw.split(',').map(n => Number(n.trim())).filter(n => !isNaN(n));
    if (nums.length === 0) return;

    if (choice === '1') {
      const meanVal = nums.reduce((a, b) => a + b, 0) / nums.length;
      this.state.display = `Mean = ${meanVal.toFixed(4)}`;
    } else if (choice === '2') {
      const sorted = [...nums].sort((a, b) => a - b);
      const mid = Math.floor(sorted.length / 2);
      const medianVal = sorted.length % 2 !== 0 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
      this.state.display = `Median = ${medianVal}`;
    } else if (choice === '3') {
      const meanVal = nums.reduce((a, b) => a + b, 0) / nums.length;
      const variance = nums.reduce((acc, v) => acc + Math.pow(v - meanVal, 2), 0) / nums.length;
      this.state.display = `StdDev (σ) = ${Math.sqrt(variance).toFixed(4)}`;
    } else if (choice === '4') {
      const meanVal = nums.reduce((a, b) => a + b, 0) / nums.length;
      const variance = nums.reduce((acc, v) => acc + Math.pow(v - meanVal, 2), 0) / nums.length;
      this.state.display = `Variance (σ²) = ${variance.toFixed(4)}`;
    } else if (choice === '5') {
      this.linearRegression();
      return;
    }
    this.notify();
  }

  public mean() {
    const raw = this.state.display.includes(',') ? this.state.display : '10, 20, 30, 40, 50';
    const nums = raw.split(',').map(n => Number(n.trim())).filter(n => !isNaN(n));
    if (nums.length > 0) {
      const avg = nums.reduce((a, b) => a + b, 0) / nums.length;
      this.state.display = avg.toString();
      this.addHistory(`Mean(${raw})`, avg.toString());
      this.notify();
    }
  }

  public probabilityMenu() {
    this.combination();
  }

  public linearRegression() {
    const xRaw = '1, 2, 3, 4, 5';
    const yRaw = this.state.display.includes(',') ? this.state.display : '2, 4, 5, 4, 5';
    const X = xRaw.split(',').map(n => Number(n.trim()));
    const Y = yRaw.split(',').map(n => Number(n.trim()));
    const n = Math.min(X.length, Y.length);

    let sumX = 0, sumY = 0, sumXY = 0, sumX2 = 0;
    for (let i = 0; i < n; i++) {
      sumX += X[i];
      sumY += Y[i];
      sumXY += X[i] * Y[i];
      sumX2 += X[i] * X[i];
    }
    const m = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);
    const b = (sumY - m * sumX) / n;
    this.state.display = `y = ${m.toFixed(3)}x + ${b.toFixed(3)}`;
    this.addHistory('Linear Regression', this.state.display);
    this.notify();
  }

  // ================= NUMBER THEORY =================
  public numberTheoryMenu() {
    const raw = this.state.display.trim() || '48, 18';
    if (raw.includes(',')) {
      const [a, b] = raw.split(',').map(n => parseInt(n.trim(), 10));
      const gcd = (x: number, y: number): number => (y === 0 ? x : gcd(y, x % y));
      const g = gcd(a, b);
      const l = (a * b) / g;
      this.state.display = `GCD=${g}, LCM=${l}`;
      this.addHistory(`GCD(${a},${b})`, this.state.display);
      this.notify();
    } else {
      const n = Number(raw);
      if (n && n > 1) {
        let temp = n;
        const f: number[] = [];
        for (let d = 2; d <= temp; d++) {
          while (temp % d === 0) { f.push(d); temp /= d; }
        }
        this.state.display = `${n} = ${f.join(' × ')}`;
        this.addHistory(`Factors(${n})`, this.state.display);
        this.notify();
      }
    }
  }

  // ================= BASE CONVERSIONS =================
  public baseMenu() {
    this.toBinary();
  }

  public toBinary() {
    try {
      const n = parseInt(this.state.display.trim() || '0', 10);
      const bin = n.toString(2);
      this.state.display = `BIN: ${bin}`;
      this.notify();
    } catch {
      this.state.display = 'Base Error';
      this.notify();
    }
  }

  public toHex() {
    try {
      const n = parseInt(this.state.display.trim() || '0', 10);
      const hex = n.toString(16).toUpperCase();
      this.state.display = `HEX: 0x${hex}`;
      this.notify();
    } catch {
      this.state.display = 'Base Error';
      this.notify();
    }
  }

  public toOctal() {
    try {
      const n = parseInt(this.state.display.trim() || '0', 10);
      const oct = n.toString(8);
      this.state.display = `OCT: ${oct}`;
      this.notify();
    } catch {
      this.state.display = 'Base Error';
      this.notify();
    }
  }

  public toDecimalBase() {
    try {
      const str = this.state.display.replace(/^(BIN:|HEX:|OCT:|0x)/i, '').trim();
      const dec = parseInt(str, 16) || parseInt(str, 2) || parseInt(str, 10);
      this.state.display = dec.toString();
      this.notify();
    } catch {
      this.state.display = 'Base Error';
      this.notify();
    }
  }

  // ================= ENGINEERING & FRACTIONS =================
  public eng() {
    try {
      const val = Number(this.state.display);
      if (isNaN(val) || val === 0) return;
      const exp = Math.floor(Math.log10(Math.abs(val)));
      const engExp = Math.floor(exp / 3) * 3;
      const mantissa = val / Math.pow(10, engExp);
      this.state.display = `${mantissa.toFixed(4)} × 10^${engExp}`;
      this.state.engExponent = engExp;
      this.notify();
    } catch { /* ignore */ }
  }

  public engUp() {
    try {
      const val = Number(this.state.lastAnswer || this.state.display || 0);
      this.state.engExponent += 3;
      const mantissa = val / Math.pow(10, this.state.engExponent);
      this.state.display = `${mantissa.toFixed(4)} × 10^${this.state.engExponent}`;
      this.notify();
    } catch { /* ignore */ }
  }

  public engDown() {
    try {
      const val = Number(this.state.lastAnswer || this.state.display || 0);
      this.state.engExponent -= 3;
      const mantissa = val / Math.pow(10, this.state.engExponent);
      this.state.display = `${mantissa.toFixed(4)} × 10^${this.state.engExponent}`;
      this.notify();
    } catch { /* ignore */ }
  }

  public toFraction() {
    try {
      const val = Number(this.state.display);
      if (isNaN(val)) return;
      const frac = (math as any).fraction(val);
      this.state.display = `${frac.s < 0 ? '-' : ''}${frac.n}/${frac.d}`;
      this.notify();
    } catch {
      this.state.display = 'Fraction Error';
      this.notify();
    }
  }

  public combination() {
    let raw = this.state.display.trim();
    if (!raw.includes(',')) {
      if (raw && !isNaN(Number(raw))) {
        this.state.display = `${raw}, `;
        this.notify();
        return;
      }
      raw = '10, 3';
    }
    try {
      const [n, r] = raw.split(',').map(v => parseInt(v.trim(), 10));
      const res = (math as any).combinations(n, r);
      this.state.display = `${res}`;
      this.addHistory(`nCr(${n}, ${r})`, res.toString());
      this.notify();
    } catch {
      this.state.display = 'nCr Error';
      this.notify();
    }
  }

  public permutation() {
    let raw = this.state.display.trim();
    if (!raw.includes(',')) {
      if (raw && !isNaN(Number(raw))) {
        this.state.display = `${raw}, `;
        this.notify();
        return;
      }
      raw = '10, 3';
    }
    try {
      const [n, r] = raw.split(',').map(v => parseInt(v.trim(), 10));
      const res = (math as any).permutations(n, r);
      this.state.display = `${res}`;
      this.addHistory(`nPr(${n}, ${r})`, res.toString());
      this.notify();
    } catch {
      this.state.display = 'nPr Error';
      this.notify();
    }
  }

  // ================= ALPHA VARIABLES & SEQUENCES =================
  public alphaMenu() {
    const choice = prompt('ALPHA VARIABLES:\n1 = Store Value\n2 = Recall Variable\n3 = Show All Variables\n\nEnter choice (1-3):');
    if (choice === '1') {
      const variable = prompt('Store into variable (A, B, C, D, E, F, X, Y, M):', 'A')?.toUpperCase();
      if (!variable || !(variable in this.state.variables)) return;
      const val = Number(this.state.display || prompt('Enter value:', '0'));
      this.state.variables[variable] = val;
      this.state.display = `${variable} = ${val}`;
      this.notify();
    } else if (choice === '2') {
      const variable = prompt('Recall variable (A, B, C, D, E, F, X, Y, M):', 'A')?.toUpperCase();
      if (!variable || !(variable in this.state.variables)) return;
      this.state.display += this.state.variables[variable].toString();
      this.notify();
    } else if (choice === '3') {
      const list = Object.entries(this.state.variables).map(([k, v]) => `${k} = ${v}`).join('\n');
      alert(`VARIABLES:\n\n${list}`);
    }
  }

  public storeVariable(variable: string, val?: number) {
    const k = variable.toUpperCase();
    if (!(k in this.state.variables)) return;
    const v = val !== undefined ? val : (Number(this.state.display) || 0);
    this.state.variables[k] = v;
    this.state.display = `${k} = ${v}`;
    this.notify();
  }

  public recallVariable(variable: string) {
    const k = variable.toUpperCase();
    if (!(k in this.state.variables)) return;
    const v = this.state.variables[k];
    this.state.display += v.toString();
    this.updatePreview();
    this.notify();
  }

  public sequenceMenu() {
    const choice = prompt(
      `SEQUENCE CALCULATOR:\n1 = Arithmetic nth Term (a, d, n)\n2 = Arithmetic Sum\n3 = Geometric nth Term (a, r, n)\n4 = Geometric Sum\n5 = Infinite Geometric Sum\n\nEnter choice (1-5):`
    );
    if (!choice) return;
    if (choice === '1') {
      const raw = prompt('Enter first term a, difference d, term n (e.g. 2, 3, 10):', '2, 3, 10');
      if (raw) {
        const [a, d, n] = raw.split(',').map(v => Number(v.trim()));
        const term = a + (n - 1) * d;
        this.state.display = `a_${n} = ${term}`;
        this.notify();
      }
    } else if (choice === '2') {
      const raw = prompt('Enter a, d, n for Arithmetic Sum:', '2, 3, 10');
      if (raw) {
        const [a, d, n] = raw.split(',').map(v => Number(v.trim()));
        const sum = (n / 2) * (2 * a + (n - 1) * d);
        this.state.display = `S_${n} = ${sum}`;
        this.notify();
      }
    } else if (choice === '3') {
      const raw = prompt('Enter a, ratio r, n for Geometric nth term:', '2, 3, 5');
      if (raw) {
        const [a, r, n] = raw.split(',').map(v => Number(v.trim()));
        const term = a * Math.pow(r, n - 1);
        this.state.display = `a_${n} = ${term}`;
        this.notify();
      }
    } else if (choice === '4') {
      const raw = prompt('Enter a, ratio r, n for Geometric Sum:', '2, 3, 5');
      if (raw) {
        const [a, r, n] = raw.split(',').map(v => Number(v.trim()));
        const sum = r !== 1 ? (a * (1 - Math.pow(r, n))) / (1 - r) : a * n;
        this.state.display = `S_${n} = ${sum}`;
        this.notify();
      }
    }
  }

  // ================= CHEMISTRY & CONSTANTS =================
  public calculateMolarMass(formula?: string) {
    const f = formula || prompt('Enter chemical formula (e.g. H2SO4, NaCl, C6H12O6):', 'H2SO4');
    if (!f) return;
    try {
      const regex = /([A-Z][a-z]*)(\d*)/g;
      let match;
      let totalMass = 0;
      while ((match = regex.exec(f)) !== null) {
        const sym = match[1];
        const count = match[2] ? parseInt(match[2], 10) : 1;
        const el = periodicElements.find((e) => e.symbol === sym);
        if (!el) throw new Error(`Unknown element: ${sym}`);
        totalMass += el.mass * count;
      }
      const res = `${totalMass.toFixed(3)} g/mol`;
      this.state.display = `${f}: ${res}`;
      this.addHistory(`Molar Mass (${f})`, res);
      this.notify();
    } catch (err: unknown) {
      this.state.display = err instanceof Error ? err.message : 'Formula Error';
      this.notify();
    }
  }

  public programmingMenu() {
    const choice = prompt('PROGRAMMING BITWISE:\n1 = AND (&)\n2 = OR (|)\n3 = XOR (^)\n4 = NOT (~)\n5 = Left Shift (<<)\n6 = Right Shift (>>)');
    if (!choice) return;
    const raw = prompt('Enter two integers (e.g. 12, 10):', '12, 10');
    if (!raw) return;
    const [a, b] = raw.split(',').map(n => parseInt(n.trim(), 10));
    let res = 0;
    if (choice === '1') res = a & b;
    else if (choice === '2') res = a | b;
    else if (choice === '3') res = a ^ b;
    else if (choice === '4') res = ~a;
    else if (choice === '5') res = a << (b || 1);
    else if (choice === '6') res = a >> (b || 1);
    this.state.display = res.toString();
    this.notify();
  }

  public runProgram() {
    try {
      const code = this.state.display || prompt('Enter math expression to run:', 'sum([1, 2, 3, 4, 5])');
      if (!code) return;
      const res = math.evaluate(code);
      this.state.display = res.toString();
      this.addHistory(`Prog: ${code}`, res.toString());
      this.notify();
    } catch {
      this.state.display = 'Program Error';
      this.notify();
    }
  }
}

export const calculatorEngine = new CalculatorEngine();
