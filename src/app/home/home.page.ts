import { Component, OnInit } from '@angular/core';
import  { ApicallsService } from '../services/apicalls.service';
import dateFormat from 'dateformat';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{

  city: any;
  citywether: any;
  locationdata: any;
  localtime:  any;
  now = new Date();
  forecastdata: object;
  img: any;
  constructor(private apicall: ApicallsService) {}

  ngOnInit(){

    this.apicall.location.subscribe(res => {
      this.locationdata = res;
      this.city = this.locationdata?.EnglishName;
      console.log(this.city);
    });

    this.apicall.currentweather.subscribe(res => {
      this.citywether = res;
      this.localtime = dateFormat(this.citywether?.LocalObservationDateTime, 'dddd,dd mmmm');
      this.img = this.getImg(this.citywether?.WeatherIcon);
    });

    this.apicall.forecastweather.subscribe(res => {
      this.forecastdata = res;
    });

  }

   getname(){
     if(this.city){
      console.log(this.city);
      this.apicall.getcitydata(this.city).subscribe(res => {
        this.locationdata = res.data[0];
        console.log(this.locationdata);
        localStorage.setItem('location',JSON.stringify(this.locationdata));
        this.apicall.getcurrentweather(this.locationdata?.Key).subscribe(resp => {
          this.citywether = resp.data[0];
          console.log(this.citywether);
          this.img = this.getImg(this.citywether?.WeatherIcon);
          localStorage.setItem('currentweather',JSON.stringify(this.citywether));
          this.localtime = dateFormat(this.citywether.LocalObservationDateTime, 'dddd,dd mmmm');
        });

        this.apicall.getforecast(this.locationdata?.Key).subscribe(resp => {
          this.forecastdata = resp.data.DailyForecasts;
          console.log(this.forecastdata);
          localStorage.setItem('forecastweather',JSON.stringify(this.forecastdata));
        });

      });
     } else {
      console.log('empty');
     }
   }


   getDay(daystring){
     return dateFormat(daystring, 'dddd');
   }

   getCelsius(temp){
     return this.truncate(( temp - 32)* 0.5556,1);
   }

   truncate(num, places) {
    return Math.trunc(num * Math.pow(10, places)) / Math.pow(10, places);
  }

  getImg(num){
    if( num === 1 || num === 2 ||num === 33 || num === 34 || num === 30){
      return 'assets/images/clear-sky.png';
    } else if(  num === 3 || num === 5 ||num === 6 || num === 35 || num === 37){
      return 'assets/images/few-clouds.png';
    } else if( num === 7 || num === 8 ||num === 19 || num === 20 || num === 21 || num === 43 || num === 38 ){
      return 'assets/images/broken-clouds.png';
    } else if( num === 42 || num === 41 ||num === 17 || num === 16 || num === 15 || num === 32 ){
      return 'assets/images/thunderstorm.png';
    } else if( num === 18 || num === 26 ||num === 29) {
      return 'assets/images/rain.png';
    } else if( num === 4 || num === 36 ) {
      return 'assets/images/scattered-clouds.png';
    } else if( num === 11 || num === 25 || num === 43 ) {
      return 'assets/images/mist.png';
    } else if(  num === 44 || num === 29 ||num === 23 || num === 31 || num === 22){
      return 'assets/images/snow.png';
    } else{
      return 'assets/images/shower-rain.png';
    }
  }

}
