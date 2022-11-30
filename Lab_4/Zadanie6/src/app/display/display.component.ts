import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { Card } from '../app.component';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.scss'],
})
export class DisplayComponent implements OnInit {
  @Input() card?: Card;
  constructor() {}

  ngOnInit(): void {}
  getTitle() {
    return !!this.card ? this.card.title : 'Wybierz temat';
  }
  getContent() {
    return this.card ? this.card.desc : '';
  }
}
