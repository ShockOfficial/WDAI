import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-filters',
	templateUrl: './filters.component.html',
	styleUrls: ['./filters.component.scss'],
})
export class FiltersComponent implements OnInit {
	selectedRates: number[] = [];
	constructor() {}

	ngOnInit(): void {}

	clickHanlder(e: Event) {
		const el = e.target as HTMLElement;
		const rate = el.dataset['rate'];
		if (!rate) return;

		if (!this.selectedRates.includes(+rate)) {
			this.selectedRates.push(+rate);
		} else {
			this.selectedRates = this.selectedRates.filter((a) => a !== +rate);
		}
	}
}

