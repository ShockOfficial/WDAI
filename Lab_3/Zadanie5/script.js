let $redBox;
let $yellowBox;
let $greyBox;
let $messageBox;
let $timerId;
let $score;
let $startBtn;
let $resetBtn;
let $switchBtn;
let $isPropagation;
let $propagationDirection;

const init = () => {
	$redBox = document.querySelector('#boxRed');
	$yellowBox = document.querySelector('#boxYellow');
	$greyBox = document.querySelector('#boxGrey');
	$messageBox = document.querySelector('#messageBox');
	$score = document.querySelector('#score');
	$startBtn = document.querySelector('#startBtn');
	$resetBtn = document.querySelector('#resetBtn');
	$switchBtn = document.querySelector('#switchBtn');
	$isPropagation = true;
	$propagationDirection = false;
};

const initEvents = () => {
	$greyBox.addEventListener('click', handleClickEvent, $propagationDirection);
	$redBox.addEventListener('click', handleClickEvent, $propagationDirection);
	$yellowBox.addEventListener('click', handleClickEvent, $propagationDirection);
	$resetBtn.addEventListener('click', resetHandler);
	$switchBtn.addEventListener('click', changeDirectionHandler);
	$startBtn.addEventListener('click', stopPropagationHandler);
};

const resetHandler = () => {
	$score.textContent = 0;
	$redBox.classList.remove('disabled');
	$yellowBox.classList.remove('disabled');
	$greyBox.classList.remove('disabled');
	removeTaskEvents();

	$isPropagation = true;
	$propagationDirection = false;
	$messageBox.textContent = '';
	$startBtn.textContent = 'stop propagation';
	initEvents();
};

const stopPropagationHandler = () => {
	$startBtn.textContent = $isPropagation
		? 'Start propagation'
		: 'Stop propagation';
	$isPropagation = !$isPropagation;
};

const changeDirectionHandler = async () => {
	removeTaskEvents();
	$propagationDirection = !$propagationDirection;
	initEvents();
};

const handleClickEvent = (e) => {
	const currentScore = Number($score.textContent);
	if (!$isPropagation) {
		e.stopPropagation();
	}

	if (
		(e.target === $redBox && currentScore > 30) ||
		(e.target === $yellowBox && currentScore > 50)
	)
		return;

	const { point } = e.currentTarget.dataset;
	displayMessage(point);
	$score.textContent = currentScore + Number(point);
	if ($score.textContent > 50) {
		disbaleEvent($yellowBox, 'click', handleClickEvent);
	}
	if ($score.textContent > 30) {
		disbaleEvent($redBox, 'click', handleClickEvent);
	}
};

const displayMessage = (point) => {
	clearTimeout($timerId);

	const messageTemplate = `
  <p id="infoText" class="info-text">
  Nacisnąłeś ${mapPointToColor(point)} o wartości ${point}
  </p>`;
	$messageBox.insertAdjacentHTML('beforeend', messageTemplate);
	$messageBox.scrollTop = $messageBox.scrollHeight;
	$timerId = setTimeout(() => {
		$messageBox.textContent = '';
	}, 3000);
};

const mapPointToColor = (points) => {
	switch (+points) {
		case 1:
			return 'szary';
		case 2:
			return 'czerwony';
		case 5:
			return 'żółty';
	}
};

const disbaleEvent = (element, eventType, eventHandler) => {
	element.classList.add('disabled');
	removeEvent(element, eventType, eventHandler);
};

const removeTaskEvents = () => {
	removeEvent($redBox, 'click', handleClickEvent);
	removeEvent($yellowBox, 'click', handleClickEvent);
	removeEvent($greyBox, 'click', handleClickEvent);
};

const removeEvent = (element, eventType, eventHandler) => {
	element.removeEventListener(eventType, eventHandler, false);
	element.removeEventListener(eventType, eventHandler, true);
};
const main = () => {
	init();
	initEvents();
};

document.addEventListener('DOMContentLoaded', main);

