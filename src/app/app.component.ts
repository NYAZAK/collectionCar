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


updateCar(name, price, id){
this.success = "";
this.error = "";

this.carS.update({model: name.value, price: price.value, id: +id}).subscribe(
  (res) => {
    this.cars = res;
    this.success = 'modifier avec succes';
  },
  (err) => this.error = err);
}

deleteCar(id){ 
  this.success = '';
  this.error = '';

  this.carS.delete(+id).subscribe(
    (res: Car[])=> {
      this.cars = res;
      this.success = 'Supprimer avec succès';
    }, 
    err => {
      this.error = err;
    }
  )

}
}
