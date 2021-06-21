import createElement from '../../assets/lib/create-element.js';

export default class Carousel {
  constructor(slides) {
    this.slides = slides;
    this.elem = document.createElement('div');

    this._initCarousel();
  }

  _initCarousel() {
    this._createCarouselHTML();
    this._switch();
    this._addButtonsHandler();
  }

  _createCarouselHTML() {
    this.elem.classList.add('carousel');
    this.elem.insertAdjacentHTML('beforeend', this._createButtonsArrows());
    this.elem.insertAdjacentElement('beforeend', this._createInner());
  }

  _createInner() {
    const innerElement = document.createElement('div');
    innerElement.classList.add('carousel__inner');

    this.slides.forEach(slide => {
      const template = this._createSlide(slide);
      innerElement.insertAdjacentHTML('beforeend', template);
    });

    return innerElement;
  }

  _createSlide({ name, price, image, id }) {
    const slideTemplate = `
    <div class="carousel__slide" data-id="${id}">
      <img src="/assets/images/carousel/${image}" class="carousel__img" alt="${image}">
      <div class="carousel__caption">
        <span class="carousel__price">€${price}</span>
        <div class="carousel__title">${name}</div>
        <button type="button" class="carousel__button">
          <img src="/assets/images/icons/plus-icon.svg" alt="icon">
        </button>
      </div>
    </div>`

    return slideTemplate;
  }

  _createButtonsArrows() {
    const buttonTemplate = `
    <div class="carousel__arrow carousel__arrow_right">
      <img src="/assets/images/icons/angle-icon.svg" alt="icon">
    </div>
    <div class="carousel__arrow carousel__arrow_left">
      <img src="/assets/images/icons/angle-left-icon.svg" alt="icon">
    </div>`

    return buttonTemplate;
  }

  _switch() {
    const carouselInner = this.elem.querySelector('.carousel__inner')
    const carouselArrowRight = this.elem.querySelector(".carousel__arrow_right");
    const carouselArrowLeft = this.elem.querySelector(".carousel__arrow_left");
    const carouselSLide = this.elem.querySelector(".carousel__slide");

    const slideQuantity = carouselInner.children.length;

    let counter = 1;

    if (counter === 1) {
      carouselArrowLeft.setAttribute("style", "display: none");
    }

    this.elem.addEventListener("click", function (event) {
      const slideWidth = carouselSLide.offsetWidth;

      if (event.target.closest(".carousel__arrow_right")) {
        carouselInner.setAttribute(
          "style",
          `transform: translateX(${-slideWidth * counter}px)`
        );

        counter++;

        if (counter === slideQuantity) {
          carouselArrowRight.setAttribute("style", "display: none");
          counter--;
        }

        carouselArrowLeft.removeAttribute("style");
      }

      if (event.target.closest(".carousel__arrow_left")) {
        counter--;
        carouselInner.setAttribute(
          "style",
          `transform: translateX(${-slideWidth * counter}px)`
        );

        carouselArrowRight.removeAttribute("style");
      }

      if (counter === 0) {
        carouselArrowLeft.setAttribute("style", "display: none");
        counter++
      }
    });
  }

  _addButtonsHandler() {
    const buttons = this.elem.querySelectorAll('.carousel__button')

    buttons.forEach((button) => {
      button.addEventListener("click", () => {
        const id = button.closest('.carousel__slide').dataset.id;

        this.elem.dispatchEvent(new CustomEvent("product-add", {
          detail: id,
          bubbles: true,
        }))
      });
    })
  }
}
