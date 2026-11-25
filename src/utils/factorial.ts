/**
 * High-Precision Factorial & Super-Factorial Engine
 * Supports:
 * 1. Exact factorials generating 100+, 1,000+, 10,000+, and up to 35,000+ exact digits.
 * 2. Asymptotic Stirling-Ramanujan factorial for astronomical inputs (up to 100-digit numbers n ~ 10^100).
 * 3. Exact Legendre's formula for trailing zeros (n - S_5(n)) / 4, exact even for 100-digit inputs.
 * 4. Double factorials (n!!) for both even factorials (2k)!! and odd factorials.
 */

export interface FactorialResult {
  n: string;
  exactString: string;
  digitCount: string;
  trailingZeros: string;
  scientificNotation: string;
  isLarge: boolean;
  isApproximate?: boolean;
  isDoubleFactorial?: boolean;
  orderOfMagnitude?: string;
  note?: string;
}

// Fast divide-and-conquer binary splitting product range
function productRange(a: bigint, b: bigint): bigint {
  if (a > b) return 1n;
  if (a === b) return a;
  if (b - a === 1n) return a * b;
  const mid = (a + b) / 2n;
  return productRange(a, mid) * productRange(mid + 1n, b);
}

// Step-2 product range for double factorial (n!!)
function productRangeStep2(a: bigint, b: bigint): bigint {
  if (a > b) return 1n;
  if (a === b) return a;
  const count = (b - a) / 2n + 1n;
  if (count <= 2n) {
    let res = 1n;
    for (let cur = a; cur <= b; cur += 2n) res *= cur;
    return res;
  }
  const midCount = count / 2n;
  const mid = a + (midCount - 1n) * 2n;
  return productRangeStep2(a, mid) * productRangeStep2(mid + 2n, b);
}

/**
 * Calculates EXACT number of trailing zeros in n! using Legendre's Formula:
 * Z(n) = (n - S_5(n)) / 4
 * where S_5(n) is the sum of digits of n in base 5.
 * This runs in O(log_5 n) time and gives exact results even for 100-digit inputs!
 */
export function countTrailingZeros(n: bigint): string {
  if (n < 5n) return '0';
  const base5Str = n.toString(5);
  let digitSum = 0n;
  for (let i = 0; i < base5Str.length; i++) {
    digitSum += BigInt(base5Str.charCodeAt(i) - 48); // '0' is char code 48
  }
  const zeros = (n - digitSum) / 4n;
  return zeros.toString();
}

/**
 * Computes Stirling-Ramanujan approximation for astronomical inputs (n > 10,000 up to 100-digit numbers)
 */
function computeAstronomicalFactorial(nBig: bigint, isDouble: boolean = false): FactorialResult {
  const nStr = nBig.toString();
  const numDigitsN = nStr.length;

  // Legendre exact trailing zeros
  const trailingZeros = isDouble 
    ? (nBig % 2n === 0n ? countTrailingZeros(nBig / 2n) : '0')
    : countTrailingZeros(nBig);

  // If n is within standard float range (numDigitsN <= 15)
  if (numDigitsN <= 15) {
    const n = Number(nBig);
    // Stirling approximation for log10(n!)
    // ln(n!) = n*ln(n) - n + 0.5*ln(2*pi*n) + 1/(12n)
    const lnFact = n * Math.log(n) - n + 0.5 * Math.log(2 * Math.PI * n) + 1 / (12 * n);
    const log10Fact = lnFact / Math.LN10;
    const exponent = Math.floor(log10Fact);
    const mantissa = Math.pow(10, log10Fact - exponent);
    const totalDigits = (exponent + 1).toString();
    const sci = `${mantissa.toFixed(8)} × 10^${exponent}`;

    return {
      n: isDouble ? `${nStr}!!` : nStr,
      exactString: `${sci} (${totalDigits} digits)`,
      digitCount: totalDigits,
      trailingZeros,
      scientificNotation: sci,
      isLarge: true,
      isApproximate: true,
      note: `Calculated via Ramanujan-Stirling asymptotic expansion (${totalDigits} digits)`,
    };
  }

  // When n is a giant number (up to 100 digits! e.g. n >= 10^16 to 10^100)
  // log10(n!) ~ n * (log10(n) - log10(e)) = n * (log10(n) - 0.4342944819)
  // Let n = M * 10^(E-1), where E is numDigitsN
  const leading10Digits = parseFloat(nStr.slice(0, 10)) / 1e9; // 1.xxxxxxx
  const E = numDigitsN - 1;
  const log10N = E + Math.log10(leading10Digits);
  const log10E = 0.4342944819032518;
  const factor = log10N - log10E; // (log10(n) - log10(e))

  // Exponent of n! is approximately n * factor
  // Represent exponent as scientific notation:
  // exponent = (M * factor) * 10^E
  const expLeading = leading10Digits * factor;
  let expPower = E;
  let normalizedExpLeading = expLeading;
  if (normalizedExpLeading >= 10) {
    normalizedExpLeading /= 10;
    expPower += 1;
  }

  const expString = `${normalizedExpLeading.toFixed(5)} × 10^${expPower}`;
  const scientificNotation = `10^(${expString})`;
  const digitCount = `~ ${expString}`;

  return {
    n: isDouble ? `${nStr}!!` : nStr,
    exactString: `${scientificNotation} (~${expString} digits)`,
    digitCount,
    trailingZeros,
    scientificNotation,
    isLarge: true,
    isApproximate: true,
    orderOfMagnitude: `10^${expPower}`,
    note: `100-digit scale super-factorial (${numDigitsN}-digit input n)`,
  };
}

