let $playground;
let $ball;

const init = () => {
	$playground = document.querySelector('#playground');
	$ball = document.querySelector('#ball');
};

const initEvents = () => {
	$playground.addEventListener('click', handleBallMove);
};

const handleBallMove = (e) => {
	const rect = e.currentTarget.getBoundingClientRect();
	let x = e.clientX - rect.left - $ball.clientWidth / 2;
	let y = e.clientY - rect.top - $ball.clientHeight / 2;
	x = x < $ball.clientWidth ? x + $ball.clientWidth / 2 : x;
	x = x > rect.width - $ball.clientWidth ? rect.width - $ball.clientWidth : x;
	y = y < $ball.clientHeight ? y + $ball.clientHeight / 2 : y;
	y =
		y > rect.height - $ball.clientHeight ? rect.height - $ball.clientHeight : y;

	$ball.setAttribute('style', `transform: translate(${x}px,${y}px)`);
};

const main = () => {
	init();
	initEvents();
};

document.addEventListener('DOMContentLoaded', main);

