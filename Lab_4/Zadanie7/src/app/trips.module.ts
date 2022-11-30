import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { TripsComponent } from './trips.component';
import { NavComponent } from './nav/nav.component';
import { SideNavComponent } from './side-nav/side-nav.component';
import { TripComponent } from './trip/trip.component';

@NgModule({
	declarations: [TripsComponent, NavComponent, SideNavComponent, TripComponent],
	imports: [BrowserModule],
	providers: [],
	bootstrap: [TripsComponent],
})
export class TripsModule {}

