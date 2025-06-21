function getCharacteristic(number) {
  return Math.floor(Math.log10(Math.abs(number)));
}

export default getCharacteristic;