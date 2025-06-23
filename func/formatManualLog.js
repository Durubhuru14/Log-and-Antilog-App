import getCharacteristic from "./getCharacteristic.js";
import decimalConverter from "./decimalConverter.js";

function formatManualLog(num) {
  const characteristic = getCharacteristic(num);
  const decimalConverted = parseFloat(decimalConverter(num));
  const mantissa = Math.log10(decimalConverted)
    .toFixed(4)
    .toString()
    .split(".")[1];
  if (characteristic < 0) {
    return `\u0305${Math.abs(characteristic)}.${mantissa}`;
  }
  return `${characteristic}.${mantissa}`;
}

export default formatManualLog;
