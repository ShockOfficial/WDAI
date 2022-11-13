let $nameInput;
let $phoneInput;
let $nameError;
let $phoneError;
let $formBtn;
let $isNameValid;
let $isPhoneValid;
let $debounceTimerId;
let $listBox;
const DEBOUNCE_TIME = 500;

const init = () => {
	$nameInput = document.querySelector('#name');
	$phoneInput = document.querySelector('#phone');
	$formBtn = document.querySelector('#formBtn');
	$nameError = document.querySelector('#nameError');
	$phoneError = document.querySelector('#phoneError');
	$listBox = document.querySelector('#listBox');
};

const initEvents = () => {
	$formBtn.addEventListener('click', handleSubmit);
	$nameInput.addEventListener('input', handleNameValidation);
	$phoneInput.addEventListener('input', handlePhoneValidation);
	$listBox.addEventListener('click', handleRemove);
};

const handleSubmit = (e) => {
	e.preventDefault();

	if (!$isNameValid) {
		$nameInput.classList.add('invalid');
		$nameError.classList.add('animate-invalid');
	}
	if (!$isPhoneValid) {
		$phoneInput.classList.add('invalid');
		$phoneError.classList.add('animate-invalid');
	}

	if (!$isPhoneValid || !$isNameValid) {
		e.target.classList.add('animate-shake');
		setTimeout(() => {
			e.target.classList.remove('animate-shake');
		}, DEBOUNCE_TIME + 200);
		return;
	}

	let phoneNumber = String($phoneInput.value.replace(/\s/g, ''));
	if (phoneNumber.length === 13 && phoneNumber.charAt(0) === '+') {
		phoneNumber =
			phoneNumber.substring(0, 4) +
			' ' +
			phoneNumber.substring(4).replace(/(.{3})/g, '$1 ');
	} else {
		phoneNumber = phoneNumber.replace(/(.{3})/g, '$1 ');
	}

	const listItemTemplate = `
  <div class="item card">
  <div class="item__left-box">
    <p class="item__name">${$nameInput.value}</p>
    <p class="item__number">${phoneNumber}</p>
  </div>
  <div class="item__icon-box">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      stroke-linecap="round"
      stroke-linejoin="round"
      class="feather feather-trash-2 item__icon"
    >
      <polyline points="3 6 5 6 21 6"></polyline>
      <path
        d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"
      ></path>
      <line x1="10" y1="11" x2="10" y2="17"></line>
      <line x1="14" y1="11" x2="14" y2="17"></line>
    </svg>
  </div>
</div>`;
	$listBox.insertAdjacentHTML('beforeend', listItemTemplate);
	$listBox.scrollTop = $listBox.scrollHeight + 20;

	$nameInput.value = '';
	$phoneInput.value = '';
	$isNameValid = false;
	$isPhoneValid = false;
	removeStates();
};

const handleRemove = (e) => {
	if (e.target.closest('div').classList.contains('item__icon-box')) {
		const item = e.target.closest('.item');
		item.remove();
	}
};

const removeStates = () => {
	$nameInput.classList.remove('invalid', 'valid');
	$phoneInput.classList.remove('invalid', 'valid');
	$phoneError.classList.remove('animate-invalid', 'animate-valid');
	$nameError.classList.remove('animate-invalid', 'animate-valid');
};

const handleNameValidation = (e) => {
	const currentValue = e.target.value;
	const nameCondition =
		/^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð '-]+$/u;

	$isNameValid =
		!!currentValue.match(nameCondition) &&
		currentValue.trim().length > 0 &&
		isEachCapitalized(currentValue);

	handleInputState($nameInput, $nameError, $isNameValid);
};

const handlePhoneValidation = (e) => {
	const currentValue = e.target.value;
	const phoneCondition = /(^\+48\d{9}|^\+048\d{9}|^\d{9})$/;

	$isPhoneValid =
		!!currentValue.replace(/\s/g, '').match(phoneCondition) &&
		currentValue.trim().length > 0;

	handleInputState($phoneInput, $phoneError, $isPhoneValid);
};

const handleInputState = (inputEl, errorEl, isValid) => {
	clearTimeout($debounceTimerId);
	$debounceTimerId = setTimeout(() => {
		if (isValid) {
			inputEl.classList.remove('invalid');
			inputEl.classList.add('valid');

			if (errorEl.classList.contains('animate-invalid')) {
				errorEl.classList.remove('animate-invalid');
				errorEl.classList.add('animate-valid');
			}
		} else if (inputEl.value.trim().length === 0) {
			inputEl.classList.remove('invalid', 'valid');
			errorEl.classList.remove('animate-invalid');
			errorEl.classList.remove('animate-valid');
		} else {
			inputEl.classList.remove('invalid');
			inputEl.classList.add('invalid');

			errorEl.classList.remove('animate-valid');
			errorEl.classList.add('animate-invalid');
		}
	}, DEBOUNCE_TIME);
};

const isEachCapitalized = (text) => {
	const words = text.split(' ');
	return words.every((word) => word.charAt(0).match(/[A-Z]/));
};

const main = () => {
	init();
	initEvents();
};

document.addEventListener('DOMContentLoaded', main);

