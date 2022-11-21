let $tableBody;
let $currPage;
let $subregionFilters;
let $countryFilters;
let $capitalFilters;
let $currentState = {
	renderedElements: 0,
	data: [],
};

const createBigRowEl = (data) => {
	const { subregion, area, population, flag } = data;
	return `
  <tr class="table__row">
  <td class="table__data table__data--big" colspan="2">${subregion} ${flag} </td>
  <td class="table__data table__data--big table__data--center">${population}</td>
  <td class="table__data table__data--big table__data--center" >${area}</td>
</tr>
`;
};

const createSmallRowEl = (data) => {
	const { subregion, area, population, name, capital = 'Empty' } = data;
	return `<tr class="table__row table__row--colapsed">
  <td class="table__data table__data--center">${name}</td>
  <td class="table__data table__data--center">${capital}</td>
  <td class="table__data table__data--center">${population}</td>
  <td class="table__data table__data--center">${area}</td>
</tr>`;
};

// TODO add active class to cliked row childs.
const handleClickRow = (e) => {
	if (e.target.classList.contains('table__data--big')) {
		console.log('click');
	}
};

const createItems = (data) => {};

const fetchData = async (url = '') => {
	try {
		const res = await fetch(url);

		if (!res.ok) throw new Error(res.statusText);
		return await res.json();
	} catch (e) {
		console.log(e);
	}
};

const getNextPage = (data, limit = 20) => {
	const paginatedData = data.slice($currPage * limit, limit * ($currPage + 1));

	$currPage += 1;
	return paginatedData;
};

const initEvents = () => {
	$tableBody.addEventListener('click', handleClickRow);
};

const init = async () => {
	$tableBody = document.querySelector('#tableBody');

	$subregionFilters = new Set();
	$countryFilters = new Set();
	$capitalFilters = new Set();
	$currPage = 0;

	initEvents();

	const data = await fetchData('https://restcountries.com/v3.1/all');
	const formatedData = data.map((item) => ({
		name: item.name.common,
		subregion: item.subregion,
		area: item.area,
		population: item.population,
		flag: item.flag,
		capital: item.capital,
	}));

	const subregionAgregatedData = {};

	// Calculate needed data for labels
	// TODO  to seperate function
	formatedData.forEach(
		({ subregion, area, population, flag, name, capital }) => {
			if (subregion) $subregionFilters.add(subregion);
			if (capital) $capitalFilters.add(...capital);
			if (name) $countryFilters.add(name);

			if (subregion && !subregionAgregatedData[subregion]) {
				subregionAgregatedData[subregion] = {
					flag,
					area,
					population,
				};
			} else if (subregion) {
				subregionAgregatedData[subregion].area += area;
				subregionAgregatedData[subregion].population += area;
			}
		},
	);

	console.log(subregionAgregatedData);
	console.log($capitalFilters);
	console.log($countryFilters);
	console.log($subregionFilters);
	// TODO to seperate function
	// TODO create array of items first because we need paggination
	for (const subregion in subregionAgregatedData) {
		if (Object.hasOwnProperty.call(subregionAgregatedData, subregion)) {
			const data = subregionAgregatedData[subregion];
			const template = createBigRowEl({ ...data, subregion });

			// TODO insert to array insted of DOM
			$tableBody.insertAdjacentHTML('beforeend', template);
		}
	}
	// console.log(formatedData);
};
// TODO render method which will be rendering current page

//TODO implement filtering. Show options above table like a input with opion list. (checkbox) fill it dynamically by getting unique values (subregions, capitals,)

window.addEventListener('DOMContentLoaded', init);

