class Carousel {
	#items;
	#currentSlideObj;
	#ANIMATION_TIME = 700;

	constructor(nextBtn, prevBtn, randomBtn) {
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

		randomBtn.addEventListener('click', () => {
			this.#handleClickEvent(randomBtn, this.random);
		});
	}
	async #handleClickEvent(btn, callback) {
		btn.disabled = true;
		callback.apply(this);
		await this.#wait(this.#ANIMATION_TIME + 100);
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

	async random() {
		let randomSelectedIndex = this.#currentSlideObj.initialPosition;
		const currIndex = this.#currentSlideObj.initialPosition;
		while (randomSelectedIndex === this.#currentSlideObj.initialPosition) {
			randomSelectedIndex = Math.floor(Math.random() * this.#items.length);
		}
		this.#items.forEach((item) =>
			item.currentObj.classList.remove('last', 'current'),
		);

		const tmp = this.#currentSlideObj;
		this.#currentSlideObj.currentObj.classList.add('last');
		this.#currentSlideObj = this.#items[randomSelectedIndex];
		this.#currentSlideObj.prevObj.classList.add('last');
		this.#currentSlideObj.currentObj.classList.add('current');
		this.#currentSlideObj.nextObj.classList.remove('last', 'current');

		if (
			Math.abs(currIndex - randomSelectedIndex) >= 2 &&
			!(currIndex === 0 && randomSelectedIndex === this.#items.length - 1) &&
			!(currIndex === this.#items.length - 1 && randomSelectedIndex === 0)
		) {
			await this.#wait(this.#ANIMATION_TIME);
			tmp.currentObj.classList.remove('last', 'current');
		}
	}
}

const init = () => {
	const nextBtn = document.querySelector('.carousel__btn--right');
	const prevBtn = document.querySelector('.carousel__btn--left');
	const randomBtn = document.querySelector('#randomBtn');
	new Carousel(nextBtn, prevBtn, randomBtn);
};

document.addEventListener('DOMContentLoaded', init);

