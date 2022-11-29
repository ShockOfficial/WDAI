import { Component, Input, OnInit, Output, SimpleChange } from '@angular/core';

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss'],
})
export class ListItemComponent implements OnInit {
  @Input() name: string;
  @Input() isColors?: boolean;

  constructor() {}

  ngOnInit(): void {}
}
