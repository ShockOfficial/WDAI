class Game {
	#gameBox;
	#maxSpeed = 30; // Less = faster
	#minSpeed = 5;
	#minHeightScale = 0.3;
	#maxBottom = 200;
	#minBottom = 10;
	#gameSpeed = 700;
	#life;
	#lifes = 3;
	#cursor;
	#scoreEl;
	#score = 00000;
	#nickname = '';
	#inputEl;
	#formBtn;
	#isRunning = false;
	#gameTimer;

	constructor() {
		this.#gameBox = document.querySelector('#game');
		this.#cursor = document.querySelector('.crosshair');
		this.#life = document.querySelector('#life');
		this.#scoreEl = document.querySelector('#score');
		this.#inputEl = document.querySelector('#nick');
		this.#formBtn = document.querySelector('#formBtn');

		this.#life.textContent = `x${this.#lifes}`;
		this.#updateScore();
		this.#inputEl.addEventListener('input', this.#handleInput.bind(this));
		this.#formBtn.addEventListener('click', this.#handleSubmit.bind(this));
		window.addEventListener('mousemove', this.#moveCursor);
	}

	async #initGame() {
		this.#gameBox.addEventListener('click', this.#handleClick.bind(this));
		const nick = document.querySelector('#nickName');
		nick.textContent = this.#nickname;
	}

	#run() {
		this.#isRunning = true;
		this.#gameTimer = setInterval(() => {
			if (this.#lifes <= 0) {
				this.#isRunning = false;
				this.#endGame();
				return;
			}
			this.#generateZombie();
		}, this.#gameSpeed);
		this.#initGame();
	}

	async #endGame() {
		clearInterval(this.#gameTimer);
		const board = document.querySelector('#scoreBoard');
		const data = (await this.#fetchScoreboard()) || {};
		const ranking = [...data];

		ranking.push({
			nick: this.#nickname,
			score: this.#score,
			date: new Date().toLocaleDateString(),
		});
		if (ranking.length > 0) {
			ranking.sort((a, b) => b.score - a.score);

			ranking.forEach((item) => {
				this.#fillScoreBoard(this.#generateScoreItem(item));
			});
		}

		this.#sendData(ranking.slice(0, 7));

		const restartBtn = document.querySelector('#restartBtn');
		restartBtn.addEventListener('click', () => {
			window.location.reload();
		});
		board.classList.remove('hide');
	}

	#animateZombie(zombie, options) {
		const frameWidth = 200;
		const frames = 10;
		let right = 0;
		let frame = 0;

		options.runTimerId = setInterval(() => {
			const frameOffset = (++frame % frames) * -frameWidth;
			zombie.style.backgroundPositionX = frameOffset + 'px';
		}, 60);

		options.moveTimerId = setInterval(() => {
			right += 5;
			zombie.style.right = right + 'px';

			if (right > this.#gameBox.clientWidth) {
				this.#removeZombie(zombie);
				this.#lifes = this.#lifes > 0 ? this.#lifes - 1 : 0;
				this.#life.textContent = `x${this.#lifes}`;
			}
		}, options.speed);

		zombie.dataset.timerIds = [options.moveTimerId, options.runTimerId];
	}

	#generateZombie() {
		const zombie = document.createElement('div');
		zombie.classList.add('zombie');
		const speed = this.#random(this.#maxSpeed, this.#minSpeed);
		const height = Math.random() + this.#minHeightScale;
		const bottom = this.#random(this.#maxBottom, this.#minBottom);
		zombie.style.transform = `scale(${height})`;
		zombie.style.bottom = bottom;

		this.#animateZombie(zombie, { speed });
		this.#gameBox.append(zombie);
	}

	#removeZombie(zombie) {
		const timerIds = zombie.dataset.timerIds.split(',');
		timerIds.forEach((id) => clearInterval(id));
		zombie.remove();
	}

	#random(max, min) {
		return Math.floor(Math.random() * (max - min) + min);
	}

	#moveCursor = (e) => {
		const mouseY = e.clientY;
		const mouseX = e.clientX;
		this.#cursor.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
	};

	#updateScore() {
		if (this.#score < 0) {
			const withoutMinus = String(this.#score).slice(1);
			this.#scoreEl.textContent = '-' + withoutMinus.padStart(5, '0');
			return;
		}
		this.#scoreEl.textContent = String(this.#score).padStart(5, '0');
	}

	#handleClick(e) {
		const el = e.target;

		if (!this.#isRunning || el.classList.contains('btn')) return;

		if (el.classList.contains('zombie')) {
			this.#removeZombie(el);
			this.#score += 12;
		} else {
			this.#score -= 6;
		}
		this.#updateScore();
	}

	#handleInput(e) {
		this.#nickname = e.target.value.trim();
	}
	#handleSubmit(e) {
		e.preventDefault();

		if (this.#nickname.trim() !== '') {
			this.#run();
			this.#inputEl.parentElement.remove();
		}
	}

	#generateScoreItem(data) {
		return `
    <li class="list-item">
    <p class="list-name">${data.nick}</p>
    <p class="list-points">${data.score}</p>
    <p class="list-date">${data.date}</p>
  </li>`;
	}

	#fillScoreBoard(item) {
		const board = document.querySelector('#scoreList');
		board.insertAdjacentHTML('beforeend', item);
	}

	async #fetchScoreboard() {
		try {
			const res = await fetch(
				'https://jsonblob.com/api/jsonBlob/1043930500527570944',
			);
			if (!res.ok) throw new Error(res.statusText);
			return await res.json();
		} catch (e) {
			console.log(e);
			console.log(e.message);
		}
	}

	async #sendData(data) {
		try {
			const res = await fetch(
				'https://jsonblob.com/api/jsonBlob/1043930500527570944',
				{
					body: JSON.stringify(data),
					mode: 'cors',
					cache: 'no-cache',
					headers: {
						'Content-Type': 'application/json',
					},
					method: 'PUT',
				},
			);

			if (!res.ok) throw new Error(res.statusText);
		} catch (e) {
			console.log(e.message);
		}
	}
}

const init = () => {
	new Game();
};

document.addEventListener('DOMContentLoaded', init());

