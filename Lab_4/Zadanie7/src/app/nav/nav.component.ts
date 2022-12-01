import { Component, OnInit } from '@angular/core';
import { CartServiceService } from '../cart-service.service';

@Component({
	selector: 'app-nav',
	templateUrl: './nav.component.html',
	styleUrls: ['./nav.component.scss'],
})
export class NavComponent implements OnInit {
	isShaking = false;
	constructor(private cartService: CartServiceService) {}
	ngOnInit(): void {
		this.cartService.lol.subscribe(() => {
			this.isShaking = true;

			setTimeout(() => {
				this.isShaking = false;
			}, 500);
		});
	}

	getCartItmesSize() {
		return this.cartService.items.length;
	}
}

