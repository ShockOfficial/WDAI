import {
	Component,
	DoCheck,
	EventEmitter,
	Input,
	OnInit,
	Output,
} from '@angular/core';
import { CartService } from '../cart/cart-service.service';
import { CurrencyService } from '../currency-switcher/currency-service.service';
import { Router } from '@angular/router';
import { ExpensiveStatus, Trip } from './trip.model';
import { TripsService } from '../trips.service';

@Component({
	selector: 'app-trip',
	templateUrl: './trip.component.html',
	styleUrls: ['./trip.component.scss'],
})
export class TripComponent implements OnInit {
	@Input() trip: Trip;
	@Output() distinctTripsHandler = new EventEmitter();
	@Output() onRemoveTrip = new EventEmitter<Trip>();
	@Input() isMostExpensive: ExpensiveStatus;
	reservedAmount: number = 0;
	constructor(
		private currencyService: CurrencyService,
		private cartService: CartService,
		private tripService: TripsService,
		private router: Router,
	) {}

	ngOnInit(): void {
		this.reservedAmount = this.cartService.getQuantity(this.trip);
	}

	getCurrentCurrency() {
		return this.currencyService.currenctCurrency;
	}

	onButtonClick(isAdding: boolean) {
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
			this.trip.isMostExpensive !== 'Normal'
		) {
			this.isMostExpensive = 'Normal';
			this.distinctTripsHandler.emit();
		}
	}

	onRemoveClick() {
		this.onRemoveTrip.emit(this.trip);
		this.distinctTripsHandler.emit();
	}

	goToDetails() {
		this.router.navigate(['details', this.trip.id], {
			queryParams: { reservedAmount: this.reservedAmount },
		});
	}

	getPriceStatus() {
		return this.trip.isMostExpensive.toString();
	}
}

