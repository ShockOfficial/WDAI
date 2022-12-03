import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
	selector: 'app-rating-star',
	templateUrl: './rating-star.component.html',
	styleUrls: ['./rating-star.component.scss'],
})
export class RatingStarComponent implements OnInit {
	@Input() value: number;
	@Input() pickedValue: number;
	@Output() onStarClick = new EventEmitter<number>();
	constructor() {}

	ngOnInit(): void {}

	starClick() {
		this.onStarClick.emit(this.value);
	}
}

