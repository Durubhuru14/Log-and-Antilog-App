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

function antilog(logValue) {
  return Math.pow(10, logValue).toPrecision(4);
}

function getCharacteristic(number) {
  return Math.floor(Math.log10(Math.abs(number)));
}

function logarithm(num, power = 1) {
  return Math.log10(Math.pow(num, power)).toFixed(4);
}

function simpleNumbersToBarForm(integer) {
  if (integer < 0) {
    for (let i = 1; i <= 4; i++) {
      if (integer + i > 0 && integer + i < 1) {
        return -1 * (integer + 2 * i);
      }
    }
  }
  return integer;
}

function formatManualLog(num) {
  const characteristic = getCharacteristic(num);
  const converted = parseFloat(decimalConverter(num));
  const mantissa = Math.log10(converted).toFixed(4).toString().split(".")[1];
  return `${characteristic}.${mantissa}`;
}

function applyPowerToLog(logStr, power) {
  const [c, m] = logStr.split(".");
  console.log(c, m);
  const mant = parseFloat(`0.${m}`) * power;
  console.log(mant);
  const resultChar = parseInt(c) * power + Math.floor(mant);
  console.log(resultChar);
  const resultMant = (mant % 1).toFixed(4).slice(2);
  console.log(resultMant);
  return `${resultChar}.${resultMant}`;
}

function calculate() {
  let resultDiv = document.querySelector(".result");
  document.querySelector(".resultBox").style.height = "fit-content";

  const multiplyTerms = document.querySelector("#multiply").value.split(",");
  const divideTerms = document.querySelector("#divide").value.split(",");

  let multiplyResult = 0,
    divideResult = 0;
  let steps = { mul1: "", mul2: "", mul3: "", div1: "", div2: "", div3: "" };

  for (let i = 0; i < multiplyTerms.length; i++) {
    let [num, power] = multiplyTerms[i].split("^").map(parseFloat);
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
    const logStr = formatManualLog(num);
    const finalLog = applyPowerToLog(logStr, power);
    const prefix = i !== 0 ? "+" : "";

    steps.div1 += `${prefix}<p class="log">log</p><p class="round-brac">(</p><span class="number">${num}<sup>${power}</sup></span><p class="round-brac">)</p>`;
    steps.div2 += `${prefix}<p class="round-brac">(</p><span class="power">${power}</span>*<span class="number">${logStr}</span><p class="round-brac">)</p>`;
    steps.div3 += `${prefix}<p class="round-brac">(</p><span class="number">${finalLog}</span><p class="round-brac">)</p>`;

    divideResult += parseFloat(logarithm(num, power));
  }

  const finalResult = multiplyResult - divideResult;
  const finalHTML = `
    <span class="antilog-text">a.log</span><span class="curly-brac">{</span><p class="sqaure-brac">[</p>${
      steps.mul1
    }<p class="sqaure-brac">]</p> - <p class="sqaure-brac">[</p>${
    steps.div1
  }<p class="sqaure-brac">]</p><span class="curly-brac">}</span><br>
    = <span class="antilog-text">a.log</span><span class="curly-brac">{</span><p class="sqaure-brac">[</p>${
      steps.mul2
    }<p class="sqaure-brac">]</p> - <p class="sqaure-brac">[</p>${
    steps.div2
  }<p class="sqaure-brac">]</p><span class="curly-brac">}</span><br>
    = <span class="antilog-text">a.log</span><span class="curly-brac">{</span><p class="sqaure-brac">[</p>${
      steps.mul3
    }<p class="sqaure-brac">]</p> - <p class="sqaure-brac">[</p>${
    steps.div3
  }<p class="sqaure-brac">]</p><span class="curly-brac">}</span><br>
    = <span class="antilog-text">a.log</span><p class="round-brac">(</p><span class="number">${simpleNumbersToBarForm(
      finalResult
    ).toFixed(4)}</span><p class="round-brac">)</p><br>
    = <span class="result-value">${antilog(finalResult)}</span>`;

  resultDiv.innerHTML = finalHTML;
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
