import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
	selector: 'app-side-nav',
	templateUrl: './side-nav.component.html',
	styleUrls: ['./side-nav.component.scss'],
	encapsulation: ViewEncapsulation.ShadowDom,
})
export class SideNavComponent implements OnInit {
	constructor() {}

	ngOnInit(): void {}
}

