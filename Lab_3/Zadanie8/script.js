class PasswordValidation {
	#passwordInput;
	#isPasswordValid;
	#passwordConfirmInput;
	#button;
	#error;
	#numberOfCharactersEl;
	#specialCharacterEl;
	#capitalLetterEl;
	#oneNumberEl;
	#inputTimerId;
	#confirmTimerId;
	#eyeOnPass;
	#eyeOffPass;
	#eyeOnConf;
	#eyeOffConf;
	#passBox;
	#confBox;
	#DEBOUNCE_TIME = 400;

	constructor(
		passwordInput,
		passwordConfirmInput,
		button,
		numberOfCharactersEl,
		specialCharacterEl,
		capitalLetterEl,
		oneNumberEl,
		error,
		eyeOnPass,
		eyeOffPass,
		eyeOnConf,
		eyeOffConf,
		passBox,
		confBox,
	) {
		this.#passwordInput = passwordInput;
		this.#passwordConfirmInput = passwordConfirmInput;
		this.#button = button;
		this.#numberOfCharactersEl = numberOfCharactersEl;
		this.#specialCharacterEl = specialCharacterEl;
		this.#capitalLetterEl = capitalLetterEl;
		this.#oneNumberEl = oneNumberEl;
		this.#error = error;
		this.#eyeOffConf = eyeOffConf;
		this.#eyeOffPass = eyeOffPass;
		this.#eyeOnConf = eyeOnConf;
		this.#eyeOnPass = eyeOnPass;
		this.#passBox = passBox;
		this.#confBox = confBox;

		this.#passwordInput.addEventListener('input', (e) => {
			clearTimeout(this.#inputTimerId);
			this.#inputTimerId = setTimeout(() => {
				this.validate.call(this, e);
			}, this.#DEBOUNCE_TIME);
		});
		this.#passwordConfirmInput.addEventListener('input', (e) => {
			clearTimeout(this.#confirmTimerId);
			this.#confirmTimerId = setTimeout(() => {
				this.#validateRepeat.call(this, e);
			}, this.#DEBOUNCE_TIME);
		});

		this.#passBox.addEventListener('click', (e) => {
			this.#handleShowPassword(e);
		});

		this.#confBox.addEventListener('click', (e) => {
			this.#handleShowPassword(e, false);
		});
	}

	validate(event) {
		const currentVal = event.target.value;
		const specialCharacters = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
		const isValidLenght = currentVal.length >= 8;
		const isSpecialCharacter = !!currentVal.match(specialCharacters);
		const isNumber = !!currentVal.match(/[0-9]/);
		const isCapitalLetter = !!currentVal.match(/[A-Z]/);

		this.#isPasswordValid =
			isValidLenght && isSpecialCharacter && isNumber && isCapitalLetter;
		if (this.#isPasswordValid) {
			this.#passwordInput.classList.add('valid');
			this.#passwordInput.classList.remove('invalid');
		} else if (isValidLenght) {
			this.#passwordInput.classList.remove('valid');
			this.#passwordInput.classList.add('invalid');
		} else {
			this.#passwordInput.classList.remove('valid');
			this.#passwordInput.classList.remove('invalid');
		}

		this.#addClasses(this.#numberOfCharactersEl, isValidLenght);
		this.#addClasses(this.#specialCharacterEl, isSpecialCharacter);
		this.#addClasses(this.#oneNumberEl, isNumber);
		this.#addClasses(this.#capitalLetterEl, isCapitalLetter);
	}

	#validateRepeat(e) {
		const currIndex = this.#passwordConfirmInput.value.length;
		console.log(currIndex);

		const passwordMatches = !!this.#passwordConfirmInput.value.match(
			new RegExp(this.#passwordInput.value.slice(0, currIndex)),
		);

		if (e.target.value === this.#passwordInput.value && this.#isPasswordValid) {
			this.#button.disabled = false;
			this.#passwordConfirmInput.classList.add('valid');
			this.#passwordConfirmInput.classList.remove('invalid');
			this.#handleError(true);
		} else if (
			(this.#isPasswordValid && !passwordMatches) ||
			currIndex > this.#passwordInput.value.length
		) {
			this.#handleError(false);
			this.#passwordConfirmInput.classList.add('invalid');
			this.#passwordConfirmInput.classList.remove('valid');
		} else {
			this.#button.disabled = true;
			this.#passwordConfirmInput.classList.remove('valid');
			this.#passwordConfirmInput.classList.remove('invalid');
			this.#handleError(true);
		}
	}

	#addClasses(el, state) {
		if (state) {
			el.classList.remove('invalid-icon');
			el.classList.add('valid-icon');
		} else {
			el.classList.remove('valid-icon');
			el.classList.add('invalid-icon');
		}
	}

	#handleError(isValid) {
		if (isValid) {
			this.#error.classList.remove('animate-invalid');
			this.#error.classList.add('animate-valid');
		} else {
			this.#error.innerText = 'Enter valid password';
			this.#error.classList.remove('animate-valid');
			this.#error.classList.add('animate-invalid');
		}
	}

	#handleShowPassword(e, isPassInput = true) {
		if (isPassInput) {
			this.#eyeOnPass.classList.toggle('icon-off');
			this.#eyeOffPass.classList.toggle('icon-off');

			if (this.#eyeOnPass.classList.contains('icon-off')) {
				this.#passwordInput.type = 'text';
			} else {
				this.#passwordInput.type = 'password';
			}
		} else {
			this.#eyeOnConf.classList.toggle('icon-off');
			this.#eyeOffConf.classList.toggle('icon-off');

			if (this.#eyeOnConf.classList.contains('icon-off')) {
				this.#passwordConfirmInput.type = 'text';
			} else {
				this.#passwordConfirmInput.type = 'password';
			}
		}
	}
}

const init = () => {
	passwordInput = document.querySelector('#password');
	passwordConfirmInput = document.querySelector('#repeatPassword');
	button = document.querySelector('#formBtn');
	numberOfCharactersEl = document.querySelector('#passwordLength');
	specialCharacterEl = document.querySelector('#specialChar');
	capitalLetterEl = document.querySelector('#oneCapitalLetter');
	oneNumberEl = document.querySelector('#oneDigit');
	error = document.querySelector('#repeatError');
	eyeOnPass = document.querySelector('#eyeOnPass');
	eyeOnConf = document.querySelector('#eyeOnConf');
	eyeOffPass = document.querySelector('#eyeOffPass');
	eyeOffConf = document.querySelector('#eyeOffConf');
	passBox = document.querySelector('#passIconBox');
	confBox = document.querySelector('#confIconBox');

	new PasswordValidation(
		passwordInput,
		passwordConfirmInput,
		button,
		numberOfCharactersEl,
		specialCharacterEl,
		capitalLetterEl,
		oneNumberEl,
		error,
		eyeOnPass,
		eyeOffPass,
		eyeOnConf,
		eyeOffConf,
		passBox,
		confBox,
	);
};

document.addEventListener('DOMContentLoaded', init);