/**
 * Main High-Performance Factorial Function
 * Supports:
 * - Exact factorials up to 10,000! (produces up to 35,660 exact digits)
 * - Astronomical factorials for inputs with up to 100 digits (n <= 10^100)
 * - Double factorials n!! (even and odd)
 */
export function calculateExactFactorial(nInput: number | bigint | string): FactorialResult {
  const cleanInput = nInput.toString().trim();
  const isDouble = cleanInput.endsWith('!!');
  const numericPart = cleanInput.replace(/!/g, '').trim();

  let n: bigint;
  try {
    n = BigInt(numericPart);
  } catch {
    throw new Error('Invalid integer for factorial');
  }

  if (n < 0n) {
    throw new Error('Factorial requires a non-negative integer');
  }

  // If input itself has more than 100 digits, provide bound safeguard
  if (n.toString().length > 105) {
    throw new Error('Factorial input exceeds 100 digits (maximum limit: 10^100)');
  }

  // For astronomical inputs (n > 10,000, up to 100-digit integers):
  if (n > 10000n) {
    return computeAstronomicalFactorial(n, isDouble);
  }

  // Exact Computation for n <= 10,000
  let exactString: string;
  if (isDouble) {
    if (n === 0n || n === 1n) {
      exactString = '1';
    } else {
      const start = (n % 2n === 0n) ? 2n : 1n;
      exactString = productRangeStep2(start, n).toString();
    }
  } else {
    if (n === 0n || n === 1n) {
      exactString = '1';
    } else {
      exactString = productRange(2n, n).toString();
    }
  }

  const digitCount = exactString.length;
  const trailingZeros = isDouble
    ? (n % 2n === 0n ? countTrailingZeros(n / 2n) : '0')
    : countTrailingZeros(n);

  // Build scientific notation preview
  let scientificNotation: string;
  if (digitCount <= 14) {
    scientificNotation = exactString;
  } else {
    const lead = exactString.slice(0, 1) + '.' + exactString.slice(1, 10);
    const exponent = digitCount - 1;
    scientificNotation = `${lead} × 10^${exponent}`;
  }

  return {
    n: isDouble ? `${n.toString()}!!` : n.toString(),
    exactString,
    digitCount: digitCount.toString(),
    trailingZeros,
    scientificNotation,
    isLarge: digitCount > 20,
    isDoubleFactorial: isDouble,
    note: digitCount >= 100 ? `Exact calculation with ${digitCount} digits` : undefined,
  };
}

/**
 * Formats a huge number string with spaces every `groupSize` digits for easy verification
 */
export function formatLargeNumber(str: string, groupSize: number = 5): string {
  if (str.length <= groupSize) return str;
  const chunks: string[] = [];
  for (let i = 0; i < str.length; i += groupSize) {
    chunks.push(str.slice(i, i + groupSize));
  }
  return chunks.join(' ');
}
