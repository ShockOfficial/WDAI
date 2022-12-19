import {
	Component,
	HostListener,
	OnInit,
	ViewEncapsulation,
} from '@angular/core';
import { CartService } from '../cart/cart-service.service';
import { Router } from '@angular/router';
import { CurrencyService } from '../currency-switcher/currency-service.service';
import { TripsService } from '../trips.service';

@Component({
	selector: 'app-nav',
	templateUrl: './nav.component.html',
	styleUrls: ['./nav.component.scss'],
	encapsulation: ViewEncapsulation.ShadowDom,
})
export class NavComponent implements OnInit {
	isShaking = false;
	isMenuOpen = false;
	isMobbile = false;
	isIncoming = false;
	totalSum: number;

	constructor(
		private cartService: CartService,
		private router: Router,
		private currencyService: CurrencyService,
		private tripService: TripsService,
	) {}
	ngOnInit(): void {
		this.cartService.onAddToCart.subscribe(() => {
			this.isShaking = true;

			setTimeout(() => {
				this.isShaking = false;
			}, 500);
		});

		this.tripService.incomingTrip.subscribe(
			(isIncoming) => (this.isIncoming = isIncoming),
		);
	}

	@HostListener('window:resize', ['$event'])
	onResize(event: Event) {
		const target = event.target as Window;
		this.isMobbile = target.innerWidth <= 650;

		if (!this.isMobbile) {
			this.isMenuOpen = false;
		}
	}

	onCartClick() {
		this.router.navigate(['cart']);
	}

	onProfileClick() {
		this.router.navigate(['profile']);
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

