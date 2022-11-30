import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Card } from '../app.component';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {
  @Input() cardData: Card;
  @Output() buttonClicked = new EventEmitter<number>();
  constructor() {}

  ngOnInit(): void {}

  onButtonClick() {
    this.buttonClicked.emit(this.cardData.id);
  }
}
