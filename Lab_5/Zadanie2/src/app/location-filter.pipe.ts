import { Pipe, PipeTransform } from '@angular/core';
import { FiltersService, FilterType } from './filters/filters.service';
import { Trip } from './trip/trip.model';

@Pipe({
	name: 'locationFilter',
})
export class LocationFilterPipe implements PipeTransform {
	constructor(private filtersService: FiltersService) {}
	transform(value: Trip[]) {
		const locations = this.filtersService.getFilters(
			FilterType.localization,
		) as string[];

		if (!value) return [];
		if (locations.length === 0) return value;
		return value.filter((trip) => locations.includes(trip.dest));
	}
}

