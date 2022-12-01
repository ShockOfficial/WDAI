import {
	Component,
	DoCheck,
	EventEmitter,
	Input,
	OnInit,
	Output,
} from '@angular/core';
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
	@Input() isMostExpensive?: boolean;
	reservedAmount: number = 0;
	constructor(private currencyService: CurrencyService) {}

	ngOnInit(): void {}

	getCurrentCurrency() {
		return this.currencyService.currenctCurrency;
	}

	onButtonClick(e: Event, isAdding: boolean) {
		// TODO refactor maybe?
		if (isAdding) {
			this.reservedAmount++;
			this.trip.currentAmount--;
		} else {
			this.trip.currentAmount++;
			this.reservedAmount--;
			this.distinctTripsHandler.emit();
		}
		if (
			this.trip.currentAmount === 0 &&
			this.trip.isMostExpensive !== undefined
		) {
			this.isMostExpensive = undefined;
			this.distinctTripsHandler.emit();
		}
	}
}

