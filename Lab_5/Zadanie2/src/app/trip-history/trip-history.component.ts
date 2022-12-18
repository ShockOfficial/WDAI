import { Component, OnInit } from '@angular/core';
import { TripsService } from '../trips.service';
import { Trip, TripStatus } from '../trip/trip.model';

@Component({
	selector: 'app-trip-history',
	templateUrl: './trip-history.component.html',
	styleUrls: ['./trip-history.component.scss'],
})
export class TripHistoryComponent implements OnInit {
	tripsInHistory: (Trip & { quantity: number; purchaseDate: number })[];
	filters = ['Kupiona', 'Aktywna', 'Archiwalna'];
	activeFilters: string[] = [];
	constructor(private tripsService: TripsService) {}

	ngOnInit(): void {
		this.tripsInHistory = this.tripsService.boughtTrips;

		this.tripsInHistory = this.tripsInHistory.map((item) => {
			if (
				item.startDate.getTime() < Date.now() &&
				item.endDate.getTime() < Date.now()
			) {
				return { ...item, status: TripStatus.After };
			} else if (
				item.startDate.getTime() < Date.now() &&
				item.endDate.getTime() >= Date.now()
			) {
				return { ...item, status: TripStatus.Active };
			} else {
				return item;
			}
		});
	}

	clickHandler(e: Event) {
		const filter = e.target as HTMLElement;
		if (this.isSelectedHandler(filter.innerText)) {
			this.activeFilters = this.activeFilters.filter(
				(item) => item !== filter.innerText,
			);
		} else {
			this.activeFilters = [...this.activeFilters, filter.innerText];
		}
	}

	isSelectedHandler(filter: string) {
		return this.activeFilters.includes(filter);
	}
}

