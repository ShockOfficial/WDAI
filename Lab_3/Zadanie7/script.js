let $sectionA;
let $sectionB;
let $sectionC;
let $sectionD;
let $sectionE;
let $sectionF;
let $sectionG;
let $ERROR_TIMEOUT;
let $globalData;

const init = async () => {
	$sectionA = document.querySelector('#sectionA');
	$sectionB = document.querySelector('#sectionB');
	$sectionC = document.querySelector('#sectionC');
	$sectionD = document.querySelector('#sectionD');
	$sectionE = document.querySelector('#sectionE');
	$sectionF = document.querySelector('#sectionF');
	$sectionG = document.querySelector('#sectionG');
	$ERROR_TIMEOUT = 3000;

	$globalData = await fetchCites();
	answerA();
	answerB();
	answerC();
	answerD();
	answerE();
	answerF();
	answerG();
};

const createTemplateElement = (text) => {
	return `<li class="card__list-item">${text}</li>`;
};

const fetchCites = async () => {
	try {
		const res = await fetch('http://localhost:3000/cities');
		if (!res.ok) throw new Error(res.statusText);
		return await res.json();
	} catch (e) {
		renderError(`ERROR: ${e.message}`);
	}
};

const renderError = (text) => {
	const template = `
  <div class="info-box show">
			<p class="info-box__message">${text}</p>
		</div>`;
	document.body.insertAdjacentHTML('beforeend', template);

	setTimeout(() => {
		document.body.querySelector('div.info-box').remove();
	}, $ERROR_TIMEOUT);
};

const addItemToSection = (section, data, property) => {
	data.forEach((item) => {
		section.insertAdjacentHTML(
			'beforeend',
			createTemplateElement(item[property]),
		);
	});
};

const answerA = () => {
	const data = $globalData.filter((item) => item.province === 'małopolskie');
	addItemToSection($sectionA, data, 'name');
};

const answerB = () => {
	const data = $globalData.filter(
		(item) => [...(item.name.match(/a/gi) || '')].length === 2,
	);
	addItemToSection($sectionB, data, 'name');
};

const answerC = () => {
	const data = $globalData.slice().sort((a, b) => b.dentensity - a.dentensity);
	addItemToSection($sectionC, data.slice(4, 5), 'name');
};

const answerD = () => {
	const data = $globalData.map((item) => {
		if (item.people >= 100000) {
			return { ...item, name: item.name + ' city' };
		}
		return item;
	});
	addItemToSection($sectionD, data, 'name');
};

const answerE = () => {
	let below80k = 0;
	let above80k = 0;
	$globalData.forEach((item) =>
		item.people > 80_000 ? above80k++ : below80k++,
	);
	const content =
		below80k < above80k
			? `Więcej jest powyżej 80000 (${above80k})`
			: `Więcej jest poniżej 80000 (${below80k})`;
	$sectionE.insertAdjacentHTML('beforeend', createTemplateElement(content));
};

const answerF = () => {
	const data = $globalData.filter((item) => item.township.charAt(0) === 'P');
	const sumOfArea = data.reduce((acc, curr) => acc + curr.area, 0);
	$sectionF.insertAdjacentHTML(
		'beforeend',
		createTemplateElement(`Średnia = ${sumOfArea / data.length}`),
	);
};

const answerG = () => {
	const data = $globalData.filter((item) => item.province === 'pomorskie');
	const isEvery = data.every((item) => item.people > 5000);
	const count = data.reduce(
		(acc, curr) => (curr.people > 5000 ? acc + 1 : acc),
		0,
	);
	let text = isEvery ? `Wszystkie są większe.` : `Nie wszystkie są większe.`;
	text += ` Jest ich ${count}`;
	$sectionG.insertAdjacentHTML('beforeend', createTemplateElement(text));
};
document.addEventListener('DOMContentLoaded', init);

