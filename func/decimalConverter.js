function decimalConverter(floatNum) {
  if (floatNum < 1) {
    if (floatNum >= 0.1) return (floatNum * 10).toFixed(4);
    if (floatNum >= 0.01) return (floatNum * 100).toFixed(4);
    if (floatNum >= 0.001) return (floatNum * 1000).toFixed(4);
    if (floatNum >= 0.0001) return (floatNum * 10000).toFixed(4);
  } else if (floatNum >= 1) {
    if (floatNum < 10) return floatNum.toFixed(4);
    if (floatNum < 100) return (floatNum / 10).toFixed(4);
    if (floatNum < 1000) return (floatNum / 100).toFixed(4);
    if (floatNum < 10000) return (floatNum / 1000).toFixed(4);
  }
  return floatNum.toFixed(4);
}

export default decimalConverter;