export default class StepSlider {
  constructor({ steps, value = 0 }) {
    this.elem = document.createElement('div');
    this.elem.classList.add('slider');

    this.steps = steps;
    this.segments = this.steps - 1;
    this.value = value;
    
    this._changeValue = this._changeValue.bind(this)

    this._initStepSlider()
  }

  _initStepSlider() {
    this.elem.insertAdjacentHTML('beforeend', this._createStepSliderTemplate());

    const sliderSteps = this.elem.querySelector('.slider__steps');
    sliderSteps.children[this.value].classList.add('slider__step-active');

    this._addHandler();
  }

  _createStepSliderTemplate() {
    const StepSliderTemplate = `
    <div class="slider__thumb" style="left: ${this._calculatePosition()}%">
      <span class="slider__value">${this.value}</span>
    </div>

    <!--Заполненная часть слайдера-->
    <div class="slider__progress" style="width: ${this._calculatePosition()}%"></div>

    <!--Шаги слайдера-->
    <div class="slider__steps">
      ${'<span></span>'.repeat(this.steps)}
    </div>`

    return StepSliderTemplate;
  }

  _calculatePosition() {
    const segmentWidth = 100 / this.segments;

    return segmentWidth * this.value;
  };

  _changeValue(event) {
    const left = event.clientX - this.elem.getBoundingClientRect().left; // расстояние в пикселях от начала слайдера до места клика
    const leftRelative = left / this.elem.offsetWidth; // относительное значение от 0 до 1
    const currentValue = Math.round(leftRelative * this.segments); // конкретное значение слайдера
    this.value = currentValue;
    
    const sliderValueElement = document.querySelector('.slider__value');
    sliderValueElement.textContent = currentValue;

    const sliderSteps = document.querySelector('.slider__steps').children;

    for (let i = 0; i < sliderSteps.length; i++) {
      sliderSteps[i].classList.remove('slider__step-active');
    }

    sliderSteps[currentValue].classList.add('slider__step-active');

    const progress = document.querySelector('.slider__progress');
    const thumb = document.querySelector('.slider__thumb');

    progress.setAttribute('style', `width: ${this._calculatePosition()}%`);
    thumb.setAttribute('style', `left: ${this._calculatePosition()}%`);

    this.elem.dispatchEvent(new CustomEvent("slider-change", {
      detail: this.value,
      bubbles: true,
    }))
  }

  _addHandler() {
    this.elem.addEventListener('click', this._changeValue);
  }
}