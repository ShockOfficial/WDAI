import { EventEmitter, Injectable, Output } from '@angular/core';
import { Trip } from '../trips.component';

export enum FilterType {
	localization,
	rates,
	dateFrom,
	dateTo,
	priceFrom,
	priceTo,
}
type DataType = string | number | Date;
@Injectable({
	providedIn: 'root',
})
export class FiltersService {
	@Output() notify = new EventEmitter(); // used to notify ngFor to update list
	@Output() fetchTrips = new EventEmitter();
	currentFilters: {
		localization: string[];
		rates: number[];
		dateFrom: Date;
		dateTo: Date;
		priceFrom: number;
		priceTo: number;
	} = {
		localization: [],
		rates: [],
		dateFrom: new Date('01/01/1'),
		dateTo: new Date('01/01/99999'),
		priceFrom: 0,
		priceTo: Number.MAX_VALUE,
	};
	trips: Trip[] = [];
	constructor() {}

	setFilters(data: DataType, type: FilterType) {
		switch (type) {
			case FilterType.localization:
				this.toggleFilters(
					this.currentFilters.localization,
					data,
					'localization',
				);
				break;
			case FilterType.rates:
				this.toggleFilters(this.currentFilters.rates, data, 'rates');
				break;
			case FilterType.dateFrom:
				this.currentFilters.dateFrom = data as Date;
				break;
			case FilterType.dateTo:
				this.currentFilters.dateTo = data as Date;
				break;
			case FilterType.priceFrom:
				this.currentFilters.priceFrom = data as number;
				break;
			case FilterType.priceTo:
				this.currentFilters.priceTo = data as number;
				break;
		}
		this.notify.emit();
	}

	getFilters(type: FilterType) {
		switch (type) {
			case FilterType.localization:
				return this.currentFilters.localization;
			case FilterType.rates:
				return this.currentFilters.rates;
			case FilterType.dateFrom:
				return this.currentFilters.dateFrom;
			case FilterType.dateTo:
				return this.currentFilters.dateTo;
			case FilterType.dateFrom:
				return this.currentFilters.dateFrom;
			case FilterType.priceFrom:
				return this.currentFilters.priceFrom;
			default:
				return this.currentFilters.priceTo;
		}
	}

	private toggleFilters(
		filters: DataType[],
		data: DataType,
		fieldName: string,
	) {
		if (filters.includes(data)) {
			filters = filters.filter((item) => item !== data);
			this.currentFilters = { ...this.currentFilters, [fieldName]: filters };
		} else {
			filters.push(data);
		}
	}

	getTrips() {
		this.fetchTrips.emit();
		return this.trips;
	}
}

