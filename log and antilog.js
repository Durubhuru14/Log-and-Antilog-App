function decimalConverter(floatNum) {
  if (floatNum < 1) {
    if (floatNum < 1.000 && floatNum >= 0.1) {
      floatNum *= 10
    } else if (floatNum < 0.1 && floatNum >= 0.01) {
      floatNum *= 100
    } else if (floatNum < 0.01 && floatNum >= 0.001) {
      floatNum *= 1000
    } else if (floatNum < 0.001 && floatNum >= 0.0001) {
      floatNum *= 10000
    }
  } else if (floatNum > 1) {
    if (floatNum < 10000 && floatNum >= 1000) {
      floatNum = floatNum / 1000
    } else if (floatNum < 1000 && floatNum >= 100) {
      floatNum = floatNum / 100
    } else if (floatNum < 100 && floatNum >= 10) {
      floatNum = floatNum / 10
    } else if (floatNum < 10 && floatNum >= 10) {
      floatNum = floatNum
    }
  }
  return (floatNum.toFixed(4))
}

function antilog(logValue) {
  return Math.pow(10, logValue).toPrecision(4);
}

function getCharacteristic(number) {
  // Check if the input value is valid
  let n = Math.abs(number)

  // Calculate the base-10 logarithm
  const logarithm = Math.log10(n);

  // Extract the characteristic
  const characteristic = Math.floor(logarithm);

  return characteristic;
}

function logarithm(num, power) {
  if (power == undefined) {
    return Math.log10(num).toFixed(4)
  } else {
    return Math.log10(Math.pow(num, power)).toFixed(4)
  }
}

function simpleNumbersToBarForm(integer) {
  if (integer < 0) {
    if ((integer + 1) > 0 && (integer + 1) < 1) {
      return (-1) * (integer + 2)
    } else if ((integer + 2) > 0 && (integer + 2) < 1) {
      return (-1) * (integer + 4)
    } else if ((integer + 3) > 0 && (integer + 3) < 1) {
      return (-1) * (integer + 6)
    } else if ((integer + 4) > 0 && (integer + 4) < 1) {
      return (-1) * (integer + 8)
    }
  } else {
    return integer
  }
}

function forGodSake(log, power) {
  let arr, num, characteristic, tempArr, tempVar1
  arr = log.split('.')
  num = arr[1]
  num = parseFloat(num) / 10 ** (num.length)
  num = num * power
  characteristic = parseInt(arr[0]) * power
  tempArr = (num.toString()).split('.')
  tempVar1 = parseFloat(tempArr[0])
  characteristic = tempVar1 + characteristic
  return ((num.toString()).replace(tempVar1, characteristic))
}

