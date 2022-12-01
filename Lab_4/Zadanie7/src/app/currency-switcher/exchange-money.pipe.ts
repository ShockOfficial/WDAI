import { Pipe, PipeTransform } from '@angular/core';
import { Currency } from './currency-service.service';

interface Converter {
	PLN: { USD?: number; EUR?: number; PLN?: number };
	USD: { USD?: number; EUR?: number; PLN?: number };
	EUR: { USD?: number; EUR?: number; PLN?: number };
}

@Pipe({
	name: 'exchangeMoney',
})
export class ExchangeMoneyPipe implements PipeTransform {
	converter: Converter = {
		PLN: { USD: 0.22, EUR: 0.21 },
		USD: { PLN: 4.47, EUR: 0.95 },
		EUR: { PLN: 4.69, USD: 1.05 },
	};
	transform(
		value: number,
		fromCurrency: Currency,
		toCurrency: Currency,
	): string {
		const converted = value * (this.converter[fromCurrency][toCurrency] || 1);
		return converted.toFixed(2);
	}
}

