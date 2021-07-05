import createElement from '../../assets/lib/create-element.js';

export default class RibbonMenu {
  constructor(categories) {
    this.categories = categories;
    this.elem = document.createElement('div');

    this._initRibbonMenu()
  }

  _initRibbonMenu() {
    this._createRibbonMenu();
    this._scrolling();
    this._selectCategory();
  }

  _createRibbonMenu() {
    this.elem.classList.add('ribbon');
    this.elem.insertAdjacentHTML('afterbegin', this._createButton().buttonArrowLeft);
    this.elem.insertAdjacentElement('beforeend', this._createRibbonInner());
    this.elem.insertAdjacentHTML('beforeend', this._createButton().buttonArrowRight);
  }

  _createRibbonInner() {
    const ribonInnerElement = document.createElement('nav');
    ribonInnerElement.classList.add('ribbon__inner');

    this.categories.forEach((category) => {
      const ribbonItemTemplate = this._createRibbonItem(category);
      ribonInnerElement.insertAdjacentHTML('beforeend', ribbonItemTemplate)
    });
    return ribonInnerElement;
  }

  _createRibbonItem({ id, name }) {
    const ribbonItemTemplate = `
    <a href="#" class="ribbon__item" data-id="${id}">${name}</a>`

    return ribbonItemTemplate;
  }

  _createButton() {
    const buttons = {};
    const buttonArrowLeft = `<button class="ribbon__arrow ribbon__arrow_left
    ">
    <img src="/assets/images/icons/angle-icon.svg" alt="icon">
  </button>`;
    const buttonArrowRight = `<button class="ribbon__arrow ribbon__arrow_right ribbon__arrow_visible">
    <img src="/assets/images/icons/angle-icon.svg" alt="icon">
  </button>`

    buttons.buttonArrowLeft = buttonArrowLeft;
    buttons.buttonArrowRight = buttonArrowRight;

    return buttons;
  }

  _scrolling() {
    const ribbonInner = this.elem.querySelector('.ribbon__inner');
    const buttonArrowRight = this.elem.querySelector('.ribbon__arrow_right');
    const buttonArrowLeft = this.elem.querySelector('.ribbon__arrow_left');

    function calculateScrolling() {
      const scroll = {};
      const scrollLeft = ribbonInner.scrollLeft; // ширина оставшейся невидимой области слева
      const scrollWidth = ribbonInner.scrollWidth; // общая ширина прокрутки
      const clientWidth = ribbonInner.clientWidth; // видимая ширина элемента
      const scrollRight = scrollWidth - scrollLeft - clientWidth; // ширина оставшейся невидимой области справа

      scroll.scrollLeft = scrollLeft;
      scroll.scrollWidth = scrollWidth;
      scroll.clientWidth = clientWidth;
      scroll.scrollRight = scrollRight;

      return scroll;
    }

    this.elem.addEventListener('click', function (event) {

      function rightScroll() {
        if (event.target.closest('.ribbon__arrow_right')) {

          ribbonInner.scrollBy(350, 0);

          ribbonInner.addEventListener('scroll', function () {
            const scrollRight = calculateScrolling().scrollRight;

            if (scrollRight !== 0) {
              buttonArrowLeft.classList.add('ribbon__arrow_visible');
            };

            if (scrollRight === 0) {
              buttonArrowRight.classList.remove('ribbon__arrow_visible');
            };

          })
        };
      };

      function leftScroll() {
        if (event.target.closest('.ribbon__arrow_left')) {

          ribbonInner.scrollBy(-350, 0);

          ribbonInner.addEventListener('scroll', function () {
            const scrollLeft = calculateScrolling().scrollLeft;

            if (scrollLeft !== 0) {
              buttonArrowRight.classList.add('ribbon__arrow_visible');
            };

            if (scrollLeft === 0) {
              buttonArrowLeft.classList.remove('ribbon__arrow_visible');
            };
          })
        };
      }


      rightScroll();
      leftScroll();
      calculateScrolling();
    });
  }

  _selectCategory() {
    const ribbonInner = this.elem.querySelector('.ribbon__inner');
    const ribbonItem = this.elem.querySelectorAll('.ribbon__item');

    ribbonInner.addEventListener('click', (event) => {
      ribbonItem.forEach(item => {
        item.classList.remove('ribbon__item_active');
      });

      event.target.classList.add('ribbon__item_active');

      this.elem.dispatchEvent(new CustomEvent("ribbon-select", {
        detail: event.target.dataset.id,
        bubbles: true,
      }))
    })
  }
}