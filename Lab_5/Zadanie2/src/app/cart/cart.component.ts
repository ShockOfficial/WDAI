import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {
	Currency,
	CurrencyService,
} from '../currency-switcher/currency-service.service';
import { Trip } from '../trips.component';
import { CartService } from './cart-service.service';
import { TripsService } from '../trips.service';

@Component({
	selector: 'app-cart',
	templateUrl: './cart.component.html',
	styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
	cartList: (Trip & { quantity: number })[];
	totalSum: number = 0;
	tripCurrency: Currency = 'PLN';
	constructor(
		private cartService: CartService,
		private currencyService: CurrencyService,
		private tripsService: TripsService,
	) {}

	ngOnInit(): void {
		const { cartList, currency, totalSum } = this.cartService.getCartInfo();
		this.cartList = cartList;
		this.totalSum = totalSum;
		this.tripCurrency = currency;
	}
	getCurrency() {
		return this.currencyService.currenctCurrency;
	}
}

