import {
  applyPowerToLog,
  formatManualLog,
  logarithm,
  evaluateTrigFunction,
} from "../func/index.js";

export default function renderDivideSteps(divideTerms) {
  let steps = { div1: "", div2: "", div3: "", div4: "" };
  let result = 0;
  let isNegative = false;
  let trigFun = null;

  // early return if (divideTerms.length === 0)
  if (divideTerms[0] === "" && divideTerms.length === 1)
    return { steps, result, isNegative };

  for (let i = 0; i < divideTerms.length; i++) {
    let [num, power] = divideTerms[i].split("^").map(parseFloat);
    trigFun = null;
    let radianFormat;
    if (
      divideTerms[i].toLowerCase().includes("sin") ||
      divideTerms[i].toLowerCase().includes("cos") ||
      divideTerms[i].toLowerCase().includes("tan")
    ) {
      const { result: trigResult, fn } = evaluateTrigFunction(divideTerms[i]);
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

    steps.div1 += `${prefix}<p class="log">log</p><p class="round-brac">(</p><span class="number">${
      trigFun || num
    }<sup>${power}</sup></span><p class="round-brac">)</p>`;
    steps.div2 += `${prefix}<p class="log">log</p><p class="round-brac">(</p><span class="number">${num}<sup>${power}</sup></span><p class="round-brac">)</p>`;
    steps.div3 += `${prefix}<p class="round-brac">(</p><span class="power">${power}</span>*<span class="number">${logStr}</span><p class="round-brac">)</p>`;
    steps.div4 += `${prefix}<p class="round-brac">(</p><span class="number">${finalLog}</span><p class="round-brac">)</p>`;

    result += parseFloat(logarithm(num, power));
  }

  if (divideTerms.length === 1) steps.div4 = "";
  return { steps, result, isNegative, trigFun };
}
