let salaries = {
  John: 1000,
  Ann: 1600,
  Pete: 1300,
  month: "December",
  currency: "USD",
  isPayed: false,
};

function sumSalary(obj) {
  let sumSalary = 0;

  for (let key in obj) {
    if (isFinite(obj[key])) {
      sumSalary += obj[key];
    }
  }

  return sumSalary;
}

sumSalary(salaries);
