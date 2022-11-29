import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit, OnChanges {
  @Input() list: string[];
  @Input() isColors?: boolean;
  @Output() itemSelected = new EventEmitter<string>();
  uniqList: Set<string>;

  constructor() {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    this.uniqList = new Set(this.list);
  }

  handleClick(e: Event) {
    const element: HTMLElement = e.target as HTMLElement;
    const pickedItem = element.closest('.item')?.textContent || '';
    this.itemSelected.emit(pickedItem);
  }
}
