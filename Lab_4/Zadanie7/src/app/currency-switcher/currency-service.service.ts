import { EventEmitter, Injectable } from '@angular/core';

export type Currency = 'PLN' | 'USD' | 'EUR';

@Injectable({
	providedIn: 'root',
})
export class CurrencyService {
	currenctCurrency: Currency = 'PLN';
	onCurrencyChange = new EventEmitter();
	constructor() {}

	changeCurrency(clickedCurrency: Currency) {
		this.currenctCurrency = clickedCurrency;
	}
}
