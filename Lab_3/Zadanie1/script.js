const spanPrefix = document.querySelector('span#namePrefix');
const spanName = document.querySelector('span#name');
const button = document.querySelector('#btn');
button.addEventListener('click', (e) => {
	const username = prompt('Wpisz swoje imie:');

	if (username.charAt(username.length - 1) === 'a') {
		spanPrefix.textContent = 'Pani ';
	} else {
		spanPrefix.textContent = 'Pan ';
	}
	spanName.textContent = username;
});

