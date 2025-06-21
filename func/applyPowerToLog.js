function applyPowerToLog(logStr, power) {
  let c, m;

  // Remove LaTeX wrappers and spaces
  const cleaned = logStr
    .replace(/^\$|\\overline{|\}|\$/g, '') // removes $, \overline{, and }
    .replace(/\s/g, ''); // remove spaces

  if (logStr.includes('\\overline{')) {
    [c, m] = cleaned.split(".");
    c = -parseInt(c);
  } else {
    [c, m] = cleaned.split(".");
    c = parseInt(c);
  }

  const mant = parseFloat(`0.${m}`) * power;
  const resultChar = c * power + Math.floor(mant);
  const resultMant = (mant % 1).toFixed(4).slice(2);

  if (resultChar < 0) {
    return `$\\overline{${Math.abs(resultChar)}}.${resultMant}$`;
  }
  return `${resultChar}.${resultMant}`;
}

export default applyPowerToLog;