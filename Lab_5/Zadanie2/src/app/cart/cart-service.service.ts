import { EventEmitter, Injectable } from '@angular/core';
import { Trip } from '../trips.component';
import { TripsService } from '../trips.service';

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
}

