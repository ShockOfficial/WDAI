import { Component, OnChanges, SimpleChanges } from '@angular/core';
import tripsData from '../data/trips.json';

export interface Trip {
	id: number;
	title: string;
	dest: string;
	country: string;
	startDate: Date;
	endDate: Date;
	totalAmount: number;
	currentAmount: number;
	desc: string;
	galleryUrl: string;
	price: number;
	currency: string;
	isMostExpensive?: boolean;
}

@Component({
	selector: 'app-trips',
	templateUrl: './trips.component.html',
	styleUrls: ['./trips.component.scss'],
})
export class TripsComponent {
	title = 'Zadanie6';
	trips: Trip[];

	constructor() {
		this.trips = tripsData.map((trip) => ({
			...trip,
			startDate: new Date(trip.startDate),
			endDate: new Date(trip.endDate),
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
}

