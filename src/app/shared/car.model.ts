export class Car{
 public model: string;
 public price: number;
 public id: number;

 constructor(model: string, price: number, id?: number){
    this.model = model;
    this.price = price;
    this.id = id;
 }

}