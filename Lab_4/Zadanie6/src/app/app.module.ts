import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { DisplayComponent } from './display/display.component';
import { CardComponent } from './card/card.component';

@NgModule({
  declarations: [AppComponent, DisplayComponent, CardComponent],
  imports: [BrowserModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
