import { Currency } from '../currency-switcher/currency-service.service';
import { Opinion } from '../opinion-form/opinion.model';

export interface Trip {
	id: string;
	title: string;
	dest: string;
	country: string;
	startDate: Date;
	endDate: Date;
	totalAmount: number;
	currentAmount: number;
	desc: string;
	galleryUrl: string;
	imageUrls: string[];
	price: number;
	currency: Currency;
	isMostExpensive: ExpensiveStatus;
	rate: number; // change this to array of numbers in the future
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

export type ExpensiveStatus = 'Expensive' | 'Cheap' | 'Normal';

