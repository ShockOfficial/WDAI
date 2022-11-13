class Carousel {
	#items;
	#currentSlide = 0;

	constructor() {
		this.#items = [...document.querySelectorAll('.carousel__item')];
	}

	next() {
		this;
	}
}

