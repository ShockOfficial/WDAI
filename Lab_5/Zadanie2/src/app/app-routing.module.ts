import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { TripsComponent } from './trips.component';
import { TripListScreenComponent } from './trip-list-screen/trip-list-screen.component';
import { CartComponent } from './cart/cart.component';
import { AddTripScreenComponent } from './add-trip-screen/add-trip-screen.component';
import { ProfileSreenComponent } from './profile-sreen/profile-sreen.component';
import { HomeScreenComponent } from './home-screen/home-screen.component';
import { TripDetailsComponent } from './trip-details/trip-details.component';
import { TripHistoryComponent } from './trip-history/trip-history.component';

const appRoutes: Routes = [
	{ path: '', redirectTo: 'home', pathMatch: 'full' },
	{ path: 'home', component: HomeScreenComponent },
	{ path: 'trips', component: TripListScreenComponent },
	{ path: 'details/:id', component: TripDetailsComponent },
	{ path: 'cart', component: CartComponent },
	{ path: 'add', component: AddTripScreenComponent },
	{ path: 'history', component: TripHistoryComponent },
	{ path: 'profile', component: ProfileSreenComponent },
	{ path: '**', redirectTo: '' },
];
@NgModule({
	declarations: [],
	imports: [CommonModule, RouterModule.forRoot(appRoutes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}

