function getMinMax(str) {
  const result = {};
  const arrNumber = str
    .split(",")
    .join(" ")
    .split(" ")
    .filter((item) => item != "" && !isNaN(item))
    .map((item) => +item);

  result.min = Math.min(...arrNumber);
  result.max = Math.max(...arrNumber);

  return result;
}
