/**
 * Компонент, который реализует таблицу
 * с возможностью удаления строк
 *
 * Пример одного элемента, описывающего строку таблицы
 *
 *      {
 *          name: 'Ilia',
 *          age: 25,
 *          salary: '1000',
 *          city: 'Petrozavodsk'
 *      }
 *
 */

export default class UserTable {
  constructor(rows) {
      this.rows = rows;
      this.elem = document.createElement('table');
      
      this._initTable()
      }

  _initTable() {
      this._createTHead()
      this._createTBody()
  }

  _createTHead() {
      const thead = document.createElement('thead');
      const tr = document.createElement('tr');
      const arrNameTD = Object.keys(this.rows[0]);
  
      arrNameTD.push('')
      thead.appendChild(tr);
  
      arrNameTD.forEach(item => {
          const th = document.createElement('th');
          th.innerHTML = item
          tr.appendChild(th)
      })

      this.elem.appendChild(thead);
  }

  _createTBody() {
      const tbody = document.createElement('tbody');

      for (let row of this.rows) {
          const tr = document.createElement('tr');
          const arrVale = Object.values(row);
  
          tbody.appendChild(tr);
  
          arrVale.forEach(item => {
              const td = document.createElement('td');
              td.innerHTML = item
              tr.appendChild(td)
          })
  
          this._createButton(tr)
      }

      console.log(tbody);

      this.elem.appendChild(tbody);
  }

  _createButton(tr) {
      const button = document.createElement('button');
      const td = document.createElement('td');
  
      button.textContent = 'X'
      td.appendChild(button)
      tr.appendChild(td)
  
      button.addEventListener('click', this._deleteTR)
  }

  _deleteTR(event) {
      event.target.closest('tr').remove()
  }
}
