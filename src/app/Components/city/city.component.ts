import { Component, OnInit } from '@angular/core';
import { WeatherAPIService } from 'src/app/Services/weather-api.service';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { IcityData } from 'src/app/Interfaces/icity-data';

@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.scss']
})

export class CityComponent implements OnInit {

  testString:any;

  loading:boolean = true;
  constructor(private test:WeatherAPIService, private http:HttpClient) { }

  ngOnInit(): void {
    this.test.getApiData().subscribe(res => {this.testString = res;

      Object.keys(this.testString).forEach(key =>{
       });

    });
  }

  getLocationDetails(){

  }

}
