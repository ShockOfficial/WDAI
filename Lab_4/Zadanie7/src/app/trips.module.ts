import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { TripsComponent } from './trips.component';
import { NavComponent } from './nav/nav.component';
import { SideNavComponent } from './side-nav/side-nav.component';
import { TripComponent } from './trip/trip.component';
import { CurrencySwitcherComponent } from './currency-switcher/currency-switcher.component';
import { ExchangeMoneyPipe } from './currency-switcher/exchange-money.pipe';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { CreateFormComponent } from './create-form/create-form.component';
import { RatingStarComponent } from './rating-star/rating-star.component';
import { CartComponent } from './cart/cart.component';
import { CartItemComponent } from './cart-item/cart-item.component';

@NgModule({
	declarations: [
		TripsComponent,
		NavComponent,
		SideNavComponent,
		TripComponent,
		CurrencySwitcherComponent,
		ExchangeMoneyPipe,
		CreateFormComponent,
		RatingStarComponent,
  CartComponent,
  CartItemComponent,
	],
	imports: [BrowserModule, BrowserAnimationsModule, ReactiveFormsModule],
	providers: [],
	bootstrap: [TripsComponent],
})
export class TripsModule {}

