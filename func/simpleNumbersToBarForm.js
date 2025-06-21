function simpleNumbersToBarForm(integer) {
  if (integer < 0) {
    for (let i = 1; i <= 4; i++) {
      if (integer + i > 0 && integer + i < 1) {
        const [c, m] = (integer + 2 * i).toString().split(".").map(parseFloat);
        return `$\\overline{${c}}.${m}$`;

      }
    }
  }
  return integer;
}

export default simpleNumbersToBarForm;
