import {
	Component,
	DoCheck,
	EventEmitter,
	Input,
	OnInit,
	Output,
} from '@angular/core';
import { CartServiceService } from '../cart-service.service';
import { CurrencyService } from '../currency-switcher/currency-service.service';
import { Trip } from '../trips.component';

@Component({
	selector: 'app-trip',
	templateUrl: './trip.component.html',
	styleUrls: ['./trip.component.scss'],
})
export class TripComponent implements OnInit {
	@Input() trip: Trip;
	@Output() distinctTripsHandler = new EventEmitter();
	@Output() onRemoveTrip = new EventEmitter<Trip>();
	@Input() isMostExpensive?: boolean;
	reservedAmount: number = 0;
	rate: number = 0;
	stars = [1, 2, 3, 4, 5];
	constructor(
		private currencyService: CurrencyService,
		private cartService: CartServiceService,
	) {}

	ngOnInit(): void {}

	getCurrentCurrency() {
		return this.currencyService.currenctCurrency;
	}

	onButtonClick(e: Event, isAdding: boolean) {
		// TODO refactor maybe?
		if (isAdding) {
			this.reservedAmount++;
			this.trip.currentAmount--;
			this.cartService.addToCart(this.trip);
		} else {
			this.trip.currentAmount++;
			this.reservedAmount--;
			this.distinctTripsHandler.emit();
			this.cartService.removeFromCart(this.trip);
		}

		if (
			this.trip.currentAmount === 0 &&
			this.trip.isMostExpensive !== undefined
		) {
			this.isMostExpensive = undefined;
			this.distinctTripsHandler.emit();
		}
	}

	onRemoveClick() {
		this.onRemoveTrip.emit(this.trip);
		this.distinctTripsHandler.emit();
	}

	rateTrip(rate: number) {
		this.rate = rate;
	}
}

