const table = document.body.firstElementChild;
function makeDiagonalRed(table) {
  for (let i = 0; i < 5; i++) {
    table.rows[i].cells[i].style.background = 'red'
  }
}