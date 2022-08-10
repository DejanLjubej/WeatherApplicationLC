import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IcityData } from '../Interfaces/icity-data';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class WeatherAPIService {

  constructor(private http: HttpClient) {}
  getApiData(){
    return this.http.get<any>(
      'http://api.weatherapi.com/v1/forecast.json?key=aadf6592b7b14be7bca72114221008&q=Maribor&days=1&aqi=no&alerts=no'
      )
    }
  }

  //  headers = new HttpHeaders({
  //   'interactiveWeather-host': 'api.weatherapi.com',
  //    'interactiveWeather-key': 'aadf6592b7b14be7bca72114221008'
  // });
