import { Pipe, PipeTransform } from '@angular/core';
import { FiltersService, FilterType } from './filters/filters.service';
import { Trip } from './trips.component';

@Pipe({
	name: 'dateFilter',
})
export class DateFilterPipe implements PipeTransform {
	constructor(private filtersService: FiltersService) {}

	transform(value: Trip[]) {
		const dateFrom = this.filtersService.getFilters(
			FilterType.dateFrom,
		) as Date;
		const dateTo = this.filtersService.getFilters(FilterType.dateTo) as Date;

		if (!value) return [];
		if (dateFrom === new Date('01/01/1' || dateTo === new Date('01/01/99999')))
			return value;

		return value.filter(
			(trip) => dateFrom <= trip.startDate && dateTo >= trip.endDate,
		);
	}
}

