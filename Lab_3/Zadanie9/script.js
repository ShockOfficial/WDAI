class Carousel {
	#items;
	#currentSlide = 0;
	constructor() {
		this.#items = [...document.querySelectorAll('.carousel__item')];
	}
	next() {
		console.log('before');
		console.log(this.#items);

		const item = this.#items[(this.#currentSlide + 1) % this.#items.length];
		item.classList = [...item.classList].slice(0, 1) + ['carousel__item--1'];

		this.#items.forEach((item, index) => {
			const tmp = (index + 1 + this.#currentSlide) % this.#items.length;
			item.classList.remove(`carousel__item--${tmp}`);
			item.classList.add(`carousel__item--${tmp + 1}`);
		});
		this.#currentSlide++;
		console.log('after');
		console.log(this.#items);
	}
}

let $nextBtn;

const init = () => {
	$nextBtn = document.querySelector('.carousel__btn--right');
	const carousel = new Carousel();
	$nextBtn.addEventListener('click', () => {
		carousel.next();
	});
};

document.addEventListener('DOMContentLoaded', init);

