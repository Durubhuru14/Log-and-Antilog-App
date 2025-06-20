function decimalConverter(floatNum) {
  if (floatNum < 1) {
    const multipliers = [10, 100, 1000, 10000];
    for (let i = 0; i < multipliers.length; i++) {
      if (
        floatNum < 1 / Math.pow(10, i) &&
        floatNum >= 1 / Math.pow(10, i + 1)
      ) {
        return (floatNum * multipliers[i]).toFixed(4);
      }
    }
  } else if (floatNum > 1) {
    const divisors = [1000, 100, 10, 1];
    for (let i = 0; i < divisors.length; i++) {
      if (floatNum < Math.pow(10, i + 1) && floatNum >= Math.pow(10, i)) {
        return (floatNum / divisors[i]).toFixed(4);
      }
    }
  }
  return floatNum.toFixed(4);
}

function antilog(logValue) {
  return Math.pow(10, logValue).toPrecision(4);
}

function getCharacteristic(number) {
  return Math.floor(Math.log10(Math.abs(number)));
}

function calculate() {
  const multiplyInput = document.querySelector("#multiply").value;
  const divideInput = document.querySelector("#divide").value;
  const resultDiv = document.querySelector(".result");
  document.querySelector(".resultBox").style.height = "fit-content";

  let multiplyResult = 0;
  let multiplyStrings = { step1: "", step2: "", step3: "" };

  multiplyInput.split(",").forEach((term, index) => {
    const [num, power] = term.split("^").map(parseFloat);
    const rawLog = Math.log10(num);
    const characteristic = Math.floor(rawLog);
    const mantissa = rawLog - characteristic;
    const fullLog = rawLog.toFixed(4);

    // Step 1
    multiplyStrings.step1 += `${
      index !== 0 ? "+" : ""
    }<p class="log">log</p><p class="round-brac">(</p><span class="number">${num}<sup>${power}</sup></span><p class="round-brac">)</p>`;

    // Step 2: power × (char + mantissa)
    multiplyStrings.step2 += `${
      index !== 0 ? "+" : ""
    }<p class="round-brac">(</p><span class="power">${power}</span>*<span class="number">${characteristic}+${mantissa.toFixed(
      4
    )}</span><p class="round-brac">)</p>`;

    // Step 3: power * char + power * mantissa = final log
    const poweredMantissa = mantissa * power;
    const totalCharacteristic =
      characteristic * power + Math.floor(poweredMantissa);
    const totalMantissa = (poweredMantissa % 1).toFixed(4);
    const totalLog = `${totalCharacteristic}.${totalMantissa.slice(2)}`;
    multiplyStrings.step3 += `${
      index !== 0 ? "+" : ""
    }<p class="round-brac">(</p><span class="number">${totalLog}</span><p class="round-brac">)</p>`;

    multiplyResult += rawLog * power;
  });

  let divideResult = 0;
  let divideStrings = { step1: "", step2: "", step3: "" };

  divideInput.split(",").forEach((term, index) => {
    const [num, power] = term.split("^").map(parseFloat);
    const rawLog = Math.log10(num);
    const characteristic = Math.floor(rawLog);
    const mantissa = rawLog - characteristic;
    const fullLog = rawLog.toFixed(4);

    // Step 1
    divideStrings.step1 += `${
      index !== 0 ? "+" : ""
    }<p class="log">log</p><p class="round-brac">(</p><span class="number">${num}<sup>${power}</sup></span><p class="round-brac">)</p>`;

    // Step 2
    divideStrings.step2 += `${
      index !== 0 ? "+" : ""
    }<p class="round-brac">(</p><span class="power">${power}</span>*<span class="number">${characteristic}+${mantissa.toFixed(
      4
    )}</span><p class="round-brac">)</p>`;

    // Step 3
    const poweredMantissa = mantissa * power;
    const totalCharacteristic =
      characteristic * power + Math.floor(poweredMantissa);
    const totalMantissa = (poweredMantissa % 1).toFixed(4);
    const totalLog = `${totalCharacteristic}.${totalMantissa.slice(2)}`;
    divideStrings.step3 += `${
      index !== 0 ? "+" : ""
    }<p class="round-brac">(</p><span class="number">${totalLog}</span><p class="round-brac">)</p>`;

    divideResult += rawLog * power;
  });

  const finalResult = multiplyResult - divideResult;

  const finalString = `
    <span class="antilog-text">a.log</span><span class="curly-brac">{</span><p class="sqaure-brac">[</p>${
      multiplyStrings.step1
    }<p class="sqaure-brac">]</p> - <p class="sqaure-brac">[</p>${
    divideStrings.step1
  }<p class="sqaure-brac">]</p><span class="curly-brac">}</span></br>
    = <span class="antilog-text">a.log</span><span class="curly-brac">{</span><p class="sqaure-brac">[</p>${
      multiplyStrings.step2
    }<p class="sqaure-brac">]</p> - <p class="sqaure-brac">[</p>${
    divideStrings.step2
  }<p class="sqaure-brac">]</p><span class="curly-brac">}</span></br>
    = <span class="antilog-text">a.log</span><span class="curly-brac">{</span><p class="sqaure-brac">[</p>${
      multiplyStrings.step3
    }<p class="sqaure-brac">]</p> - <p class="sqaure-brac">[</p>${
    divideStrings.step3
  }<p class="sqaure-brac">]</p><span class="curly-brac">}</span></br>
    = <span class="antilog-text">a.log</span><p class="round-brac">(</p><span class="number">${finalResult.toFixed(
      4
    )}</span><p class="round-brac">)</p></br>
    = <span class="result-value">${antilog(finalResult)}</span>`;

  resultDiv.innerHTML = finalString;
}

function setBodySizeToViewport() {
  const windowHeight =
    window.innerHeight ||
    document.documentElement.clientHeight ||
    document.body.clientHeight;
  const windowWidth =
    window.innerWidth ||
    document.documentElement.clientWidth ||
    document.body.clientWidth;
  document.body.style.height = `${windowHeight}px`;
  document.body.style.width = `${windowWidth}px`;
}

setBodySizeToViewport();
