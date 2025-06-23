export default function formatAsSymbolicPi(val, tolerance = 1e-3) {
  const PI = Math.PI;
  const knownAngles = {
    [PI / 6]: "π/6",
    [PI / 4]: "π/4",
    [PI / 3]: "π/3",
    [PI / 2]: "π/2",
    [PI]: "π",
    [(2 * PI) / 3]: "2π/3",
    [(3 * PI) / 4]: "3π/4",
    [(3 * PI) / 2]: "3π/2",
    [(5 * PI) / 6]: "5π/6",
    [2 * PI]: "2π",
    [(7 * PI) / 4]: "7π/4",
  };

  const valFloat = parseFloat(val);

  for (const radStr of Object.keys(knownAngles)) {
    const rad = parseFloat(radStr); // keys are strings
    if (Math.abs(valFloat - rad) < tolerance) {
      return knownAngles[radStr];
    }
  }

  return valFloat.toFixed(4); // fallback to decimal string
}
