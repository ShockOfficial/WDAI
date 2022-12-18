import { Component, OnInit } from '@angular/core';
import { FiltersService } from '../filters/filters.service';
import { TripsService } from '../trips.service';
import { Trip } from '../trip/trip.model';

@Component({
	selector: 'app-add-trip-screen',
	templateUrl: './add-trip-screen.component.html',
	styleUrls: ['./add-trip-screen.component.scss'],
})
export class AddTripScreenComponent implements OnInit {
	constructor(
		private filtersService: FiltersService,
		private tripsService: TripsService,
	) {}

	ngOnInit(): void {}

	addTrip(trip: Trip) {
		this.tripsService.addTrip(trip);
		this.filtersService.notify.emit();
	}
}

