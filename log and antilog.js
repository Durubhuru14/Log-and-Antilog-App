// Helper function to convert a float to a fixed decimal format
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

// Calculate the antilog of a value
function antilog(logValue) {
    return Math.pow(10, logValue).toPrecision(4);
}

// Get the characteristic (integer part) of the logarithm of a number
function getCharacteristic(number) {
    return Math.floor(Math.log10(Math.abs(number)));
}

// Calculate the logarithm of a number, optionally raised to a power
function logarithm(num, power = 1) {
    return Math.log10(Math.pow(num, power)).toFixed(4);
}

// Convert simple numbers to bar form (used for negative numbers)
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

// Helper function to process logarithmic calculations
function processLogarithmicValue(log, power) {
    const [characteristic, mantissa] = log.split(".");
    const num = parseFloat(`0.${mantissa}`) * power;
    const newCharacteristic =
        parseInt(characteristic) * power + Math.floor(num);
    return `${newCharacteristic}.${(num % 1).toFixed(4).slice(2)}`;
}

// Main calculation function
function calculate() {
    const multiplyInput = document.querySelector("#multiply").value;
    const divideInput = document.querySelector("#divide").value;
    const resultDiv = document.querySelector(".result");
    document.querySelector(".resultBox").style.height = "fit-content";

    // Process multiplication inputs
    let multiplyResult = 0;
    let multiplyStrings = { step1: "", step2: "", step3: "" };
    multiplyInput.split(",").forEach((term, index) => {
        const [num, power] = term.split("^").map(parseFloat);
        const characteristic = getCharacteristic(num);
        const manualLog = logarithm(decimalConverter(num));
        const logValue = `${characteristic}${manualLog.slice(1)}`;

        multiplyStrings.step1 += `${
            index !== 0 ? "+" : ""
        }<p class="log">log</p><p class="round-brac">(</p><span class="number">${num}<sup>${power}</sup></span><p class="round-brac">)</p>`;
        multiplyStrings.step2 += `${
            index !== 0 ? "+" : ""
        }<p class="round-brac">(</p><span class="power">${power}</span>*<span class="number">${logValue}</span><p class="round-brac">)</p>`;
        multiplyStrings.step3 += `${
            index !== 0 ? "+" : ""
        }<p class="round-brac">(</p><span class="number">${processLogarithmicValue(
            logValue,
            power
        )}</span><p class="round-brac">)</p>`;
        multiplyResult += parseFloat(logarithm(num, power));
    });

    // Process division inputs
    let divideResult = 0;
    let divideStrings = { step1: "", step2: "", step3: "" };
    divideInput.split(",").forEach((term, index) => {
        const [num, power] = term.split("^").map(parseFloat);
        const characteristic = getCharacteristic(num);
        const manualLog = logarithm(decimalConverter(num));
        const logValue = `${characteristic}${manualLog.slice(1)}`;

        divideStrings.step1 += `${
            index !== 0 ? "+" : ""
        }<p class="log">log</p><p class="round-brac">(</p><span class="number">${num}<sup>${power}</sup></span><p class="round-brac">)</p>`;
        divideStrings.step2 += `${
            index !== 0 ? "+" : ""
        }<p class="round-brac">(</p><span class="power">${power}</span>*<span class="number">${logValue}</span><p class="round-brac">)</p>`;
        divideStrings.step3 += `${
            index !== 0 ? "+" : ""
        }<p class="round-brac">(</p><span class="number">${processLogarithmicValue(
            logValue,
            power
        )}</span><p class="round-brac">)</p>`;
        divideResult += parseFloat(logarithm(num, power));
    });

    // Calculate final result
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
    = <span class="antilog-text">a.log</span><p class="sqaure-brac">[</p><p class="round-brac">(</p><span class="number">${simpleNumbersToBarForm(
        multiplyResult
    ).toFixed(
        4
    )}</span><p class="round-brac">)</p> - <p class="round-brac">(</p><span class="number">${simpleNumbersToBarForm(
        divideResult
    ).toFixed(
        4
    )}</span><p class="round-brac">)</p><p class="sqaure-brac">]</p></br>
    = <span class="antilog-text">a.log</span><p class="round-brac">(</p><span class="number">${simpleNumbersToBarForm(
        finalResult
    )}</span><p class="round-brac">)</p></br>
    = <span class="result-value">${antilog(finalResult)}</span>`;
    resultDiv.innerHTML = finalString;
}

// Set body size to viewport dimensions
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

// Initialize
setBodySizeToViewport();