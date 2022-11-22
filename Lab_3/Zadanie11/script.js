let $tableBody;
let $tableHead;
let $currPage;
let $subregionFilters;
let $countryFilters;
let $capitalFilters;
let $currentState = {
	renderedElements: 0,
	data: [],
	itemToRender: [],
	appliedFilters: {
		capital: [],
		subregion: [],
		country: [],
	},
};

const createBigRowEl = (data) => {
	const { subregion, area, population, flag } = data;
	return `
  <tr class="table__row">
  <td class="table__data table__data--big" colspan="2" data-subregion="${subregion.replace(
		' ',
		';',
	)}">${subregion} ${flag} </td>
  <td class="table__data  table__data--center" >${population}</td>
  <td class="table__data  table__data--center" >${area}</td>
</tr>
`;
};

const createSmallRowEl = (data) => {
	const { subregion, area, population, name, capital = 'Empty' } = data;
	return `<tr class="table__row" data-subregion="${subregion.replace(
		' ',
		';',
	)}">
  <td class="table__data table__data--center">${name}</td>
  <td class="table__data table__data--center" data-capital=${capital}>${capital}</td>
  <td class="table__data table__data--center" data-population=${population}>${population}</td>
  <td class="table__data table__data--center" data-area=${area}>${area}</td>
</tr>`;
};

const handleClickRow = (e) => {
	const subregion = e.target.dataset.subregion;

	if (e.target.dataset.clicked === 'true') {
		e.target.dataset.clicked = false;
		const elList = [
			...document.querySelectorAll(`tr[data-subregion="${subregion}"]`),
		];
		elList.forEach((item) => {
			item.remove();
		});
		return;
	}
	if (e.target.classList.contains('table__data--big')) {
		e.target.dataset.clicked = true;

		const data = $currentState.data
			.filter(
				(item) =>
					item.subregion && item.subregion.replace(' ', ';') === subregion,
			)
			.forEach((item) => {
				const template = createSmallRowEl(item);
				e.target.parentElement.insertAdjacentHTML('afterend', template);
			});

		$currPage = 0;
	}
};

const handleFilterClick = (e) => {
	const filterType = e.target.dataset.filter;
	if (e.target.checked) {
		$currentState.appliedFilters[filterType].push(e.target.id);
	} else {
		$currentState.appliedFilters[filterType] = $currentState.appliedFilters[
			filterType
		].filter((item) => item !== e.target.id);
	}

	let toRender = $currentState.data;

	if ($currentState.appliedFilters.subregion.length > 0) {
		toRender = toRender.filter((item) =>
			$currentState.appliedFilters.subregion.find(
				(el) => el === item.subregion,
			),
		);
	}

	if ($currentState.appliedFilters.capital.length > 0) {
		toRender = toRender.filter((item) => {
			return $currentState.appliedFilters.capital.find(
				(el) => item.capital && el === item.capital[0],
			);
		});
	}

	if ($currentState.appliedFilters.country.length > 0) {
		toRender = toRender.filter((item) => {
			return $currentState.appliedFilters.country.find(
				(el) => el === item.name,
			);
		});
	}

	const list = document.querySelectorAll('input:checked');
	if (list.length === 0) {
		render();
		return;
	}
	render(toRender);
};

const createItems = (dataaa, agregatedData) => {
	for (const subregion in agregatedData) {
		if (Object.hasOwnProperty.call(agregatedData, subregion)) {
			const data = agregatedData[subregion];
			const template = createBigRowEl({ ...data, subregion });

			// TODO insert to array insted of DOM
			// $tableBody.insertAdjacentHTML('beforeend', template);
			$currentState.itemToRender = [...$currentState.itemToRender, template];
		}
	}
};

const fetchData = async (url = '') => {
	try {
		const res = await fetch(url);

		if (!res.ok) throw new Error(res.statusText);
		return await res.json();
	} catch (e) {
		console.log(e);
	}
};

