import { Injectable } from '@angular/core';
import tripsData from '../data/trips.json';
import { Trip } from './trips.component';
import { Currency } from './currency-switcher/currency-service.service';
import { FiltersService } from './filters/filters.service';

@Injectable({
	providedIn: 'root',
})
export class TripsService {
	trips: Trip[] = [];
	constructor() {
		this.trips = tripsData.map((trip) => ({
			...trip,
			startDate: new Date(trip.startDate),
			endDate: new Date(trip.endDate),
			currency: trip.currency as Currency, // I know that the data is correct at this point
		}));
		this.distinctSpecialTrips();
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

	removeTrip(trip: Trip) {
		this.trips = this.trips.filter((tripItem) => tripItem !== trip);
		this.distinctSpecialTrips();
		return this.trips;
	}

	addTrip(trip: Trip) {
		this.trips.push(trip);
		this.distinctSpecialTrips();
	}
}

