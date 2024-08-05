import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { WeatherService } from 'src/app/core/services/weather.service';
import { CurrentWeather } from 'src/app/shared/models/currentWeather.model';
import { ToastrService } from 'ngx-toastr';
import { LoaderService } from 'src/app/core/services/loader.service';
import { Subscription } from 'rxjs';
import { LocationService } from 'src/app/core/services/location.service';
import { Location } from 'src/app/shared/models/location.model';


@Component({
  selector: 'app-current-weather',
  templateUrl: './current-weather.component.html',
  styleUrls: ['./current-weather.component.scss']
})
export class CurrentWeatherComponent implements OnChanges {
  @Input() selectedLocationKey: string;
  error: string | null = null;
  currentConditions: CurrentWeather = null;
  private subscriptions: Subscription = new Subscription();
  isMetric = true;
  selectedLocationDetails: Location;

  constructor(
    private weatherService: WeatherService,
    private toastr: ToastrService,
    private loaderService: LoaderService,
    private locationService: LocationService
  ) { }
  ngOnInit() {
    this.subscriptions.add(
      this.weatherService.temperatureUnitChanged.subscribe((isMetric) => {
        this.isMetric = (isMetric);
      })
    );
  }
  ngOnChanges(changes: SimpleChanges) {
    if (changes.selectedLocationKey) {
      this.loaderService.addRequest();
      this.locationService.getLocationByKey(this.selectedLocationKey).subscribe({
        next: details => {
          this.selectedLocationDetails = details;
          this.error = null;

        },
        error: err => {
          this.error = 'Error loading city details';
          this.toastr.error(this.error, 'Error');
          this.selectedLocationDetails = null;
        }
      }
      );
      this.weatherService.getCurrentWeather(this.selectedLocationKey).subscribe({
        next: (conditions) => {
          this.currentConditions = conditions[0];
          this.error = null;
          this.loaderService.removeRequest();
        },
        error: (err) => {
          this.error = 'Error loading current conditions';
          this.toastr.error(this.error, 'Error');
          this.currentConditions = null;
          this.loaderService.removeRequest();
        }
      });
    }
  }
  getIconUrl(iconId: Number) {
    return this.weatherService.getIconUrl(iconId);
  }
  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}