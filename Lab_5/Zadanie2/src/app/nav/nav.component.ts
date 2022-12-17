import { Component, HostListener, OnInit } from '@angular/core';
import { CartService } from '../cart/cart-service.service';
import { Router } from '@angular/router';

@Component({
	selector: 'app-nav',
	templateUrl: './nav.component.html',
	styleUrls: ['./nav.component.scss'],
})
export class NavComponent implements OnInit {
	isShaking = false;
	isMenuOpen = false;
	isMobbile = false;

	constructor(private cartService: CartService, private router: Router) {}
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
}

