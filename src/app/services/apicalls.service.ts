import { Injectable } from '@angular/core';
import { Http, HttpResponse } from '@capacitor-community/http';
import { environment } from '../../environments/environment';
import { BehaviorSubject, from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApicallsService {


  location = new BehaviorSubject(JSON.parse(localStorage.getItem('location')));
  currentweather = new BehaviorSubject(JSON.parse(localStorage.getItem('currentweather')));
  forecastweather = new BehaviorSubject(JSON.parse(localStorage.getItem('forecastweather')));

  constructor() { }



  getcitydata(city) {
    const option = {
      url: 'http://dataservice.accuweather.com/locations/v1/cities/search',
      headers: {},
      params: { apikey: environment.apiKey, q: city },
    };
    return from(Http.get(option));
  }

  getcurrentweather(locationkey) {
    const option = {
      url: 'http://dataservice.accuweather.com/currentconditions/v1/' + locationkey,
      headers: {},
      params: { apikey: environment.apiKey, details: 'true' },
    };
    return  from(Http.get(option));
  }

  getforecast(locationkey){
    const option = {
      url: 'http://dataservice.accuweather.com/forecasts/v1/daily/5day/' + locationkey,
      headers: {},
      params: { apikey: environment.apiKey, details: 'true' },
    };
    return  from(Http.get(option));
  }
}
