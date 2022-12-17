import { Component, OnInit } from '@angular/core';
import { Trip } from '../trips.component';
import { FiltersService } from '../filters/filters.service';
import { CartService } from '../cart/cart-service.service';
import tripsData from '../../data/trips.json';
import { Currency } from '../currency-switcher/currency-service.service';

@Component({
	selector: 'app-trip-list-screen',
	templateUrl: './trip-list-screen.component.html',
	styleUrls: ['./trip-list-screen.component.scss'],
})
export class TripListScreenComponent implements OnInit {
	trips: Trip[];
	isAddingTrip: boolean = false;
	constructor(
		private cartService: CartService,
		private filtersService: FiltersService,
	) {
		this.trips = tripsData.map((trip) => ({
			...trip,
			startDate: new Date(trip.startDate),
			endDate: new Date(trip.endDate),
			currency: trip.currency as Currency, // I know that the data is correct at this point
		}));
		this.distinctSpecialTrips();
	}

	ngOnInit(): void {
		this.filtersService.notify.subscribe(() => {
			this.trips = [...this.trips];
		});
		this.filtersService.fetchTrips.subscribe(() => {
			this.filtersService.trips = this.trips;
		});
	}

	distinctSpecialTrips() {
		this.trips.forEach((trip) => (trip.isMostExpensive = undefined));

		const availableTrips = this.trips.filter(
			(trip) => trip.currentAmount !== 0,
		);
		const mostExpensiveTrip = availableTrips.reduce((prev, current) =>
			prev.price > current.price ? prev : current,
		);
		const cheapestTrip = availableTrips.reduce((prev, current) =>
			prev.price < current.price ? prev : current,
		);
		mostExpensiveTrip.isMostExpensive = true;
		cheapestTrip.isMostExpensive = false;
	}

	addTrip(trip: Trip) {
		this.trips.push(trip);
		this.isAddingTrip = false;
		this.filtersService.notify.emit();
	}
	removeTrip(trip: Trip) {
		this.trips = this.trips.filter((tripItem) => tripItem !== trip);
	}
	handleFromButton() {
		this.isAddingTrip = !this.isAddingTrip;
	}
}

