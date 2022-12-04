import {
	Component,
	ElementRef,
	Input,
	OnChanges,
	OnInit,
	SimpleChanges,
	ViewChild,
} from '@angular/core';
import { DateFilterPipe } from '../date-filter.pipe';
import { LocationFilterPipe } from '../location-filter.pipe';
import { PriceFilterPipe } from '../price-filter.pipe';
import { RateFilterPipe } from '../rate-filter.pipe';
import { FiltersService, FilterType } from './filters.service';

@Component({
	selector: 'app-filters',
	templateUrl: './filters.component.html',
	styleUrls: ['./filters.component.scss'],
	providers: [
		RateFilterPipe,
		LocationFilterPipe,
		PriceFilterPipe,
		DateFilterPipe,
	],
})
export class FiltersComponent implements OnInit {
	@ViewChild('priceFrom', { static: true }) priceFromInput: ElementRef;
	@ViewChild('priceTo', { static: true }) priceToInput: ElementRef;
	@ViewChild('dateFrom', { static: true }) dateFromInput: ElementRef;
	@ViewChild('dateTo', { static: true }) dateToInput: ElementRef;
	priceFromValue: number;
	priceToValue: number;
	dateFromValue: string;
	dateToValue: string;
	isPriceFilterSet: boolean;
	constructor(
		private filtersService: FiltersService,
		private locationPipe: LocationFilterPipe,
		private ratePipe: RateFilterPipe,
		private pricePipe: PriceFilterPipe,
		private datePipe: DateFilterPipe,
	) {}

	ngOnInit(): void {
		this.setInputsDefaultValues();
		this.filtersService.notify.subscribe(() => {
			this.setInputsDefaultValues();
		});
	}

	clickHanlder(e: Event) {
		const el = e.target as HTMLElement;
		const rate = el.dataset['rate'];
		const localization = el.id;
		if (rate) {
			this.filtersService.setFilters(+rate, FilterType.rates);
		} else if (localization) {
			this.filtersService.setFilters(localization, FilterType.localization);
		}
		this.setInputsDefaultValues();
	}

	isRateSelected(rate: number) {
		const rates = this.filtersService.getFilters(FilterType.rates) as number[];
		return rates.includes(rate);
	}

	isLocationSelected(location: string) {
		const locations = this.filtersService.getFilters(
			FilterType.localization,
		) as string[];
		return locations.includes(location);
	}

	getTripDest() {
		const trips = this.filtersService.getTrips();
		const uniqPlaces = new Set(trips.map((trip) => trip.dest));
		return Array.from(uniqPlaces);
	}

	setInputsDefaultValues() {
		if (this.isPriceFilterSet) return;

		const trips = this.datePipe.transform(
			this.locationPipe.transform(
				this.ratePipe.transform(
					this.pricePipe.transform(this.filtersService.getTrips()),
				),
			),
		);
		const highestPrice = trips.reduce(
			(prev, current) => (prev > current.price ? prev : current.price),
			0,
		);
		const lowestPrice = trips.reduce(
			(prev, current) => (prev < current.price ? prev : current.price),
			Number.MAX_VALUE,
		);

		this.priceFromValue = lowestPrice;
		this.priceToValue = highestPrice;

		if (lowestPrice === Number.MAX_VALUE) {
			this.priceFromValue = 0;
		}
	}

	handlePriceFromInput(e: number) {
		this.filtersService.setFilters(e, FilterType.priceFrom);
		this.isPriceFilterSet = true;
	}
	handlePriceToInput(e: number) {
		this.filtersService.setFilters(e, FilterType.priceTo);
		this.isPriceFilterSet = true;
	}
	handleDateFromInput(e: string) {
		this.filtersService.setFilters(new Date(e), FilterType.dateFrom);
	}
	handleDateToInput(e: string) {
		this.filtersService.setFilters(new Date(e), FilterType.dateTo);
	}
}

