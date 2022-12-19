import { Component, OnInit } from '@angular/core';
import { FiltersService } from '../filters/filters.service';
import { TripsService } from '../trips.service';
import { Trip } from '../trip/trip.model';

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

		const tripObservable = this.tripsService.getTripsFromDb();
		if (tripObservable) {
			tripObservable.subscribe(() => {
				this.trips = [...this.tripsService.trips];
			});
		}
	}

	onRemoveTrip(trip: Trip) {
		this.trips = this.tripsService.removeTrip(trip);
		this.filtersService.notify.emit();
	}

	onDistinctTrip() {
		this.tripsService.distinctSpecialTrips();
	}
}

