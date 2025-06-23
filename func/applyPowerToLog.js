function applyPowerToLog(logStr, power) {
  const hasOverline = logStr.includes("\u0305");

  const cleanedLogStr = logStr.replace(/\u0305/g, "");
  const [c, m] = cleanedLogStr.split(".");

  let charNum = parseInt(c);
  if (hasOverline) {
    charNum *= -1;
  }

  const mant = parseFloat(`0.${m}`) * power;
  const resultChar = charNum * power + Math.floor(mant);
  const resultMant = (mant % 1).toFixed(4).slice(2);

  if (resultChar < 0) {
    return `\u0305${Math.abs(resultChar)}.${resultMant}`;
  }
  return `${resultChar}.${resultMant}`;
}

export default applyPowerToLog;
