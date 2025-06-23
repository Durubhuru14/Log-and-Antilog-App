import { antilog, simpleNumbersToBarForm } from "./func/index.js";
import { renderMultiplySteps, renderDivideSteps } from "./template/index.js";

function calculate() {
  let resultDiv = document.querySelector(".result");
  document.querySelector(".resultBox").style.height = "fit-content";

  const multiplyTerms = document.querySelector("#multiply").value.split(",");
  const divideTerms = document.querySelector("#divide").value.split(",");
  if (multiplyTerms[0] === "") multiplyTerms[0] = "1^1";

  const {
    steps: mulSteps,
    result: mulResult,
    isNegative: isMultiplyNegative,
    trigFun: mulTrigFun,
  } = renderMultiplySteps(multiplyTerms);

  const {
    steps: divSteps,
    result: divResult,
    isNegative: isDivideNegative,
    trigFun: divTrigFun,
  } = renderDivideSteps(divideTerms);

  const mulResultBarForm = simpleNumbersToBarForm(mulResult);
  const divResultBarForm = simpleNumbersToBarForm(divResult);

  let finalResult;
  if (mulResult === 0 && mulTrigFun) {
    finalResult = 0;
    resultDiv.innerHTML = `<span class='result-value'>${finalResult}</span>`;
    return;
  }
  if (divResult === 0 && divTrigFun) {
    finalResult = "Can't divide by zero";
    resultDiv.innerHTML = `<span class='result-value'>${finalResult}</span>`;
    return;
  }
  finalResult = mulResult - divResult;
  let FinalNegative = "";
  if (
    (!isMultiplyNegative && isDivideNegative) ||
    (isMultiplyNegative && !isDivideNegative)
  ) {
    FinalNegative = "<span class='result-value'>-</span>";
  }

  const formatStep = (mul, div) => {
    const mulHTML = `<p class="sqaure-brac">[</p>${mul}<p class="sqaure-brac">]</p>`;
    const divHTML = div
      ? ` - <p class="sqaure-brac">[</p>${div}<p class="sqaure-brac">]</p>`
      : "";
    return `${mulHTML}${divHTML}`;
  };

  const finalHTML = `
  ${FinalNegative}<span class="antilog-text">a.log</span><span class="curly-brac">{</span>${formatStep(
    mulSteps.mul1,
    divSteps.div1
  )}<span class="curly-brac">}</span><br>
  = ${FinalNegative}<span class="antilog-text">a.log</span><span class="curly-brac">{</span>${formatStep(
    mulSteps.mul2,
    divSteps.div2
  )}<span class="curly-brac">}</span><br>
  = ${FinalNegative}<span class="antilog-text">a.log</span><span class="curly-brac">{</span>${formatStep(
    mulSteps.mul3,
    divSteps.div3
  )}<span class="curly-brac">}</span><br>
  = ${FinalNegative}<span class="antilog-text">a.log</span><span class="curly-brac">{</span>${formatStep(
    `<span class='number'>${mulResultBarForm}</span>`,
    `<span class='number'>${divResultBarForm}</span>`,
  )}<span class="curly-brac">}</span><br>
  = ${FinalNegative}<span class="antilog-text">a.log</span><p class="round-brac">(</p><span class="number">${simpleNumbersToBarForm(
    finalResult.toFixed(4)
  )}</span><p class="round-brac">)</p><br>
  = ${FinalNegative}<span class="result-value">${antilog(finalResult.toFixed(4))}</span>`;

  resultDiv.innerHTML = finalHTML;
}

const calculateButton = document.getElementById("calculate-btn");
calculateButton.addEventListener("click", () => {
  calculate();
});
