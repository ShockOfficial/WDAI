class Carousel {
	#items;
	#currentSlideObj;
	#ANIMATION_TIME = 700;

	constructor(nextBtn, prevBtn) {
		this.#items = [...document.querySelectorAll('.carousel__item')];
		this.#items = this.#items.map((item, index) => ({
			...item,
			initialPosition: index,
			currentObj: this.#items[index],
			nextObj: this.#items[(index + 1) % this.#items.length],
			prevObj: this.#items[index - 1 < 0 ? this.#items.length - 1 : index - 1],
		}));

		this.#currentSlideObj = this.#items[0];
		this.#currentSlideObj.currentObj.classList.add('current');
		this.#items[this.#items.length - 1].currentObj.classList.add('last');

		nextBtn.addEventListener('click', () => {
			this.#handleClickEvent(nextBtn, this.next);
		});

		prevBtn.addEventListener('click', async () => {
			this.#handleClickEvent(prevBtn, this.previous);
		});
	}
	async #handleClickEvent(btn, callback) {
		btn.disabled = true;
		callback.apply(this);
		await this.#wait(this.#ANIMATION_TIME);
		btn.disabled = false;
	}

	async next() {
		this.#currentSlideObj.currentObj.classList.remove('current');
		this.#currentSlideObj.currentObj.classList.add('last');
		this.#currentSlideObj.nextObj.classList.add('current');
		this.#currentSlideObj.prevObj.classList.remove('last');

		this.#currentSlideObj =
			this.#items[
				(this.#currentSlideObj.initialPosition + 1) % this.#items.length
			];
	}

	#wait(ms) {
		return new Promise((res) => {
			setTimeout(() => {
				res(true);
			}, ms);
		});
	}

	previous() {
		this.#currentSlideObj.currentObj.classList.remove('current', 'last');
		this.#currentSlideObj.prevObj.classList.remove('last');
		this.#currentSlideObj.prevObj.classList.add('current');

		const position =
			this.#currentSlideObj.initialPosition - 1 < 0
				? this.#items.length - 1
				: this.#currentSlideObj.initialPosition - 1;

		this.#currentSlideObj = this.#items[position % this.#items.length];
		this.#currentSlideObj.prevObj.classList.add('last');
		this.#currentSlideObj.prevObj.classList.remove('current');
	}
}

const init = () => {
	nextBtn = document.querySelector('.carousel__btn--right');
	prevBtn = document.querySelector('.carousel__btn--left');
	new Carousel(nextBtn, prevBtn);
};

document.addEventListener('DOMContentLoaded', init);

