import { Pipe, PipeTransform } from '@angular/core';
import { Trip, TripStatus } from './trip/trip.model';

@Pipe({
	name: 'statusFilter',
})
export class StatusFilterPipe implements PipeTransform {
	transform(
		value: (Trip & { quantity: number; purchaseDate: number })[],
		activeFilters: string[],
	): (Trip & { quantity: number; purchaseDate: number })[] {
		if (activeFilters.length === 0) return value;

		value = value.filter((item) =>
			activeFilters.includes(this.mapEnumToString(item.status)),
		);
		return value;
	}

	mapEnumToString(val: TripStatus) {
		switch (val) {
			case TripStatus.Active:
				return 'Aktywna';
			case TripStatus.After:
				return 'Archiwalna';
			case TripStatus.Before:
				return 'Kupiona';
			case TripStatus.Normal:
				return 'Nie kupiona';
			default:
				return 'Unkown';
		}
	}
}

