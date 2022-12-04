import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import tripsData from '../data/trips.json';
import { CartService } from './cart/cart-service.service';
import { Currency } from './currency-switcher/currency-service.service';
import { FiltersService } from './filters/filters.service';

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
		// TODO Refresh inputs after adding trip
	}
	removeTrip(trip: Trip) {
		this.trips = this.trips.filter((tripItem) => tripItem !== trip);
	}
	handleFromButton() {
		this.isAddingTrip = !this.isAddingTrip;
	}
	getCartState() {
		return this.cartService.isCartOpen;
	}
}

