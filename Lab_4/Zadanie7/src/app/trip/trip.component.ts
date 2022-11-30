import {
	Component,
	DoCheck,
	EventEmitter,
	Input,
	OnInit,
	Output,
} from '@angular/core';
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
	constructor() {}

	ngOnInit(): void {}

	onButtonClick(e: Event, isAdding: boolean) {
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

