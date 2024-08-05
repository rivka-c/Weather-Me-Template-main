import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SearchPage } from './components/search/search.page';
import { WeatherRoutingModule } from './weather-routing.module';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { HttpClientModule } from '@angular/common/http';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { CurrentWeatherComponent } from './components/current-weather/current-weather.component';
import { DailyForecastComponent } from './components/five-day-forecast/daily-forecast/daily-forecast.component';
import { FiveDayForecastComponent } from './components/five-day-forecast/five-day-forecast.component';
import { WeatherComponent } from './components/weather/weather.component';
import { ToastrModule } from 'ngx-toastr';
import { MatProgressSpinnerModule  } from '@angular/material/progress-spinner';
import { MatGridListModule } from '@angular/material/grid-list';



@NgModule({
  declarations: [SearchPage,
    CurrentWeatherComponent,
    DailyForecastComponent,
    FiveDayForecastComponent,
    WeatherComponent],
  imports: [CommonModule,
    WeatherRoutingModule,
    FormsModule,
    MatInputModule,
    MatAutocompleteModule,
    MatButtonModule,
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatListModule,
    HttpClientModule,
    MatCardModule,
    MatIconModule,
    ToastrModule.forRoot(),
    MatProgressSpinnerModule,
    MatGridListModule,
    
  ],
})
export class WeatherModule { }
