import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
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

	constructor() {}

	ngOnInit(): void {}
}

