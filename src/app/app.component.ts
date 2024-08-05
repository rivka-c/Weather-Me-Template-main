import { Component, OnInit } from '@angular/core';
import { LoaderService } from './core/services/loader.service';
import { WeatherService } from './core/services/weather.service';
import { Subscription } from 'rxjs';
import { ThemeService } from './core/services/theme.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  displayLoading = false;
  isFahrenheit = false;
  private subscriptions: Subscription = new Subscription();

  constructor(private loaderService: LoaderService, private weatherService: WeatherService, private themeService: ThemeService) { }

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
  toggleTheme() {
    this.themeService.toggleTheme();
  }
  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}


