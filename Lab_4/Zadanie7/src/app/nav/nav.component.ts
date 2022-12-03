import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart/cart-service.service';

@Component({
	selector: 'app-nav',
	templateUrl: './nav.component.html',
	styleUrls: ['./nav.component.scss'],
})
export class NavComponent implements OnInit {
	isShaking = false;
	constructor(private cartService: CartService) {}
	ngOnInit(): void {
		this.cartService.onAddToCart.subscribe(() => {
			this.isShaking = true;

			setTimeout(() => {
				this.isShaking = false;
			}, 500);
		});
	}

	onCartClick() {
		this.cartService.toggleCart(true);
	}

	getCartItmesSize() {
		return this.cartService.items.length;
	}
}

