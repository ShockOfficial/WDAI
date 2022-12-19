import { Component } from '@angular/core';
import { FirebaseDatabase } from '@angular/fire';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css'],
})
export class AppComponent {
	description = 'GR - Przykladowa apliakcja typu CRUD do Firestore';

	constructor() {}
}

