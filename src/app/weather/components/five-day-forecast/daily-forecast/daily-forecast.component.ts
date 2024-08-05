import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { WeatherService } from 'src/app/core/services/weather.service';
import { DailyForecast } from 'src/app/shared/models/forecast.model';

@Component({
  selector: 'app-daily-forecast',
  templateUrl: './daily-forecast.component.html',
  styleUrls: ['./daily-forecast.component.scss']
})
export class DailyForecastComponent {

constructor(private weatherService: WeatherService) {
}
  @Input() dailyForecast: DailyForecast;
  getIconUrl(iconId: Number) {
   return this.weatherService.getIconUrl(iconId);
// return `https://developer.accuweather.com/sites/default/files/${iconId.toString().padStart(2, '0')}-s.png`;
}
}
