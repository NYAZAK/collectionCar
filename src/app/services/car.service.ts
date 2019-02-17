import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpParams} from '@angular/common/http';
import {Observable, throwError} from "rxjs";
import {map, catchError} from 'rxjs/operators';
import {Car} from '../shared/car.model';
@Injectable({
  providedIn: 'root'
})
export class CarService {
  baseUrl = 'http://localhost/api';
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
  



}
