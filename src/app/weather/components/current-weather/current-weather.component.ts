import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { WeatherService } from 'src/app/core/services/weather.service';
import { CurrentWeather } from 'src/app/shared/models/currentWeather.model';
import { ToastrService } from 'ngx-toastr';
import { LoaderService } from 'src/app/core/services/loader.service';
import { Subscription } from 'rxjs';
import { ThemeService } from 'src/app/core/services/theme.service';


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


  constructor(
    private weatherService: WeatherService,
    private toastr: ToastrService,
    private loaderService: LoaderService,
    private themeService: ThemeService
  ) {}
  ngOnInit() {
   this.subscriptions.add(
      this.weatherService.temperatureUnitChanged.subscribe((isMetric) => {
        this.isMetric=(isMetric);
      })
   );
   this.subscriptions.add(
  this.themeService.isDarkTheme$.subscribe(isDark => {
      debugger;
      const theme = isDark ? 'dark-theme' : 'light-theme';
      document.body.classList.add(theme);
      document.body.classList.remove(isDark ? 'light-theme' : 'dark-theme');
    })
   );
  }
  ngOnChanges(changes: SimpleChanges) {
    if (changes.selectedLocationKey) {
      this.loaderService.addRequest();
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