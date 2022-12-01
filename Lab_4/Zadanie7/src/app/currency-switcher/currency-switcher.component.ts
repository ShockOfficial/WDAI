import { Component, OnInit } from '@angular/core';
import { Currency, CurrencyService } from './currency-service.service';

@Component({
	selector: 'app-currency-switcher',
	templateUrl: './currency-switcher.component.html',
	styleUrls: ['./currency-switcher.component.scss'],
})
export class CurrencySwitcherComponent implements OnInit {
	constructor(private currencyService: CurrencyService) {}

	ngOnInit(): void {}

	onClickHandler(currecny: string) {
		this.currencyService.changeCurrency(currecny as Currency);
	}

	getActiveCurrency() {
		return this.currencyService.currenctCurrency;
	}
}

