import { EventEmitter, Injectable } from '@angular/core';
import tripsData from '../data/trips.json';
import { Currency } from './currency-switcher/currency-service.service';
import { LocationFilterPipe } from './location-filter.pipe';
import { DateFilterPipe } from './date-filter.pipe';
import { PriceFilterPipe } from './price-filter.pipe';
import { RateFilterPipe } from './rate-filter.pipe';
import { Trip, TripStatus } from './trip/trip.model';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { HttpClient } from '@angular/common/http';

@Injectable({
	providedIn: 'root',
})
export class TripsService {
	boughtTrips: (Trip & { quantity: number; purchaseDate: number })[] = [];
	trips: Trip[] = [];
	incomingTrip = new EventEmitter<true>();
	constructor(
		private locationPipe: LocationFilterPipe,
		private ratePipe: RateFilterPipe,
		private pricePipe: PriceFilterPipe,
		private datePipe: DateFilterPipe,
		private db: AngularFireDatabase,
	) {
		this.getTripsFromDb();
		this.getBoughtTripsFromDb();
		this.distinctSpecialTrips();
	}

	getTripsFromDb() {
		const dbTrips = this.db.list<Trip>('trips').valueChanges();
		dbTrips.subscribe((data) => {
			this.trips = data.map((trip) => ({
				...trip,
				startDate: new Date(trip.startDate),
				endDate: new Date(trip.endDate),
				currency: trip.currency as Currency, // I know that the data is correct at this point
				status: TripStatus.Normal,
			}));

			this.distinctSpecialTrips();
		});

		return dbTrips;
	}

	async modifyObjectInDb(trip: Trip) {
		await this.db.list('trips').set(trip.id, {
			...trip,
			startDate: trip.startDate.getTime(),
			endDate: trip.endDate.getTime(),
		});
	}

	async removeFromDb(trip: Trip) {
		// return; // Tymczasowo wyłączone, ale zaimplementowane

		await this.db.object(`/trips/${trip.id}`).remove();
	}

	async saveBoughtTripsInDb() {
		await this.db.list('bought').set(
			'list',
			this.boughtTrips.map((item) => ({
				...item,
				startDate: item.startDate.getTime(),
				endDate: item.endDate.getTime(),
			})),
		);
	}

	getBoughtTripsFromDb() {
		const trips = this.db
			.list<Trip & { quantity: number; purchaseDate: number }>('bought/list')
			.valueChanges();

		trips.subscribe((data) => {
			this.boughtTrips = data;
		});
		return trips;
	}

	generateId() {
		return this.db.createPushId();
	}

	distinctSpecialTrips() {
		const filteredTrips = this.getFilteredTrips();
		filteredTrips.forEach((trip) => (trip.isMostExpensive = 'Normal'));

		const availableTrips = filteredTrips.filter(
			(trip) => trip.currentAmount !== 0,
		);

		if (availableTrips.length === 0) return;

		const mostExpensiveTrip = availableTrips.reduce((prev, current) =>
			prev.price > current.price ? prev : current,
		);
		const cheapestTrip = availableTrips.reduce((prev, current) =>
			prev.price < current.price ? prev : current,
		);
		mostExpensiveTrip.isMostExpensive = 'Expensive';
		cheapestTrip.isMostExpensive = 'Cheap';
	}

	removeTrip(trip: Trip) {
		this.trips = this.trips.filter((tripItem) => tripItem.id !== trip.id);
		this.distinctSpecialTrips();
		this.removeFromDb(trip);
		return this.trips;
	}

	addTrip(trip: Trip) {
		this.trips.push(trip);
		this.distinctSpecialTrips();
		this.modifyObjectInDb(trip);
	}
	getFilteredTrips() {
		return this.datePipe.transform(
			this.locationPipe.transform(
				this.ratePipe.transform(this.pricePipe.transform(this.trips)),
			),
		);
	}

	getById(id: string) {
		return this.trips.find((trip) => trip.id === id);
	}

	buyTrip(trip: Trip & { quantity: number }) {
		trip.status = TripStatus.Before;
		this.boughtTrips.push({ ...trip, purchaseDate: Date.now() });

		// Active and incoming trip are activating badge
		this.boughtTrips.forEach((item) => {
			if (
				item.startDate.getTime() >= Date.now() &&
				this.subtractDays(14, new Date(item.startDate)).getTime() <=
					Date.now() &&
				item.endDate.getTime() >= Date.now()
			) {
				this.incomingTrip.emit(true);
			}
		});
	}

	subtractDays(numOfDays: number, date = new Date()) {
		const dateCopy = new Date(date.getTime());

		dateCopy.setDate(dateCopy.getDate() - numOfDays);

		return dateCopy;
	}
}

