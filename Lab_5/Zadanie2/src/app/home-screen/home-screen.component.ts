import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
	selector: 'app-home-screen',
	templateUrl: './home-screen.component.html',
	styleUrls: ['./home-screen.component.scss'],
})
export class HomeScreenComponent implements OnInit {
	constructor() {}
	@ViewChild('about') aboutSection: ElementRef;
	ngOnInit(): void {}
	scrollTo() {
		window.scrollTo({
			top: this.aboutSection.nativeElement.offsetTop,
		});
	}
}

