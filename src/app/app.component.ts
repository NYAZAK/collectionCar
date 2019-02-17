import { Component, OnInit } from '@angular/core';
import { Car } from './shared/car.model';
import {CarService} from './services/car.service';
// import { Subscription } from 'rxjs';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  cars: Car[];
  error: '';
  success = '';
  constructor(private carS: CarService){}

ngOnInit(){
  this.getCars();
}

getCars(): void {
  this.carS.getAll().subscribe(
    (res: Car[]) => {
      this.cars = res;
    },
    (err) => {
      this.error = err;
    }
  )
}

}
