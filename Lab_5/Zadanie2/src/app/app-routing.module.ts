import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { TripsComponent } from './trips.component';
import { TripListScreenComponent } from './trip-list-screen/trip-list-screen.component';
import { CartComponent } from './cart/cart.component';

const appRoutes: Routes = [
	{ path: '', redirectTo: 'Home', pathMatch: 'full' },
	{ path: 'Home', component: TripListScreenComponent }, // TODO create home
	{ path: 'trips', component: TripListScreenComponent },
	{ path: 'cart', component: CartComponent },
	{ path: 'add', component: CartComponent },
	{ path: 'history', component: CartComponent },
	{ path: '**', redirectTo: '' },
];
@NgModule({
	declarations: [],
	imports: [CommonModule, RouterModule.forRoot(appRoutes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}

