import { Component, OnInit } from '@angular/core';
import { Trip } from '../trips.component';
import { FiltersService } from '../filters/filters.service';

@Component({
	selector: 'app-add-trip-screen',
	templateUrl: './add-trip-screen.component.html',
	styleUrls: ['./add-trip-screen.component.scss'],
})
export class AddTripScreenComponent implements OnInit {
	isAddingTrip: boolean = false;

	constructor(private filtersService: FiltersService) {}

	ngOnInit(): void {}

	handleFromButton() {
		this.isAddingTrip = !this.isAddingTrip;
	}

	addTrip(trip: Trip) {
		// this.trips.push(trip);
		this.isAddingTrip = false;
		this.filtersService.notify.emit();
	}
}

