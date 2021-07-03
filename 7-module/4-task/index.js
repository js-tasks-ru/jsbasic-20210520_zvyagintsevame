export default class StepSlider {
  constructor({ steps, value = 0 }) {
    this.steps = steps;
    this.segments = this.steps - 1;
    this.value = value;

    this._initStepSlider()

    this.thumb = this.elem.querySelector('.slider__thumb');
    this.progress = this.elem.querySelector('.slider__progress');
    this.sliderStepsElement = this.elem.querySelector('.slider__steps');
    this.sliderValueElement = this.elem.querySelector('.slider__value');

    this.sliderSteps = this.sliderStepsElement.children

    this.sliderStepsElement.children[this.value].classList.add('slider__step-active');

    this._changeValue = this._changeValue.bind(this);
    this._onPointerDown = this._onPointerDown.bind(this);
    this._onPointerMove = this._onPointerMove.bind(this);
    this._onPointerUp = this._onPointerUp.bind(this);
    this.calculateLeftRelarive = this._calculateLeftRelarive.bind(this);

    this._addHandlers();
  }

  _initStepSlider() {
    this.elem = document.createElement('div');
    this.elem.classList.add('slider');
    this.elem.insertAdjacentHTML('beforeend', `
      <div class="slider__thumb" style="left: ${this._calculatePosition()}%">
        <span class="slider__value">${this.value}</span>
      </div>

      <!--Заполненная часть слайдера-->
      <div class="slider__progress" style="width: ${this._calculatePosition()}%"></div>

      <!--Шаги слайдера-->
      <div class="slider__steps">
        ${'<span></span>'.repeat(this.steps)}
      </div>`
    );
  }

  _calculatePosition() {
    const segmentWidth = 100 / this.segments;

    return segmentWidth * this.value;
  };

  _calculateLeftRelarive(event) {
    const left = event.clientX - this.elem.getBoundingClientRect().left; // расстояние в пикселях от начала слайдера до места клика
    let leftRelative = left / this.elem.offsetWidth; // относительное значение от 0 до 1

    if (leftRelative < 0) {
      leftRelative = 0;
    }

    if (leftRelative > 1) {
      leftRelative = 1;
    }

    return leftRelative
  }

  _calculateCurrentValue(event) {
    const leftRelative = this.calculateLeftRelarive(event)
    const currentValue = Math.round(leftRelative * this.segments); // конкретное значение слайдера

    return currentValue;
  };

  _changeValue(event) {
    const currentValue = this._calculateCurrentValue(event);
    this.value = currentValue;

    this.sliderValueElement.textContent = currentValue;

    for (let i = 0; i < this.sliderSteps.length; i++) {
      this.sliderSteps[i].classList.remove('slider__step-active');
    }

    this.sliderSteps[currentValue].classList.add('slider__step-active');

    this.thumb.setAttribute('style', `left: ${this._calculatePosition()}%`);
    this.progress.setAttribute('style', `width: ${this._calculatePosition()}%`);

    this.elem.dispatchEvent(new CustomEvent("slider-change", {
      detail: this.value,
      bubbles: true,
    }))
  }

  _changeDragValue(event) {
    let currentValue = this._calculateCurrentValue(event);

    if (currentValue < 0) {
      currentValue = 0;
    };

    if (currentValue > this.segments) {
      currentValue = this.segments;
    }

    this.value = currentValue;

    this.sliderValueElement.textContent = currentValue;

    for (let i = 0; i < this.sliderSteps.length; i++) {
      this.sliderSteps[i].classList.remove('slider__step-active');
    }

    this.sliderSteps[currentValue].classList.add('slider__step-active');
  }

  // Функция слушатель по зажатию ползунка
  _onPointerDown(event) {
    event.preventDefault();
    this.elem.classList.add('slider_dragging');

    document.addEventListener('pointermove', this._onPointerMove);
    document.addEventListener('pointerup', this._onPointerUp);
  }

  // Функция слушатель по движению ползунка
  _onPointerMove(event) {
    let leftRelative = this.calculateLeftRelarive(event)

    const leftPercents = leftRelative * 100;

    this.thumb.setAttribute('style', `left: ${leftPercents}%`);
    this.progress.setAttribute('style', `width: ${leftPercents}%`);
    this._changeDragValue(event);
  }

  _onPointerUp(event) {
    this.elem.classList.remove('slider_dragging');

    document.removeEventListener('pointerup', this._onPointerUp);
    document.removeEventListener('pointermove', this._onPointerMove);

    this._changeValue(event)
  }

  _addHandlers() {
    this.elem.addEventListener('click', this._changeValue);
    this.thumb.addEventListener('pointerdown', this._onPointerDown)
    this.thumb.ondragstart = () => false;  // отключает встроенный браузерный Drag-and-Drop
  }
}