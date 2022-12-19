import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { TripsComponent } from './trips.component';
import { NavComponent } from './nav/nav.component';
import { SideNavComponent } from './side-nav/side-nav.component';
import { TripComponent } from './trip/trip.component';
import { CurrencySwitcherComponent } from './currency-switcher/currency-switcher.component';
import { ExchangeMoneyPipe } from './currency-switcher/exchange-money.pipe';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreateFormComponent } from './create-form/create-form.component';
import { RatingStarComponent } from './rating-star/rating-star.component';
import { CartComponent } from './cart/cart.component';
import { CartItemComponent } from './cart-item/cart-item.component';
import { FiltersComponent } from './filters/filters.component';
import { RateFilterPipe } from './rate-filter.pipe';
import { LocationFilterPipe } from './location-filter.pipe';
import { PriceFilterPipe } from './price-filter.pipe';
import { DateFilterPipe } from './date-filter.pipe';
import { AppRoutingModule } from './app-routing.module';
import { TripListScreenComponent } from './trip-list-screen/trip-list-screen.component';
import { AddTripScreenComponent } from './add-trip-screen/add-trip-screen.component';
import { ProfileSreenComponent } from './profile-sreen/profile-sreen.component';
import { HomeScreenComponent } from './home-screen/home-screen.component';
import { TripDetailsComponent } from './trip-details/trip-details.component';
import { OpinionFormComponent } from './opinion-form/opinion-form.component';
import { TripHistoryComponent } from './trip-history/trip-history.component';
import { HistoryCardComponent } from './history-card/history-card.component';
import { StatusFilterPipe } from './status-filter.pipe';
import { CarouselComponent } from './carousel/carousel.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

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
		FiltersComponent,
		RateFilterPipe,
		LocationFilterPipe,
		PriceFilterPipe,
		DateFilterPipe,
		TripListScreenComponent,
		AddTripScreenComponent,
		ProfileSreenComponent,
		HomeScreenComponent,
		TripDetailsComponent,
		OpinionFormComponent,
		TripHistoryComponent,
		HistoryCardComponent,
		StatusFilterPipe,
		CarouselComponent,
	],
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		ReactiveFormsModule,
		FormsModule,
		AppRoutingModule,
		NgbModule,
	],
	bootstrap: [TripsComponent],
	providers: [
		RateFilterPipe,
		LocationFilterPipe,
		PriceFilterPipe,
		DateFilterPipe,
	],
})
export class TripsModule {}

