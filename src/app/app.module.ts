import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { ImperativeTypeaheadComponent } from './imperative-typeahead/imperative-typeahead.component';
import { ReactiveTypeaheadComponent } from './reactive-typeahead/reactive-typeahead.component';
import { ImperativeDataService } from './imperative-typeahead/imperative-data.service';

@NgModule({
  imports:      [ BrowserModule, ReactiveFormsModule ],
  declarations: [ AppComponent, ImperativeTypeaheadComponent, ReactiveTypeaheadComponent ],
  bootstrap:    [ AppComponent ],
  providers: [ImperativeDataService]
})
export class AppModule { }
