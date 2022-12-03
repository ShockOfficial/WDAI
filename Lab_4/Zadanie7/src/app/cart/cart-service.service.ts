import { EventEmitter, Injectable } from '@angular/core';
import { Trip } from '../trips.component';

@Injectable({
	providedIn: 'root',
})
export class CartService {
	items: Trip[] = [];
	onAddToCart = new EventEmitter();
	onCartOpen = new EventEmitter();
	isCartOpen: boolean = false;
	constructor() {}

	addToCart(item: Trip) {
		this.items.push(item);
		this.onAddToCart.emit();
	}

	toggleCart(isVisible: boolean) {
		this.isCartOpen = isVisible;
	}

	removeFromCart(item: Trip) {
		const index = this.items.indexOf(item);
		this.items = this.items.slice(0, index).concat(this.items.slice(index + 1));
	}
}

