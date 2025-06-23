export default function parseAngleSymbolic(input) {
  input = input.trim().toLowerCase().replace(/π/g, "pi");

  // Match symbolic pi expressions (3pi, pi/2, etc.)
  const piExprMatch = input.match(
    /^(-?\d*\.?\d*)\s*pi\s*(?:\/\s*(-?\d+))?\s*(rad)?$/
  );
  if (piExprMatch) {
    const coeffRaw = piExprMatch[1];
    const denomRaw = piExprMatch[2];

    const coeff =
      coeffRaw === "" || coeffRaw === "-" ? `${coeffRaw}1` : coeffRaw;
    const denom = denomRaw ? denomRaw : "1";

    const numeric = (parseFloat(coeff) * Math.PI) / parseFloat(denom);
    const symbolic = `${coeff === "1" ? "" : coeff}π${
      denom !== "1" ? "/" + denom : ""
    }`;
    return { symbolic, numeric };
  }

  // Match degrees like "45deg"
  const degMatch = input.match(/^(-?\d+(\.\d+)?)\s*deg$/);
  if (degMatch) {
    const deg = parseFloat(degMatch[1]);
    const rad = (deg * Math.PI) / 180;
    return { symbolic: `${deg}°`, numeric: rad };
  }

  // Match raw radians like "1.57rad"
  const radMatch = input.match(/^(-?\d+(\.\d+)?)\s*rad$/);
  if (radMatch) {
    const val = parseFloat(radMatch[1]);
    return { symbolic: `${val} rad`, numeric: val };
  }

  // Match raw number
  const floatMatch = input.match(/^(-?\d+(\.\d+)?)$/);
  if (floatMatch) {
    const val = parseFloat(floatMatch[1]);
    return { symbolic: `${val} rad`, numeric: val };
  }
}