function calculate() {
  let multiplyString1 = '';
  let multiplyString2 = '';
  let multiplyString3 = '';
  let multiplyResult = 0
  let divideString1 = '';
  let divideString2 = '';
  let divideString3 = '';
  let divideResult = 0;
  let finalResult = 0;
  let finalString = '';
  let resultDiv = document.querySelector('.result')
  document.querySelector('.resultBox').style.height = 'fit-content'
  let multiplyVar = document.querySelector('#multiply').value
  let divideVar = document.querySelector('#divide').value
  let multiplyArr = multiplyVar.split(',')
  for (let i = 0; i < multiplyArr.length; i++) {
    let tempArr = multiplyArr[i].split('^')
    let num = parseFloat(tempArr[0])
    let power = parseFloat(tempArr[1])
    let characteristic = getCharacteristic(num).toString()
    let manualLog = logarithm(decimalConverter(num)).toString()
    if (i !== 0) {
      multiplyString1 += `+<p class="log">log</p><p class="round-brac">(</p><span class="number">${num}<sup>${power}</sup></span><p class="round-brac">)</p>`
      multiplyString2 += `+<p class="round-brac">(</p><span class="power">${power}</span>*<span class="number">${characteristic + manualLog.slice(1)}</span><p class="round-brac">)</p>`
      multiplyString3 += `+<p class="round-brac">(</p><span class="number">${forGodSake(characteristic + manualLog.slice(1),power)}</span><p class="round-brac">)</p>`
    } else {
      multiplyString1 += `<p class="log">log</p><p class="round-brac">(</p><span class="number">${num}<sup>${power}</sup></span><p class="round-brac">)</p>`
      multiplyString2 += `<p class="round-brac">(</p><span class="power">${power}</span>*<span class="number">${manualLog.replace('0',characteristic)}</span><p class="round-brac">)</p>`
      multiplyString3 += `<p class="round-brac">(</p><span class="number">${forGodSake(manualLog.replace('0',characteristic),power)}</span><p class="round-brac">)</p>`
    }
    multiplyResult = parseFloat(logarithm(num, power)) + multiplyResult
  }

  let divideArr = divideVar.split(',')

  for (let i = 0; i < divideArr.length; i++) {
    let tempArr = divideArr[i].split('^')
    let num = parseFloat(tempArr[0])
    let power = parseFloat(tempArr[1])
    let characteristic = getCharacteristic(num).toString()
    let manualLog = logarithm(decimalConverter(num)).toString()
    if (i !== 0) {
      divideString1 += `+<p class="log">log</p><p class="round-brac">(</p>span class="number">${num}<sup>${power}</sup></span><p class="round-brac">)</p>`
      divideString2 += `+<p class="round-brac">(</p><span class="power">${power}</span>*<span class="number">${manualLog.replace('0',characteristic)}</span><p class="round-brac">)</p>`
      divideString3 += `+<p class="round-brac">(</p><span class="number">${forGodSake(manualLog.replace('0',characteristic),power)}</span><p class="round-brac">)</p>`
    } else {
      divideString1 += `<p class="log">log</p><p class="round-brac">(</p><span class="number">${num}<sup>${power}</sup></span><p class="round-brac">)</p>`
      divideString2 += `<p class="round-brac">(</p><span class="power">${power}</span>*<span class="number">${manualLog.replace('0',characteristic)}</span><p class="round-brac">)</p>`
      divideString3 += `<p class="round-brac">(</p><span class="number">${forGodSake(manualLog.replace('0',characteristic),power)}</span><p class="round-brac">)</p>`
    }
    divideResult = parseFloat(logarithm(num, power)) + divideResult
  }
  finalResult = multiplyResult - divideResult
  finalString = `<span class="antilog-text">a.log</span><span class="curly-brac">{</span><p class="sqaure-brac">[</p>${multiplyString1}<p class="sqaure-brac">]</p> - <p class="sqaure-brac">[</p>${divideString1}<p class="sqaure-brac">]</p><span class="curly-brac">}</span></br>
   = <span class="antilog-text">a.log</span><span class="curly-brac">{</span><p class="sqaure-brac">[</p>${multiplyString2}<p class="sqaure-brac">]</p> - <p class="sqaure-brac">[</p>${divideString2}<p class="sqaure-brac">]</p><span class="curly-brac">}</span></br>
   = <span class="antilog-text">a.log</span><span class="curly-brac">{</span><p class="sqaure-brac">[</p>${multiplyString3}<p class="sqaure-brac">]</p> - <p class="sqaure-brac">[</p>${divideString3}<p class="sqaure-brac">]</p><span class="curly-brac">}</span></br>
   = <span class="antilog-text">a.log</span><p class="sqaure-brac">[</p><p class="round-brac">(</p><span class="number">${simpleNumbersToBarForm(multiplyResult).toFixed(4)}</span><p class="round-brac">)</p> - <p class="round-brac">(</p><span class="number">${simpleNumbersToBarForm(divideResult).toFixed(4)}</span><p class="round-brac">)</p><p class="sqaure-brac">]</p></br>
   = <span class="antilog-text">a.log</span><p class="round-brac">(</p><span class="number">${simpleNumbersToBarForm(finalResult)}</span><p class="round-brac">)</p></br>
   = <span class="result-value">${antilog(finalResult)}</span>`
  resultDiv.innerHTML = finalString
}

function setBodySizeToViewport() {
  var windowHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
  var windowWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

  document.body.style.height = windowHeight + "px";
  document.body.style.width = windowWidth + "px";
}

// Call the function initially to set the body size to the viewport
setBodySizeToViewport();