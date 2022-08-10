import { Component, OnInit } from '@angular/core';
import { WeatherAPIService } from 'src/app/Services/weather-api.service';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { IcityData } from 'src/app/Interfaces/icity-data';
import { Obj, right } from '@popperjs/core';

@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.scss']
})

export class CityComponent implements OnInit {

  allData:any;
  cityData:IcityData = {
    name:"",
    localTime: "",
    localTimeEpoch: 0
  }
  convertedTimeOfForecast:string = "Čas";

  loading:boolean = true;

  constructor(private test:WeatherAPIService) { }

  ngOnInit(): void {
    this.getAllData();
  }

  getAllData(){
    this.loading = true;

    this.test.getApiData().subscribe(res => {this.allData = res;

      Object.keys(this.allData).forEach(key =>{
        switch(key){
          case "location":
            this.getLocationDetails(this.allData[key]);
            break;
            default: break;
          }
      });
      this.loading = false;
    });
  }

  getLocationDetails(locationData:any){
    Object.keys(locationData).forEach(key=>{
      switch(key){
        case "name":
          this.cityData.name = locationData[key];
          break;
        case "localtime":
          this.cityData.localTime = locationData[key];
          break;
        case "localtime_epoch":
          this.cityData.localTimeEpoch = locationData[key];
          break;
      }
    });

    console.log(this.cityData);
    this.convertedTimeOfForecast = new Date(this.cityData.localTimeEpoch*1000).toLocaleString();
  }
}
