import { Component, OnInit } from '@angular/core';
import { WeatherAPIService } from 'src/app/Services/weather-api.service';

@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.scss']
})

export class CityComponent implements OnInit {

  testString:object=[];

  loading:boolean = false;
  constructor(private test:WeatherAPIService) { }

  ngOnInit(): void {
    this.testString = this.test.getTest();
    console.log(this.testString);
  }

  Test(){
    console.log("Test executed");
  }
}
