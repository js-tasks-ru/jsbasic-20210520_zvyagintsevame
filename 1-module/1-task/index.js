function factorial(n) {
  if (n !== 0) {
    let i = n;

    while (i > 1) {
      n = n * (i - 1);
      i--;
    }
    return n;
  }
  return 1;
}
