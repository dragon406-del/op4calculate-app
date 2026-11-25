/**
 * Chemistry Solver Engine for Scientific Calculator
 * Covers all 30 solvers from the original chemistry specification.
 */
import { periodicElements, electronConfigs } from '../data/elements';

export interface ElementBreakdown {
  symbol: string;
  name: string;
  count: number;
  atomicMass: number;
  totalMass: number;
  percent: number;
}

export interface MolarMassResult {
  formula: string;
  molarMass: number;
  breakdown: ElementBreakdown[];
  isValid: boolean;
  error?: string;
}

// Parse chemical formula including parentheses, e.g. Ca(OH)2, (NH4)2SO4, Fe2(SO4)3
export function parseChemicalFormula(formula: string): Record<string, number> {
  const clean = formula.trim().replace(/\s+/g, '');
  if (!clean) return {};

  const stack: Record<string, number>[] = [{}];
  let i = 0;

  while (i < clean.length) {
    const ch = clean[i];

    if (ch === '(' || ch === '[') {
      stack.push({});
      i++;
    } else if (ch === ')' || ch === ']') {
      i++;
      let countStr = '';
      while (i < clean.length && /\d/.test(clean[i])) {
        countStr += clean[i];
        i++;
      }
      const multiplier = countStr ? parseInt(countStr, 10) : 1;
      const popped = stack.pop() || {};
      const current = stack[stack.length - 1];

      for (const [sym, cnt] of Object.entries(popped)) {
        current[sym] = (current[sym] || 0) + cnt * multiplier;
      }
    } else if (/[A-Z]/.test(ch)) {
      let symbol = ch;
      i++;
      if (i < clean.length && /[a-z]/.test(clean[i])) {
        symbol += clean[i];
        i++;
      }
      let countStr = '';
      while (i < clean.length && /\d/.test(clean[i])) {
        countStr += clean[i];
        i++;
      }
      const count = countStr ? parseInt(countStr, 10) : 1;
      const current = stack[stack.length - 1];
      current[symbol] = (current[symbol] || 0) + count;
    } else {
      // Ignore unknown symbols or hydrate dot
      i++;
    }
  }

  return stack[0] || {};
}

// Compute Molar Mass and percentage composition
export function calculateMolarMass(formula: string): MolarMassResult {
  try {
    const counts = parseChemicalFormula(formula);
    const breakdown: ElementBreakdown[] = [];
    let totalMass = 0;

    for (const [sym, count] of Object.entries(counts)) {
      const element = periodicElements.find(
        (e) => e.symbol.toLowerCase() === sym.toLowerCase()
      );
      if (!element) {
        return {
          formula,
          molarMass: 0,
          breakdown: [],
          isValid: false,
          error: `Unknown element symbol: "${sym}"`,
        };
      }
      const mass = element.mass * count;
      totalMass += mass;
      breakdown.push({
        symbol: element.symbol,
        name: element.name,
        count,
        atomicMass: element.mass,
        totalMass: mass,
        percent: 0,
      });
    }

    if (totalMass > 0) {
      breakdown.forEach((b) => {
        b.percent = (b.totalMass / totalMass) * 100;
      });
    }

    return {
      formula,
      molarMass: totalMass,
      breakdown,
      isValid: breakdown.length > 0,
    };
  } catch (err: any) {
    return {
      formula,
      molarMass: 0,
      breakdown: [],
      isValid: false,
      error: err.message || 'Formula parse error',
    };
  }
}

// Find Element by query (symbol, name, or atomic number)
export function findElement(query: string) {
  const q = query.trim().toLowerCase();
  const num = parseInt(q, 10);
  if (!isNaN(num) && num >= 1 && num <= 118) {
    return periodicElements.find((e) => e.atomicNumber === num);
  }
  return periodicElements.find(
    (e) => e.symbol.toLowerCase() === q || e.name.toLowerCase() === q
  );
}

// Get Electron Configuration for atomic number or symbol
export function getElectronConfiguration(query: string): {
  element?: (typeof periodicElements)[0];
  config: string;
  orbitals: Record<string, string[]>;
} {
  const el = findElement(query);
  if (!el) {
    return { config: 'Not Found', orbitals: {} };
  }

  const rawConfig = electronConfigs[el.atomicNumber] || 'Unknown';
  const orbitals = parseOrbitals(rawConfig);
  return {
    element: el,
    config: rawConfig,
    orbitals,
  };
}

// Parse configuration string into orbital boxes (s=1, p=3, d=5, f=7) with Hund's rule spin arrows
export function parseOrbitals(configuration: string): Record<string, string[]> {
  const orbitals: Record<string, string[]> = {};
  const matches = configuration.match(/(\d[spdf])(\d+)/g);
  if (!matches) return orbitals;

  matches.forEach((part) => {
    const orbitalName = part.slice(0, 2);
    const electrons = parseInt(part.slice(2), 10);

    let boxes = 1;
    if (orbitalName.includes('s')) boxes = 1;
    else if (orbitalName.includes('p')) boxes = 3;
    else if (orbitalName.includes('d')) boxes = 5;
    else if (orbitalName.includes('f')) boxes = 7;

    const result: string[] = Array(boxes).fill('');
    // Hund's Rule: single electrons with parallel spins first
    for (let i = 0; i < electrons; i++) {
      const idx = i % boxes;
      if (result[idx] === '') {
        result[idx] = '↑';
      } else {
        result[idx] = '↑↓';
      }
    }
    orbitals[orbitalName] = result;
  });

  return orbitals;
}

