import { Component, OnInit } from '@angular/core';
import { Trip } from '../trips.component';
import { FiltersService } from '../filters/filters.service';
import { CartService } from '../cart/cart-service.service';
import { Currency } from '../currency-switcher/currency-service.service';
import { TripsService } from '../trips.service';

@Component({
	selector: 'app-trip-list-screen',
	templateUrl: './trip-list-screen.component.html',
	styleUrls: ['./trip-list-screen.component.scss'],
})
export class TripListScreenComponent implements OnInit {
	trips: Trip[];
	constructor(
		private filtersService: FiltersService,
		private tripsService: TripsService,
	) {
		this.trips = tripsService.trips;
	}

	ngOnInit(): void {
		this.filtersService.notify.subscribe(() => {
			this.trips = [...this.trips];
		});
		// this.filtersService.fetchTrips.subscribe(() => {
		// 	this.filtersService.trips = this.trips;
		// });
	}

	onRemoveTrip(trip: Trip) {
		this.trips = this.tripsService.removeTrip(trip);
	}

	onDistinctTrip() {
		this.tripsService.distinctSpecialTrips();
	}
}

