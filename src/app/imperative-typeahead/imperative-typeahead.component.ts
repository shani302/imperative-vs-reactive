import { Component, OnInit, Input } from '@angular/core';
import { ImperativeDataService } from './imperative-data.service';
import { ICountry, countries } from '../countries';

@Component({
  selector: 'app-imperative-typeahead',
  templateUrl: './imperative-typeahead.component.html',
  styleUrls: ['./imperative-typeahead.component.css']
})
export class ImperativeTypeaheadComponent {
  @Input()
  async = false;

  currentSearch = null;
  lastSearch = null;
  private delay = 500;
  private timeInterval = null;

  public filteredCountries: ICountry[];

  constructor(private dataService: ImperativeDataService) {
    this.filteredCountries = countries;
  }

  debounceTimeSearch(event) {
    this.currentSearch = event.target.value;

    if (!this.timeInterval) {
      this.timeInterval = setInterval(() => {
        if (this.currentSearch == this.lastSearch) { // this line mean, if the searches are the same, do not go to the server again
          return this.stopInterval();
        }

        this.filterData(this.currentSearch);
        this.lastSearch = this.currentSearch;
        this.stopInterval();
        
      }, this.delay);
    }
  }

  private filterData(criteria) {
    this.dataService.filterAsync(criteria)
        .then((res: any[]) => {
          if (criteria == this.lastSearch)// this line should fix the Race Condition, by check if the filter data match to the criteria
            this.filteredCountries = res;
        });    
  }

  private stopInterval() {
    clearInterval(this.timeInterval);
    this.timeInterval = null;
  }
  
}