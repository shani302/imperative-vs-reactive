import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { ICountry } from '../countries';
import { ImperativeDataService } from '../imperative-typeahead/imperative-data.service';

@Component({
  selector: 'app-reactive-typeahead',
  templateUrl: './reactive-typeahead.component.html',
  styleUrls: ['./reactive-typeahead.component.css']
})
export class ReactiveTypeaheadComponent implements OnInit {

  criteriaFormControl = new FormControl();
  filteredContries$: Observable<ICountry[]>;

  constructor(dataService: ImperativeDataService) {
    this.filteredContries$ = this.criteriaFormControl.valueChanges.pipe(
      // let user finish typing
      debounceTime(500),
      // avoid duplicate requests
      distinctUntilChanged(),
      // cancel outdated requests
      // avoid race conditions
      switchMap(criteria => dataService.filterAsync(criteria))
    );
  }

  ngOnInit() {
  }

}