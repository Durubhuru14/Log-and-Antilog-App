import { parseAngleSymbolic, formatAsSymbolicPi } from "./index.js";

export default function evaluateTrigFunction(input) {
  input = input.trim().toLowerCase();

  const fnMatch = input.match(
    /^(sin|cos|tan|asin|acos|atan|sin\^-1|cos\^-1|tan\^-1)\s*\(\s*(.*?)\s*\)(?:\^(\d+))?$/
  );

  let [, fn, valueRaw] = fnMatch;

  const inverseMap = {
    "sin^-1": "asin",
    "cos^-1": "acos",
    "tan^-1": "atan",
  };
  fn = inverseMap[fn] || fn;

  const { symbolic, numeric } = parseAngleSymbolic(valueRaw);

  let result, inverseOutput;
  if (fn === "sin") result = Math.sin(numeric);
  else if (fn === "cos") result = Math.cos(numeric);
  else if (fn === "tan") result = Math.tan(numeric);
  else if (fn === "asin") {
    result = Math.asin(numeric);
    inverseOutput = formatAsSymbolicPi(result);
  } else if (fn === "acos") {
    result = Math.acos(numeric);
    inverseOutput = formatAsSymbolicPi(result);
  } else if (fn === "atan") {
    result = Math.atan(numeric);
    inverseOutput = formatAsSymbolicPi(result);
  }

  // Round near-zero results to exactly zero
  const EPSILON = 1e-12;
  if (Math.abs(result) < EPSILON) {
    result = 0;
  }

  // Converts degrees to radians if necessary
  if (valueRaw.includes("deg")) {
    fn = `${fn}(${formatAsSymbolicPi(numeric.toFixed(4))} rad)`;
  } else {
    fn = `${fn}(${symbolic})`;
  }

  return {
    fn: fn,
    result: parseFloat(result.toFixed(4)),
    inverseOutput,
  };
}
