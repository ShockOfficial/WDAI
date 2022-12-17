import { EventEmitter, Injectable } from '@angular/core';
import { Trip } from '../trips.component';
import { TripsService } from '../trips.service';
import { Currency } from '../currency-switcher/currency-service.service';

@Injectable({
	providedIn: 'root',
})
export class CartService {
	items: Trip[] = [];
	onAddToCart = new EventEmitter();
	onCartOpen = new EventEmitter();
	constructor(private tripsService: TripsService) {}

	addToCart(item: Trip) {
		this.items.push(item);
		this.onAddToCart.emit();
	}

	removeFromCart(item: Trip) {
		const index = this.items.indexOf(item);
		this.items = this.items.slice(0, index).concat(this.items.slice(index + 1));
	}

	getCartSize() {
		this.items = this.items.filter(
			(item) =>
				this.tripsService.trips.findIndex((el) => el.id === item.id) !== -1,
		);
		return this.items.length;
	}

	getQuantity(trip: Trip) {
		let count = 0;
		this.items.forEach((item) => {
			count = item.id === trip.id ? count + 1 : count;
		});
		return count;
	}

	getCartInfo(): {
		cartList: (Trip & { quantity: number })[];
		totalSum: number;
		currency: Currency;
	} {
		const map = new Map<Trip, number>();
		this.items.forEach((item) => {
			const quantity = this.items.reduce((acc, curr) => {
				if (curr === item) {
					return acc + 1;
				} else {
					return acc;
				}
			}, 0);
			map.set(item, quantity);
		});
		const cartList = Array.from(map, ([trip, quantity]) => ({
			...trip,
			quantity,
		}));

		const totalSum = cartList.reduce(
			(acc, curr) => acc + curr.quantity * curr.price,
			0,
		);

		const tripCurrency = cartList[0]?.currency || 'PLN';

		return { cartList, totalSum, currency: tripCurrency };
	}
}

