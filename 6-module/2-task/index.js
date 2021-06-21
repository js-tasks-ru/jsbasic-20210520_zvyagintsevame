import createElement from '../../assets/lib/create-element.js';

export default class ProductCard {
    constructor({ name, price, category, image, id }) {
        this.name = name;
        this.price = price;
        this.category = category;
        this.image = image;
        this.id = id;
        this.elem = document.createElement('div');

        this._initProductCard()
    }

    _initProductCard() {
        this._createCardHTML()
    }

    _createCardHTML() {
        this.elem.classList.add('card')

        const divCardTop = document.createElement('div');
        divCardTop.classList.add('card__top');
        this.elem.append(divCardTop);

        const cardImage = document.createElement('img');
        cardImage.classList.add('card__image');
        cardImage.setAttribute('alt', 'product');
        cardImage.setAttribute('src', `/assets/images/products/${this.image}`);
        divCardTop.append(cardImage);

        const cardPrice = document.createElement('span');
        cardPrice.classList.add('card__price');
        cardPrice.innerHTML = `&euro;${this.price.toFixed(2)}`
        divCardTop.append(cardPrice);

        const divCardBody = document.createElement('div');
        divCardBody.classList.add('card__body');
        this.elem.appendChild(divCardBody);

        const divCardTitle = document.createElement('div');
        divCardTitle.classList.add('card__title');
        divCardTitle.innerHTML = this.name
        divCardBody.append(divCardTitle);

        const button = document.createElement('button');
        button.classList.add('card__button');
        cardImage.setAttribute('type', 'button');
        divCardBody.append(button);
        
        button.addEventListener("click", (event) => {
            event.target.dispatchEvent(new CustomEvent("product-add", {
                detail: this.id,
                bubbles: true,
            }))
        });

        const image = document.createElement('img');
        image.setAttribute('alt', 'icon');
        image.setAttribute('src', '/assets/images/icons/plus-icon.svg');
        button.append(image);
    }
}