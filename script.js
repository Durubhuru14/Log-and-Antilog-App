import { antilog, simpleNumbersToBarForm } from "./func/index.js";
import { renderMultiplySteps, renderDivideSteps } from "./template/index.js";

function calculate() {
  let resultDiv = document.querySelector(".result");
  document.querySelector(".resultBox").style.height = "fit-content";

  console.log(document.querySelector("#multiply").value)
    console.log(document.querySelector("#divide").value)

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

  // Check if both the array has only 1 term if yes then skip 4th step
  if (divideTerms.length === 1 && multiplyTerms.length === 1) {
    divSteps.div4 = "";
    mulSteps.mul4 = "";
  }

  const mulResultBarForm = simpleNumbersToBarForm(
    parseFloat(mulResult.toFixed(4))
  );
  const divResultBarForm = simpleNumbersToBarForm(
    parseFloat(divResult.toFixed(4))
  );
  const finalResultBarForm = simpleNumbersToBarForm(
    parseFloat(finalResult.toFixed(4))
  );

  const formatStep = (mul, div) => {
    if (!mul && !div) return "";

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

  ${
    mulTrigFun || divTrigFun
      ? `= ${FinalNegative}<span class="antilog-text">a.log</span><span class="curly-brac">{</span>${formatStep(
          mulSteps.mul2,
          divSteps.div2
        )}<span class="curly-brac">}</span><br>`
      : ""
  }

  = ${FinalNegative}<span class="antilog-text">a.log</span><span class="curly-brac">{</span>${formatStep(
    mulSteps.mul3,
    divSteps.div3
  )}<span class="curly-brac">}</span><br>

  ${
    mulSteps.mul4 || divSteps.div4
      ? `
    = ${FinalNegative}<span class="antilog-text">a.log</span><span class="curly-brac">{</span>${formatStep(
          mulSteps.mul4,
          divSteps.div4
        )}<span class="curly-brac">}</span><br>
  `
      : ""
  }

  ${
    divResult === 0
      ? ""
      : `= ${FinalNegative}<span class="antilog-text">a.log</span><span class="curly-brac">{</span>${formatStep(
          `<span class='number'>${mulResultBarForm}</span>`,
          `<span class='number'>${divResultBarForm}</span>`
        )}<span class="curly-brac">}</span><br>`
  }

  = ${FinalNegative}<span class="antilog-text">a.log</span><p class="round-brac">(</p><span class="number">${finalResultBarForm}</span><p class="round-brac">)</p><br>

  = ${FinalNegative}<span class="result-value">${antilog(finalResult)}</span>`;

  resultDiv.innerHTML = finalHTML;
}

const calculateButton = document.getElementById("calculate-btn");
calculateButton.addEventListener("click", () => {
  calculate();
});
