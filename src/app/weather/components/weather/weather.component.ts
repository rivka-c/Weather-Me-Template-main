import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormControl } from '@angular/forms';
import { LocationService } from 'src/app/core/services/location.service';
import { Location } from 'src/app/shared/models/location.model';
import { WeatherService } from 'src/app/core/services/weather.service';
import { catchError, debounceTime, of, switchMap } from 'rxjs';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { LoaderService } from 'src/app/core/services/loader.service';


@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss'],
  animations: [
    trigger('fadeIn', [
      state('void', style({ opacity: 0 })),
      transition(':enter', [
        animate('1000ms ease-in', style({ opacity: 1 }))
      ])
    ])
  ]
})
export class WeatherComponent implements OnInit {
  searchControl = new FormControl();
  locations: Location[] = [];
  error: string | null = null;
  selectedLocationKey: string = null;

  isLoading = false;
  constructor(private weatherService: WeatherService, private locationService: LocationService, private loaderService: LoaderService) { }

  ngOnInit(): void {
    this.loaderService.stateChange.subscribe(state => {
      this.isLoading = state;
    });
  }
  onSearchCompleted(event: string) {
    this.selectedLocationKey = event;
  }
}