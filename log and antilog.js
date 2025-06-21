import {
  antilog,
  applyPowerToLog,
  formatManualLog,
  logarithm,
  simpleNumbersToBarForm,
} from "./func/index.js";

function calculate() {
  let resultDiv = document.querySelector(".result");
  document.querySelector(".resultBox").style.height = "fit-content";

  const multiplyTerms = document.querySelector("#multiply").value.split(",");
  multiplyTerms[0] === "" ? (multiplyTerms[0] = "1^1") : multiplyTerms; // If user doesn't provide any terms, default to 1^1
  const divideTerms = document.querySelector("#divide").value.split(",");
  divideTerms[0] === "" ? (divideTerms[0] = "1^1") : divideTerms; // If user doesn't provide any terms, default to 1^1

  let isMultiplyNegative, isDivideNegative;
  isMultiplyNegative = isDivideNegative = false;
  let multiplyResult, divideResult;
  multiplyResult = divideResult = 0;
  let steps = { mul1: "", mul2: "", mul3: "", div1: "", div2: "", div3: "" };

  for (let i = 0; i < multiplyTerms.length; i++) {
    let [num, power] = multiplyTerms[i].split("^").map(parseFloat);
    power = power || 1; // Default power to 1 if not specified
    if (num < 1) {
      num = Math.abs(num); // Ensure the number is positive for logarithm
      isMultiplyNegative = !isMultiplyNegative;
    }
    const logStr = formatManualLog(num);
    const finalLog = applyPowerToLog(logStr, power);
    const prefix = i !== 0 ? "+" : "";

    steps.mul1 += `${prefix}<p class="log">log</p><p class="round-brac">(</p><span class="number">${num}<sup>${power}</sup></span><p class="round-brac">)</p>`;
    steps.mul2 += `${prefix}<p class="round-brac">(</p><span class="power">${power}</span>*<span class="number">${logStr}</span><p class="round-brac">)</p>`;
    steps.mul3 += `${prefix}<p class="round-brac">(</p><span class="number">${finalLog}</span><p class="round-brac">)</p>`;
    multiplyResult += parseFloat(logarithm(num, power));
  }

  for (let i = 0; i < divideTerms.length; i++) {
    let [num, power] = divideTerms[i].split("^").map(parseFloat);
    power = power || 1; // Default power to 1 if not specified
    if (num < 1) {
      num = Math.abs(num); // Ensure the number is positive for logarithm
      isDivideNegative = !isDivideNegative;
    }
    const logStr = formatManualLog(num);
    const finalLog = applyPowerToLog(logStr, power);
    const prefix = i !== 0 ? "+" : "";
    steps.div1 += `${prefix}<p class="log">log</p><p class="round-brac">(</p><span class="number">${num}<sup>${power}</sup></span><p class="round-brac">)</p>`;
    steps.div2 += `${prefix}<p class="round-brac">(</p><span class="power">${power}</span>*<span class="number">${logStr}</span><p class="round-brac">)</p>`;
    steps.div3 += `${prefix}<p class="round-brac">(</p><span class="number">${finalLog}</span><p class="round-brac">)</p>`;

    divideResult += parseFloat(logarithm(num, power));
  }

  const finalResult = multiplyResult - divideResult;
  let FinalNegative = "";
  if (
    (!isMultiplyNegative && isDivideNegative) ||
    (isMultiplyNegative && !isDivideNegative)
  ) {
    FinalNegative = "<span class='result-value'>-</span>";
  }

  const finalHTML = `
    ${FinalNegative}<span class="antilog-text">a.log</span><span class="curly-brac">{</span><p class="sqaure-brac">[</p>${
    steps.mul1
  }<p class="sqaure-brac">]</p> - <p class="sqaure-brac">[</p>${
    steps.div1
  }<p class="sqaure-brac">]</p><span class="curly-brac">}</span><br>
    = ${FinalNegative}<span class="antilog-text">a.log</span><span class="curly-brac">{</span><p class="sqaure-brac">[</p>${
    steps.mul2
  }<p class="sqaure-brac">]</p> - <p class="sqaure-brac">[</p>${
    steps.div2
  }<p class="sqaure-brac">]</p><span class="curly-brac">}</span><br>
    = ${FinalNegative}<span class="antilog-text">a.log</span><span class="curly-brac">{</span><p class="sqaure-brac">[</p>${
    steps.mul3
  }<p class="sqaure-brac">]</p> - <p class="sqaure-brac">[</p>${
    steps.div3
  }<p class="sqaure-brac">]</p><span class="curly-brac">}</span><br>
    = ${FinalNegative}<span class="antilog-text">a.log</span><p class="round-brac">(</p><span class="number">${simpleNumbersToBarForm(
    finalResult
  )}</span><p class="round-brac">)</p><br>
    = ${FinalNegative}<span class="result-value">${antilog(
    finalResult
  )}</span>`;

  resultDiv.innerHTML = finalHTML;
  // Render the MathJax
  MathJax.typeset();
}

const calculateButton = document.getElementById("calculate-btn");
calculateButton.addEventListener("click", () => {
  calculate();
});
