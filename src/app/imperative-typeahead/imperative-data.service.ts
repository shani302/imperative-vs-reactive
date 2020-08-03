import { Injectable } from '@angular/core';
import { countries } from '../countries';

@Injectable()
export class ImperativeDataService {

  filter(criteria: string) {
    // console.log(criteria);
    return countries.filter(c => c.name.includes(criteria))
  }


  filterAsync(criteria: string) {
    console.log('Searching for: ' + criteria);
    const delay = Math.floor(Math.random() * 3);
    
    return new Promise((resolve, reject) => {
      const countries = this.filter(criteria);
      setTimeout(() => resolve(countries), delay * 1000)
    });
  }

}