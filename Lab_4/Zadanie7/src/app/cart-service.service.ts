import { EventEmitter, Injectable } from '@angular/core';
import { Trip } from './trips.component';

@Injectable({
	providedIn: 'root',
})
export class CartServiceService {
	items: Trip[] = [];
	lol = new EventEmitter();
	constructor() {}

	addToCart(item: Trip) {
		this.items.push(item);
		this.lol.emit();
	}

	removeFromCart(item: Trip) {
		const index = this.items.indexOf(item);
		this.items = this.items.slice(0, index).concat(this.items.slice(index + 1));
	}
}

