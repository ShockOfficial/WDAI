import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { DisplayComponent } from './display/display.component';
import { CardComponent } from './card/card.component';
import { CardBoxComponent } from './card-box/card-box.component';

@NgModule({
  declarations: [
    AppComponent,
    DisplayComponent,
    CardComponent,
    CardBoxComponent,
  ],
  imports: [BrowserModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
