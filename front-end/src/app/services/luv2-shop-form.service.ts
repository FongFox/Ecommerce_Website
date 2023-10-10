import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, of } from 'rxjs';
import { Country } from '../common/country';
import { State } from '../common/state';

@Injectable({
  providedIn: 'root'
})
export class Luv2ShopFormService {
  private countriesURL = 'http://localhost:8080/api/countries';
  private stateURL = 'http://localhost:8080/api/states';

  constructor(private httpClient: HttpClient) { }

  getCreditCardMonths(startMonth: number): Observable<number[]> {
    let data: number[] = [];

    //build an array for "month" dropdown list
    // - start at current month and loop until
    for(let theMonth = startMonth; theMonth <= 12; theMonth++) {
      data.push(theMonth);
    }

    return of(data);
  }

  getCreditCardYears(): Observable<number[]> {
    let data: number[] =[];

    //build an array for "year" drownlist
    // - start at current year and loop for next 10 years

    const startYear: number = new Date().getFullYear();
    const endYear: number = startYear + 50;

    for(let theYear = startYear; theYear <= endYear; theYear++) {
      data.push(theYear);
    }

    return of(data);
  }

  getCountries(): Observable<Country[]> {
    return this.httpClient.get<GetResponseCountries>(this.countriesURL).pipe(
      map(response => response._embedded.countries)
    );
  }

  getStates(theCountrycode: string): Observable<State[]> {
    //search url
    const searchStatesURL = `${this.stateURL}/search/findByCountryCode?code=${theCountrycode}`;

    return this.httpClient.get<GetResponseStates>(searchStatesURL).pipe(
      map(response => response._embedded.states)
    );
  }

}

interface GetResponseCountries {
  _embedded: {
    countries: Country[];
  }
}

interface GetResponseStates {
  _embedded: {
    states: State[];
  }
}
