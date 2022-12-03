import { Component, Input, OnInit } from '@angular/core';
import { CurrencyService } from '../currency-switcher/currency-service.service';
import { Trip } from '../trips.component';

@Component({
	selector: 'app-cart-item',
	templateUrl: './cart-item.component.html',
	styleUrls: ['./cart-item.component.scss'],
})
export class CartItemComponent implements OnInit {
	@Input() trip: Trip & { quantity: number };
	constructor(private currencyService: CurrencyService) {}

	getCurrentCurrency() {
		return this.currencyService.currenctCurrency;
	}

	ngOnInit(): void {}
}

