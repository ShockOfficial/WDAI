import { Component, HostListener, OnInit } from '@angular/core';
import { CartService } from '../cart/cart-service.service';
import { Router } from '@angular/router';
import { CurrencyService } from '../currency-switcher/currency-service.service';

@Component({
	selector: 'app-nav',
	templateUrl: './nav.component.html',
	styleUrls: ['./nav.component.scss'],
})
export class NavComponent implements OnInit {
	isShaking = false;
	isMenuOpen = false;
	isMobbile = false;
	totalSum: number;

	constructor(
		private cartService: CartService,
		private router: Router,
		private currencyService: CurrencyService,
	) {}
	ngOnInit(): void {
		this.cartService.onAddToCart.subscribe(() => {
			this.isShaking = true;

			setTimeout(() => {
				this.isShaking = false;
			}, 500);
		});
	}

	@HostListener('window:resize', ['$event'])
	onResize(event: Event) {
		const target = event.target as Window;
		this.isMobbile = target.innerWidth <= 650;
	}

	onCartClick() {
		this.router.navigate(['cart']);
	}

	toggleMenu() {
		this.isMenuOpen = !this.isMenuOpen;
	}

	getCartItmesSize() {
		return this.cartService.getCartSize();
	}

	getCartSum() {
		return this.cartService.getCartInfo().totalSum;
	}

	getCurrency() {
		return this.cartService.getCartInfo().currency;
	}

	getCurrentCurrency() {
		return this.currencyService.currenctCurrency;
	}
}

