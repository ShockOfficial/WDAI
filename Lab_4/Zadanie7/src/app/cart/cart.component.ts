import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {
	Currency,
	CurrencyService,
} from '../currency-switcher/currency-service.service';
import { Trip } from '../trips.component';
import { CartService } from './cart-service.service';

@Component({
	selector: 'app-cart',
	templateUrl: './cart.component.html',
	styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
	cartList: (Trip & { quantity: number })[];
	totalSum: number = 0;
	tripCurrency: Currency = 'PLN';
	@ViewChild('overlay', { static: true }) overlay: ElementRef;
	constructor(
		private cartService: CartService,
		private currencyService: CurrencyService,
	) {}

	closeCart(e: Event) {
		const element = e.target as HTMLElement;
		if (
			element === this.overlay.nativeElement ||
			element.classList.contains('cart__exit')
		) {
			this.cartService.toggleCart(false);
		}
	}
	ngOnInit(): void {
		const map = new Map<Trip, number>();
		this.cartService.items.forEach((item) => {
			const quantity = this.cartService.items.reduce((acc, curr) => {
				if (curr === item) {
					return acc + 1;
				} else {
					return acc;
				}
			}, 0);
			map.set(item, quantity);
		});
		this.cartList = Array.from(map, ([trip, quantity]) => ({
			...trip,
			quantity,
		}));

		this.totalSum = this.cartList.reduce(
			(acc, curr) => acc + curr.quantity * curr.price,
			0,
		);
		if (this.cartList.length) {
			this.tripCurrency = this.cartList[0].currency;
		}
	}
	getCurrency() {
		return this.currencyService.currenctCurrency;
	}
}

