import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TripsService } from '../trips.service';
import { CurrencyService } from '../currency-switcher/currency-service.service';
import { CartService } from '../cart/cart-service.service';
import { Location } from '@angular/common';
import { Opinion } from '../opinion-form/opinion.model';
import { Trip } from '../trip/trip.model';
import {
	NgbCarousel,
	NgbSlideEvent,
	NgbSlideEventSource,
} from '@ng-bootstrap/ng-bootstrap';

@Component({
	selector: 'app-trip-details',
	templateUrl: './trip-details.component.html',
	styleUrls: ['./trip-details.component.scss'],
})
export class TripDetailsComponent implements OnInit {
	trip?: Trip;
	reservedAmount: number = 0;
	stars = [1, 2, 3, 4, 5];
	isFormOpen: boolean = false;
	opinions: Opinion[];
	isFetching: boolean = true;
	images: string[];

	constructor(
		private location: Location,
		private route: ActivatedRoute,
		private currencyService: CurrencyService,
		private cartService: CartService,
		private tripsService: TripsService,
	) {}

	ngOnInit(): void {
		this.trip = this.tripsService.getById(this.route.snapshot.params['id']);
		this.reservedAmount = +this.route.snapshot.queryParams['reservedAmount'];
		this.opinions = this.trip ? this.trip.opinions : [];
		this.images = this.trip ? this.trip.imageUrls : [];

		setTimeout(() => {
			this.trip = this.tripsService.getById(this.route.snapshot.params['id']);
			this.isFetching = false;
		}, 5000);
	}

	getCurrency() {
		return this.currencyService.currenctCurrency;
	}

	onButtonClick(isAdding: boolean) {
		if (!this.trip) return;

		if (isAdding) {
			this.reservedAmount++;
			this.trip.currentAmount--;
			this.cartService.addToCart(this.trip);
		} else {
			this.trip.currentAmount++;
			this.reservedAmount--;
			this.cartService.removeFromCart(this.trip);
		}
	}
	goBack() {
		this.location.back();
	}
	rateTrip(rate: number) {
		if (this.trip) {
			this.trip.rate = rate;
			if (this.trip.rateNumber === 0) this.trip.rateNumber += 1;
			this.tripsService.modifyObjectInDb(this.trip);
		}
	}
	openForm() {
		this.isFormOpen = !this.isFormOpen;
	}
	addOpinion(opinion: Opinion) {
		if (this.trip) {
			this.trip.opinions.push(opinion);
		}
	}

	paused = false;
	unpauseOnArrow = false;
	pauseOnIndicator = false;
	pauseOnHover = true;
	pauseOnFocus = true;

	@ViewChild('carousel', { static: true }) carousel: NgbCarousel;

	togglePaused() {
		if (this.paused) {
			this.carousel.cycle();
		} else {
			this.carousel.pause();
		}
		this.paused = !this.paused;
	}

	onSlide(slideEvent: NgbSlideEvent) {
		if (
			this.unpauseOnArrow &&
			slideEvent.paused &&
			(slideEvent.source === NgbSlideEventSource.ARROW_LEFT ||
				slideEvent.source === NgbSlideEventSource.ARROW_RIGHT)
		) {
			this.togglePaused();
		}
		if (
			this.pauseOnIndicator &&
			!slideEvent.paused &&
			slideEvent.source === NgbSlideEventSource.INDICATOR
		) {
			this.togglePaused();
		}
	}
}

