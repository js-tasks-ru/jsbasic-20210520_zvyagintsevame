const statusIndex = 3;
const genderIndex = 2;
const ageIndex = 1;

function highlight(table) {

  for (let tBody of table.tBodies) {
    const rows = tBody.rows;

    for (row of rows) {
      const tdStatusElement = row.cells[statusIndex];
      const available = tdStatusElement.dataset.available;

      if (available === 'true') {
        row.classList.add('available');
      }
      else if (available === 'false') {
        row.classList.add('unavailable');
      }
      else if (!available)
        row.setAttribute('hidden', 'hidden');
    }

    for (row of rows) {
      const tdGenderElement = row.cells[genderIndex];
      const gender = tdGenderElement.textContent;

      if (gender === 'm') {
        row.classList.add('male')
      }
      else {
        row.classList.add('female')
      }
    }

    for (row of rows) {
      const tdAgeElement = row.cells[ageIndex];
      const age = tdAgeElement.textContent

      if (+age < 18) {
        row.style.textDecoration = 'line-through';
      }
    }
  }
}