import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpParams} from '@angular/common/http';
import {Observable, throwError} from "rxjs";
import {map, catchError} from 'rxjs/operators';
import {Car} from '../shared/car.model';
@Injectable({
  providedIn: 'root'
})
export class CarService {
  baseUrl = 'http://localhost/apy';
  public cars: Car[];
  public myel: string;

private handlerError(error: HttpErrorResponse){
  console.error('error : ', error);
  return throwError('Error ! something went wrong');
}

  constructor(private http: HttpClient) { }

  getAll(): Observable<Car[]> {
    return this.http.get(`${this.baseUrl}/list`)
    .pipe(
      map((res: Car[]) =>{
        this.cars = res['data'];
        return this.cars;
      }),
      catchError(this.handlerError));
  }

store(car: Car): Observable<Car[]>{
  return this.http.post(`${this.baseUrl}/store`, {data: car}).pipe(
    map((res) => {
        this.cars.push(res['data']);
        return this.cars;
      }
    ), 
      catchError(this.handlerError));
}


update(car: Car): Observable<Car[]>{
  return this.http.put(`${this.baseUrl}/update`, {data: car}).pipe(
    map((res) => {
        const theCar = this.cars.find((item) => {
          return +item['id'] === +car['id'];
        });
        if(theCar) {
          theCar['price'] = +car['price'];
          theCar['model'] = car['model'];
        }
        return this.cars;
      }
  ),  catchError(this.handlerError));
}

delete(id: number): Observable<Car[]>{
  const params = new HttpParams().set('id', id.toString());
return this.http.delete(`${this.baseUrl}/delete`, {params: params}).pipe(
  map(
    (res) => {
      const filteredCars = this.cars.filter((car) => {
        return +car['id'] !== +id;
      });
      return this.cars = filteredCars;}),
      catchError(this.handlerError));
}
}
