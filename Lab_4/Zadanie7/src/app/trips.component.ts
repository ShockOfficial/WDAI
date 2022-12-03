import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import tripsData from '../data/trips.json';
import {
	Currency,
	CurrencyService,
} from './currency-switcher/currency-service.service';

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
	currency: Currency;
	isMostExpensive?: boolean;
	rate: number;
}

@Component({
	selector: 'app-trips',
	templateUrl: './trips.component.html',
	styleUrls: ['./trips.component.scss'],
})
export class TripsComponent implements OnInit {
	title = 'Zadanie6';
	trips: Trip[];
	isAddingTrip: boolean = false;

	constructor(private currencyService: CurrencyService) {
		this.trips = tripsData.map((trip) => ({
			...trip,
			startDate: new Date(trip.startDate),
			endDate: new Date(trip.endDate),
			currency: trip.currency as Currency, // I know that the data is correct at this point
		}));
		this.distinctSpecialTrips();
	}

	ngOnInit(): void {}

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
	}
	removeTrip(trip: Trip) {
		this.trips = this.trips.filter((tripItem) => tripItem !== trip);
	}
	handleFromButton() {
		this.isAddingTrip = !this.isAddingTrip;
	}
}

