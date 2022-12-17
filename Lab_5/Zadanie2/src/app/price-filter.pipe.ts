import { Pipe, PipeTransform } from '@angular/core';
import { FiltersService, FilterType } from './filters/filters.service';
import { Trip } from './trips.component';

@Pipe({
	name: 'priceFilter',
})
export class PriceFilterPipe implements PipeTransform {
	constructor(private filtersService: FiltersService) {}
	transform(value: Trip[]) {
		const priceFrom = this.filtersService.getFilters(
			FilterType.priceFrom,
		) as number;
		const priceTo = this.filtersService.getFilters(
			FilterType.priceTo,
		) as number;

		if (!value) return [];
		if (priceFrom === 0 && priceTo === Number.MAX_VALUE) return value;

		return value.filter(
			(trip) => priceFrom <= trip.price && priceTo >= trip.price,
		);
	}
}

