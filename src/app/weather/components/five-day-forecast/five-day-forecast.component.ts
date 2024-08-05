import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { WeatherService } from 'src/app/core/services/weather.service';
import { Forecast } from 'src/app/shared/models/forecast.model';
import { ToastrService } from 'ngx-toastr';
import { LoaderService } from 'src/app/core/services/loader.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-five-day-forecast',
  templateUrl: './five-day-forecast.component.html',
  styleUrls: ['./five-day-forecast.component.scss']
})
export class FiveDayForecastComponent implements OnChanges {
  @Input() selectedLocationKey: string;
  fiveDayForecast: Forecast;
  error: string | null = null;
  private subscriptions: Subscription = new Subscription();

  constructor(
    private weatherService: WeatherService,
    private toastr: ToastrService,
    private loaderService: LoaderService
  ) { }

  ngOnInit() {
    this.subscriptions.add(
      this.weatherService.temperatureUnitChanged.subscribe(() => {
        this.getForecast();
      })
    );
  }
  ngOnChanges(changes: SimpleChanges) {
    if (changes.selectedLocationKey) {
      this.getForecast();
    }
  }
  getForecast() {
    this.loaderService.addRequest();
    this.weatherService.getForecast(this.selectedLocationKey).subscribe({
      next: (forecast) => {
        this.fiveDayForecast = forecast;
        this.error = null;
        this.loaderService.removeRequest();
      },
      error: (err) => {
        this.error = 'Failed to load forecast';
        this.toastr.error(this.error, 'Error');
        this.loaderService.removeRequest();
      }
    });
  }
  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}