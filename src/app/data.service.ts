import { Injectable } from '@angular/core';

@Injectable()
export class DataService {

  constructor() { }

  cars = [
    'Ford', 'Chevrolet', 'Buick'
  ]

  myData(){
    return 'See the data here, aight!';
  }

}
