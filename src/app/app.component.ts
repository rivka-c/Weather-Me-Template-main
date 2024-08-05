import { Component, OnInit } from '@angular/core';
import { LoaderService } from './core/services/loader.service';
import { WeatherService } from './core/services/weather.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  displayLoading = false;
  isFahrenheit = false;
  private subscriptions: Subscription = new Subscription();

  constructor(private loaderService: LoaderService, private weatherService: WeatherService) { }

  ngOnInit() {
    this.subscriptions.add(
      this.weatherService.temperatureUnitChanged.subscribe(isMetric => {
        this.isFahrenheit = isMetric === true ? false : true;
      })
    );
    this.subscriptions.add(
      this.loaderService.stateChange.subscribe((loaderState) => {
        setTimeout(() => {
          this.displayLoading = loaderState;
        });
      })
    );
  }

  changeTemperatureUnit() {
    this.weatherService.isMetric = !this.weatherService.isMetric;
    this.weatherService.setTemperatureUnit();
  }
  
  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}


