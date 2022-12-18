import { Currency } from '../currency-switcher/currency-service.service';
import { Opinion } from '../opinion-form/opinion.model';

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
	rateNumber: number;
	opinions: Opinion[];
	status: TripStatus;
}

export enum TripStatus {
	'Normal',
	'Before',
	'After',
	'Active',
}

