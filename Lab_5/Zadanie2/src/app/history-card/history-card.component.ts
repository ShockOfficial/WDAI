import { Component, Input, OnInit } from '@angular/core';
import { Trip, TripStatus } from '../trip/trip.model';

@Component({
	selector: 'app-history-card',
	templateUrl: './history-card.component.html',
	styleUrls: ['./history-card.component.scss'],
})
export class HistoryCardComponent implements OnInit {
	@Input() trip: Trip & { quantity: number; purchaseDate: number };
	constructor() {}

	ngOnInit(): void {}

	getStatus() {
		switch (this.trip.status) {
			case TripStatus.Active:
				return 'Aktywna';
			case TripStatus.After:
				return 'Archiwalna';
			case TripStatus.Before:
				return 'Kupiona';
			case TripStatus.Normal:
				return 'Nie kupiona';
			default:
				return 'Unkown';
		}
	}
}

