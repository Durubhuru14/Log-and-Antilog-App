function simpleNumbersToBarForm(integer) {
  if (integer < 0) {
    for (let i = 1; i <= 4; i++) {
      if (integer + i > 0 && integer + i < 1) {
        return `\u0305${integer + 2 * i}`;
      }
    }
  }
  return integer;
}

export default simpleNumbersToBarForm;
