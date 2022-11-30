import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import data from '../data/cards.json';

export interface Card {
  id: number;
  title: string;
  shortDesc: string;
  desc: string;
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'Zadanie6';
  cards: Card[] = data;
  cardToDisplay: Card;

  ngOnInit() {}

  displayHandler(cardIndex: number) {
    this.cardToDisplay = this.cards[cardIndex];
  }
}
