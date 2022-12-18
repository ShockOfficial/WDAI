import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Trip } from '../trips.component';

@Component({
	selector: 'app-create-form',
	templateUrl: './create-form.component.html',
	styleUrls: ['./create-form.component.scss'],
})
export class CreateFormComponent implements OnInit {
	tripForm: FormGroup;
	@Output() onSubmit = new EventEmitter<Trip>();
	constructor() {}

	ngOnInit(): void {
		this.tripForm = new FormGroup({
			tripName: new FormControl(null, [
				Validators.required,
				Validators.minLength(3),
				this.nameValidator.bind(this),
			]),
			countryName: new FormControl(null, [
				Validators.required,
				Validators.minLength(3),
				this.nameValidator.bind(this),
			]),
			destCountry: new FormControl(null, [
				Validators.required,
				Validators.minLength(3),
				this.nameValidator.bind(this),
			]),
			startDate: new FormControl(null, [
				Validators.required,
				this.dateValidator.bind(this),
			]),
			endDate: new FormControl(null, [
				Validators.required,
				this.dateValidator.bind(this),
			]),
			totalAmount: new FormControl(null, [
				Validators.required,
				Validators.min(1),
			]),
			description: new FormControl(null, [
				Validators.required,
				Validators.minLength(3),
			]),
			imgUrl: new FormControl(null, [
				Validators.required,
				Validators.pattern(
					/[(http(s)?)://(www.)?a-zA-Z0-9@:%._+~#=]{2,256}.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/,
				),
			]),
			price: new FormControl(null, [Validators.required, Validators.min(0)]),
		});
	}
	onSubmitHandler() {
		const {
			tripName,
			countryName,
			description,
			endDate,
			startDate,
			imgUrl,
			totalAmount,
			price,
			destCountry,
		} = this.tripForm.value;

		this.onSubmit.emit({
			id: Date.now(),
			title: tripName,
			country: countryName,
			desc: description,
			galleryUrl: imgUrl,
			currentAmount: totalAmount,
			dest: destCountry,
			endDate: new Date(endDate),
			startDate: new Date(startDate),
			totalAmount,
			price,
			currency: 'PLN',
			rate: 0,
			rateNumber: 0,
			opinions: [],
		});
		this.tripForm.reset();
	}
	nameValidator(control: FormControl): { [key: string]: boolean } | null {
		const nameCondition =
			/^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð '-]+$/u;

		if (!control.value?.match(nameCondition)) {
			return { isValid: true };
		}
		return null;
	}

	dateValidator(control: FormControl): { [key: string]: boolean } | null {
		if (control === this.tripForm?.controls['startDate']) {
			const endDate = this.tripForm?.controls['endDate'];

			if (endDate?.value < control.value) {
				if (endDate.invalid) endDate?.updateValueAndValidity();
				return { isValid: true };
			}
		} else {
			const startDate = this.tripForm?.controls['startDate'];
			if (startDate?.value > control.value) {
				if (startDate.invalid) startDate?.updateValueAndValidity();

				return { isValid: true };
			}
		}

		return null;
	}
}

