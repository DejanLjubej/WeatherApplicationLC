import { Component, OnInit } from '@angular/core';
import { WeatherAPIService } from 'src/app/Services/weather-api.service';
import { IcityData } from 'src/app/Interfaces/icity-data';
import { IallData } from 'src/app/Interfaces/iall-data';
import { Obj } from '@popperjs/core';

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
  allDatas:IallData[] =[{
    dateEpoch: 0,
    day:{
      maxTempC:0,
      minTempC:0
    }
  }]

  convertedTimeOfForecast:string = "Čas";

  loading:boolean = true;

  constructor(private test:WeatherAPIService) { }

  ngOnInit(): void {
    this.getAllData();
  }

  getAllData(){
    this.loading = true;
    this.allDatas = [];
    this.test.getApiData().subscribe(res => {this.allData = res;
      console.log(res);
      Object.keys(res).forEach(key =>{
        switch(key){
          case "location":
            this.getLocationDetails(this.allData["location"]);
            break;
          case "forecast":
            this.getFutureForecast(this.allData["forecast"]);
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

  getFutureForecast(locationData:any){
    locationData.forecastday.forEach((element:any) => {
      let eachDay:IallData ={
        dateEpoch: 0,
        day:{
          maxTempC:0,
          minTempC:0
        }
      } ;
      Object.keys(element).forEach((key:any)=>{
        if(key==="date_epoch"){
          let elem = element[key];
          eachDay.dateEpoch = elem;
        }
        if(key === "day"){
          eachDay.day.maxTempC = element.day.maxtemp_c;
          eachDay.day.minTempC = element.day.mintemp_c;
        }
      });
      this.allDatas.push(eachDay);
      });
      console.log(this.allDatas);
  }
}
