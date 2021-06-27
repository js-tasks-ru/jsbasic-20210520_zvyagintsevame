export default class StepSlider {
  constructor({ steps, value = 0 }) {
    this.elem = document.createElement('div');
    this.elem.classList.add('slider');

    this.steps = steps;
    this.value = value;

    this._initStepSlider()
  }

  _initStepSlider() {
    this._createStepSlider();
    this._changeValue();
  }

  _createStepSlider() {
    this.elem.insertAdjacentHTML('beforeend', this._createStepSliderTamplete());
    this._createSteps()
  }

  _createStepSliderTamplete() {
    const StepSliderTamplete = `<div class="slider__thumb" style="left: 50%;">
    <span class="slider__value">2</span>
  </div>

  <!--Заполненная часть слайдера-->
  <div class="slider__progress" style="width: 50%;"></div>

  <!--Шаги слайдера-->
  <div class="slider__steps">
  </div>`

    return StepSliderTamplete;
  }

  _createSteps() {
    const sliderSteps = this.elem.querySelector('.slider__steps');

    for (let i = 0; i < this.steps; i++) {
      const steps = document.createElement('span');

      sliderSteps.append(steps);
      sliderSteps.children[0].classList.add('slider__step-active');
    }

    return sliderSteps;
  }

  _changeValue() {
    const steps = this.elem.querySelector('.slider__steps');
    const value = this.elem.querySelector('.slider__value');
    const thumb = this.elem.querySelector('.slider__thumb');
    const progress = this.elem.querySelector('.slider__progress');

    this.elem.addEventListener('click', (event) => {
      const left = event.clientX - this.elem.getBoundingClientRect().left; // расстояние в пикселях от начала слайдера до места клика
      const leftRelative = left / this.elem.offsetWidth; // относительное значение
      const segments = this.steps - 1;
      const approximateValue = leftRelative * segments;
      const currentValue = Math.round(approximateValue);

      value.textContent = currentValue;

      for (let i = 0; i < steps.children.length; i++) {
        steps.children[i].classList.remove('slider__step-active');
      }

      const step = steps.children[currentValue];
      step.classList.add('slider__step-active');

      switch (currentValue) {
        case 0:
          thumb.setAttribute('style', `left: ${0}%;`);
          progress.setAttribute('style', `width: ${0}%;`);
          break;
        case 1:
          thumb.setAttribute('style', `left: ${25}%;`);
          progress.setAttribute('style', `width: ${25}%;`);
          break;
        case 2:
          thumb.setAttribute('style', `left: ${50}%;`);
          progress.setAttribute('style', `width: ${50}%;`);
          break;
        case 3:
          thumb.setAttribute('style', `left: ${75}%;`);
          progress.setAttribute('style', `width: ${75}%;`);
          break;
        case 4:
          thumb.setAttribute('style', `left: ${100}%;`);
          progress.setAttribute('style', `width: ${100}%;`);
          break;
      }

      this.elem.dispatchEvent(new CustomEvent("slider-change", {
        detail: this.value,
        bubbles: true,
      }))
    })
  }
}
