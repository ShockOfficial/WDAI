import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import cars from 'src/assets/cars';
export type Car = {
  id: number;
  horsepower: number;
  img_url: string;
  make: string;
  model: string;
  price: number;
  year: number;
  colors: string[];
};
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'Zadanie5';
  markSelected = '';
  modelSelected = '';
  colorSelected = '';
  imgUrl = '';
  price = 0;
  cars: string[] = [];
  carModels: string[] = [];
  colors: string[] = [];

  constructor() {
    this.cars = cars.map(({ make }: Car) => make);
  }

  ngOnInit(): void {}

  onListMarkSelected(selected: string) {
    this.markSelected = '';
    this.modelSelected = '';
    this.colorSelected = '';
    this.markSelected = selected.trim();
    this.carModels = cars
      .filter((car: Car) => car.make === this.markSelected)
      .map(({ model }: Car) => model);
  }

  onListModelSelected(selected: string) {
    this.colorSelected = '';
    this.modelSelected = selected.trim();
    this.colors =
      cars.find(
        (car: Car) =>
          car.make === this.markSelected && this.modelSelected === car.model
      )?.colors || [];
  }

  onListColorSelected(selected: string) {
    this.colorSelected = selected.trim();
    const car = cars.find(
      (car: Car) =>
        car.make === this.markSelected && car.model === this.modelSelected
    );
    if (car) {
      this.imgUrl = car?.img_url;
      this.price = car.price;
    }
  }
}
