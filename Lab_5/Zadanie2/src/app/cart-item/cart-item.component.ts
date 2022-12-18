import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CurrencyService } from '../currency-switcher/currency-service.service';
import { Trip } from '../trip/trip.model';
@Component({
	selector: 'app-cart-item',
	templateUrl: './cart-item.component.html',
	styleUrls: ['./cart-item.component.scss'],
})
export class CartItemComponent implements OnInit {
	@Input() trip: Trip & { quantity: number };
	@Input() isLast: boolean = false;
	@Output() onBuyTrip = new EventEmitter<Trip & { quantity: number }>();
	constructor(private currencyService: CurrencyService) {}

	getCurrentCurrency() {
		return this.currencyService.currenctCurrency;
	}

	ngOnInit(): void {}

	buyTrip() {
		this.onBuyTrip.emit(this.trip);
	}
}