const handleSortByColumn = (e) => {
	let toRender;
	if (e.target.textContent === 'Name') {
		toRender = [...$tableBody.querySelectorAll('tr:not([data-subregion])')];
		toRender = toRender.sort((a, b) => {
			return a.children[0].textContent.slice(0, -5) >
				b.children[0].textContent.slice(0, -5)
				? 1
				: -1;
		});
	}

	if (e.target.textContent === 'Capital') {
		toRender = [...$tableBody.querySelectorAll('tr:has(td[data-capital])')];
		toRender = toRender.sort((a, b) =>
			a.children[1].textContent > b.children[1].textContent ? 1 : -1,
		);
	}

	if (e.target.textContent === 'Population') {
		toRender = [...$tableBody.querySelectorAll('tr')];
		toRender = toRender.sort((a, b) =>
			+a.children[2].textContent > +b.children[2].textContent ? 1 : -1,
		);
	}

	if (e.target.textContent === 'Area') {
		toRender = [...$tableBody.querySelectorAll('tr')];
		toRender = toRender.sort((a, b) => {
			return a.children[3] &&
				b.children[3] &&
				+a.children[3].textContent > +b.children[3].textContent
				? 1
				: -1;
		});
	}

	if (e.target.dataset.sort === 'true') {
		toRender = toRender.reverse();
		e.target.dataset.sort = false;
	} else {
		e.target.dataset.sort = true;
	}
	if (toRender.length > 0) {
		$tableBody.innerHTML = '';
		$tableBody.append(...toRender);
	}
};

const getNextPage = (data, limit = 20) => {
	const paginatedData = data.slice($currPage * limit, limit * ($currPage + 1));
	$currPage += 1;
	return paginatedData;
};

const getPrevPage = (data, limit = 20) => {
	const paginatedData = data.slice(($currPage - 1) * limit, limit * $currPage);
	$currPage -= 1;
	return paginatedData;
};

const initFilters = () => {
	const subregionList = document.querySelector('#subregionList');
	const countryList = document.querySelector('#countryList');
	const capitallist = document.querySelector('#capitalList');

	$subregionFilters.forEach((subregion) => {
		subregionList.insertAdjacentHTML(
			'beforeend',
			createFilterEl(subregion, 'subregion'),
		);
	});

	$capitalFilters.forEach((capital) => {
		capitallist.insertAdjacentHTML(
			'beforeend',
			createFilterEl(capital, 'capital'),
		);
	});

	$countryFilters.forEach((country) => {
		countryList.insertAdjacentHTML(
			'beforeend',
			createFilterEl(country, 'country'),
		);
	});
};
const collectData = (data) => {
	const container = {};
	data.forEach(({ subregion, area, population, flag, name, capital }) => {
		if (subregion) $subregionFilters.add(subregion);
		if (capital) $capitalFilters.add(...capital);
		if (name) $countryFilters.add(name);

		if (subregion && !container[subregion]) {
			container[subregion] = {
				flag,
				area,
				population,
			};
		} else if (subregion) {
			container[subregion].area += area;
			container[subregion].population += area;
		}
	});
	return container;
};

const createFilterEl = (filed, filter) => {
	return `
  <div class="form__list-item">
  <label for="${filed}" class="form__label">${filed}</label>
  <input id="${filed}" type="checkbox" class="form__input" data-filter="${filter}" />
</div>
  `;
};

const render = (data) => {
	$tableBody.innerHTML = '';
	if (data) {
		data.forEach((item) => {
			$tableBody.insertAdjacentHTML('beforeend', createSmallRowEl(item));
		});
		return;
	}

	$currentState.itemToRender.forEach((item) => {
		$tableBody.insertAdjacentHTML('beforeend', item);
	});
};

const initEvents = () => {
	$tableBody.addEventListener('click', handleClickRow);
	$tableHead.addEventListener('click', handleSortByColumn);
	$form.addEventListener('input', handleFilterClick);
};

const init = async () => {
	$tableBody = document.querySelector('#tableBody');
	$tableHead = document.querySelector('#tableHead');
	$form = document.querySelector('#form');

	$subregionFilters = new Set();
	$countryFilters = new Set();
	$capitalFilters = new Set();
	$currPage = 0;

	const data = await fetchData('https://restcountries.com/v3.1/all');
	const formatedData = data.map((item) => ({
		name: item.name.common,
		subregion: item.subregion,
		area: item.area,
		population: item.population,
		flag: item.flag,
		capital: item.capital,
	}));

	// Calculate needed data for labels
	const subregionAgregatedData = collectData(formatedData);
	$currentState.data = formatedData;

	initFilters();
	initEvents();
	createItems(formatedData, subregionAgregatedData);
	render();
};

window.addEventListener('DOMContentLoaded', init);