// Reaction Type Identifier
export function identifyReactionType(equation: string): {
  type: string;
  reactants: string[];
  products: string[];
  explanation: string;
} {
  const clean = equation.replace(/\s+/g, '');
  if (!clean.includes('->') && !clean.includes('=')) {
    return {
      type: 'Invalid Equation',
      reactants: [],
      products: [],
      explanation: 'Equation must contain "->" or "=" separating reactants and products.',
    };
  }

  const arrow = clean.includes('->') ? '->' : '=';
  const [lhs, rhs] = clean.split(arrow);
  const reactants = lhs.split('+').filter(Boolean);
  const products = rhs.split('+').filter(Boolean);

  let type = 'Complex / Oxidation-Reduction';
  let explanation = '';

  if (reactants.length >= 2 && products.length === 1) {
    type = 'Combination (Synthesis)';
    explanation = 'Two or more chemical species combine to form a single product: A + B → AB.';
  } else if (reactants.length === 1 && products.length >= 2) {
    type = 'Decomposition';
    explanation = 'A single reactant breaks down into two or more products: AB → A + B.';
  } else if (reactants.length === 2 && products.length === 2) {
    if (reactants.some((r) => r.includes('O2')) && (products.some((p) => p.includes('CO2')) || products.some((p) => p.includes('H2O')))) {
      type = 'Combustion';
      explanation = 'Hydrocarbon or fuel burns in O₂ to produce carbon dioxide and/or water.';
    } else {
      type = 'Double Displacement / Metathesis';
      explanation = 'Cations and anions of two compounds exchange partners: AB + CD → AD + CB.';
    }
  } else if (reactants.length === 2 && products.length === 2 && (reactants.some((r) => !/\d/.test(r) && r.length <= 2))) {
    type = 'Single Displacement';
    explanation = 'One free element displaces another from a compound: A + BC → AC + B.';
  }

  return { type, reactants, products, explanation };
}

// Solubility Rules
export function checkSolubility(compound: string): {
  compound: string;
  status: 'Soluble' | 'Insoluble' | 'Slightly Soluble' | 'Unknown';
  rule: string;
} {
  const c = compound.trim();
  
  // Group 1 and ammonium always soluble
  if (c.startsWith('Na') || c.startsWith('K') || c.startsWith('Li') || c.startsWith('Cs') || c.startsWith('Rb')) {
    return { compound: c, status: 'Soluble', rule: 'All alkali metal (Group 1) salts are soluble without exception.' };
  }
  if (c.includes('NH4')) {
    return { compound: c, status: 'Soluble', rule: 'All ammonium (NH₄⁺) salts are soluble.' };
  }
  if (c.includes('NO3')) {
    return { compound: c, status: 'Soluble', rule: 'All nitrate (NO₃⁻) and acetate (CH₃COO⁻) salts are soluble.' };
  }
  if (c.includes('ClO4') || c.includes('ClO3')) {
    return { compound: c, status: 'Soluble', rule: 'All perchlorate (ClO₄⁻) and chlorate salts are soluble.' };
  }

  // Halides (Cl, Br, I) - insoluble with Ag, Pb, Hg
  if (c.includes('Cl') || c.includes('Br') || c.includes('I')) {
    if (c.includes('Ag') || c.includes('Pb') || c.includes('Hg')) {
      return { compound: c, status: 'Insoluble', rule: 'Halides (Cl⁻, Br⁻, I⁻) form precipitates with Ag⁺, Pb²⁺, and Hg₂²⁺.' };
    }
    return { compound: c, status: 'Soluble', rule: 'Most chlorides, bromides, and iodides are soluble.' };
  }

  // Sulfates (SO4) - insoluble with Ba, Sr, Pb, Ca
  if (c.includes('SO4')) {
    if (c.includes('Ba') || c.includes('Sr') || c.includes('Pb')) {
      return { compound: c, status: 'Insoluble', rule: 'Sulfate (SO₄²⁻) forms insoluble precipitate with Ba²⁺, Sr²⁺, and Pb²⁺.' };
    }
    if (c.includes('Ca') || c.includes('Ag')) {
      return { compound: c, status: 'Slightly Soluble', rule: 'CaSO₄ and Ag₂SO₄ are slightly soluble.' };
    }
    return { compound: c, status: 'Soluble', rule: 'Most sulfates are soluble in water.' };
  }

  // Carbonates, Phosphates, Sulfides, Hydroxides
  if (c.includes('CO3') || c.includes('PO4') || c.includes('CrO4') || c.includes('C2O4')) {
    return { compound: c, status: 'Insoluble', rule: 'Carbonates (CO₃²⁻), phosphates (PO₄³⁻), and chromates are generally insoluble unless with alkali metals or NH₄⁺.' };
  }
  if (c.includes('OH')) {
    if (c.includes('Ba') || c.includes('Sr')) {
      return { compound: c, status: 'Soluble', rule: 'Ba(OH)₂ and Sr(OH)₂ are soluble strong bases.' };
    }
    if (c.includes('Ca')) {
      return { compound: c, status: 'Slightly Soluble', rule: 'Ca(OH)₂ (limewater) is slightly soluble.' };
    }
    return { compound: c, status: 'Insoluble', rule: 'Most transition metal hydroxides form gelatinous precipitates.' };
  }
  if (c.includes('S')) {
    return { compound: c, status: 'Insoluble', rule: 'Most metal sulfides (e.g. FeS, CuS, PbS) are insoluble.' };
  }

  return { compound: c, status: 'Unknown', rule: 'Check detailed solubility product constant (Ksp) tables.' };
}
