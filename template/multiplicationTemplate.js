import {
  applyPowerToLog,
  formatManualLog,
  logarithm,
  evaluateTrigFunction,
} from "../func/index.js";

export default function renderMultiplySteps(multiplyTerms) {
  let steps = { mul1: "", mul2: "", mul3: "", mul4: "" };
  let result = 0;
  let isNegative = false;
  let trigFun = null;

  for (let i = 0; i < multiplyTerms.length; i++) {
    let [num, power] = multiplyTerms[i].split("^").map(parseFloat);
    trigFun = null;
    if (
      multiplyTerms[i].toLowerCase().includes("sin") ||
      multiplyTerms[i].toLowerCase().includes("cos") ||
      multiplyTerms[i].toLowerCase().includes("tan")
    ) {
      const { result: trigResult, fn } = evaluateTrigFunction(multiplyTerms[i]);
      num = trigResult;
      trigFun = fn;
    }
    power = power || 1;

    if (num === 0) {
      // If the number is zero, we can skip further calculations
      return { steps, result: 0, isNegative: false, trigFun };
    }

    if (num < 0) {
      num = Math.abs(num);
      isNegative = !isNegative;
    }

    const logStr = formatManualLog(num);
    const finalLog = applyPowerToLog(logStr, power);
    const prefix = i !== 0 ? "+" : "";

    steps.mul1 += `${prefix}<p class="log">log</p><p class="round-brac">(</p><span class="number">${
      trigFun || num
    }<sup>${power}</sup></span><p class="round-brac">)</p>`;
    steps.mul2 += `${prefix}<p class="log">log</p><p class="round-brac">(</p><span class="number">${num}<sup>${power}</sup></span><p class="round-brac">)</p>`;
    steps.mul3 += `${prefix}<p class="round-brac">(</p><span class="power">${power}</span>*<span class="number">${logStr}</span><p class="round-brac">)</p>`;
    steps.mul4 += `${prefix}<p class="round-brac">(</p><span class="number">${finalLog}</span><p class="round-brac">)</p>`;

    result += parseFloat(logarithm(num, power));
  }

  return { steps, result, isNegative, trigFun };
}
