import { Component, OnInit } from '@angular/core';
import { Car } from './shared/car.model';
import {CarService} from './services/car.service';
import { FormGroup } from "@angular/forms";
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
  car = new Car('', 0);
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

addCar(f) {
  this.error = "";
  this.success = "";
  this.carS.store(this.car).subscribe(
    (res: Car[]) =>{
      this.cars = res;
      this.success = "créer avec succès";
      f.reset();
    },
    (err) => this.error =err);
}

}
