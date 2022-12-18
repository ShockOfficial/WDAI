import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Opinion } from './opinion.model';

@Component({
	selector: 'app-opinion-form',
	templateUrl: './opinion-form.component.html',
	styleUrls: ['./opinion-form.component.scss'],
})
export class OpinionFormComponent implements OnInit {
	opinionForm: FormGroup;
	errorMessages: string[] = [];
	inputErrorMsg: { [key: string]: string } = {
		tripName: 'Wpisz prawidłową nazwę wyczieczki!',
		buyDate: 'Wybierz prawidłową datę!',
		nick: 'Wpisz swoją nazwę!',
		opinion: 'Opinia powinna mieć więcej niż 50 znaków i mniej niż 500',
	};
	@Input() tripName: string;
	@Output() onSubmit = new EventEmitter<Opinion>();
	constructor() {}

	ngOnInit(): void {
		this.opinionForm = new FormGroup({
			tripName: new FormControl(this.tripName, [
				Validators.required,
				Validators.minLength(3),
				this.tripNameValidator.bind(this),
			]),
			nick: new FormControl(null, [
				Validators.required,
				Validators.minLength(2),
			]),
			opinion: new FormControl(null, [
				Validators.required,
				Validators.minLength(50),
				Validators.maxLength(500),
			]),
			buyDate: new FormControl(null),
		});
	}

	onSubmitHandler() {
		const controls = this.opinionForm.controls;
		for (const key in controls) {
			if (Object.prototype.hasOwnProperty.call(controls, key)) {
				const control = controls[key];
				if (
					control.invalid &&
					!this.errorMessages.includes(this.inputErrorMsg[key])
				) {
					this.errorMessages.push(this.inputErrorMsg[key]);
				} else if (
					control.valid &&
					this.errorMessages.includes(this.inputErrorMsg[key])
				) {
					const index = this.errorMessages.findIndex(
						(item) => item === this.inputErrorMsg[key],
					);
					this.errorMessages.splice(index, 1);
				}
			}
		}
		const { tripName, nick, buyDate, opinion } = this.opinionForm.value;
		if (this.opinionForm.valid && this.opinionForm.dirty) {
			this.onSubmit.emit({ nick, tripName, opinion, date: buyDate });
			this.opinionForm.reset({ tripName: this.tripName });
		}
	}

	tripNameValidator(control: FormControl): { [key: string]: boolean } | null {
		if (control.value !== this.tripName) {
			return { isValid: true };
		}
		return null;
	}
}

