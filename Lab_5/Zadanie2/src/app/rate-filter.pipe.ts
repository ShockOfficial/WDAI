import { Pipe, PipeTransform } from '@angular/core';
import { FiltersService, FilterType } from './filters/filters.service';
import { Trip } from './trips.component';

@Pipe({
	name: 'rateFilter',
})
export class RateFilterPipe implements PipeTransform {
	constructor(private filtersService: FiltersService) {}
	transform(value: Trip[]) {
		const rates = this.filtersService.getFilters(FilterType.rates) as number[];

		if (!value) return [];
		if (rates.length === 0) return value;
		return value.filter((trip) => rates.includes(trip.rate));
	}
}

