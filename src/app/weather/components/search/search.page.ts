import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormControl } from '@angular/forms';
import { LocationService } from 'src/app/core/services/location.service';
import { Location } from 'src/app/shared/models/location.model';
import { WeatherService } from 'src/app/core/services/weather.service';
import { catchError, debounceTime, of, switchMap } from 'rxjs';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { FavoritesService } from 'src/app/core/services/favorites.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],

})
export class SearchPage implements OnInit {
  searchControl = new FormControl('Tel Aviv');
  @Output() searchCompleted = new EventEmitter<string>();

  locations: Location[] = [];
  error: string | null = null;
  favorites: Location[] = [];
  private currentQuery: string = '';


  constructor(private favoritesService: FavoritesService, private locationService: LocationService, private toastr: ToastrService) { }

  ngOnInit() {
    this.onCitySelected();
    this.searchControl.valueChanges.pipe(
      debounceTime(300),
      switchMap(query => {
        if (!this.isEnglishLettersOnly(query)) {
          this.error = 'Please enter English letters only';
          this.toastr.error(this.error, 'Error');
          this.searchControl.setValue(query.replace(/[^A-Za-z\s]/g, ''), { emitEvent: false });
          return of([]);
        } else {
          this.error = null;
          this.currentQuery = query;
          return this.locationService.getAutocompleteLocation(query).pipe(
            catchError(err => {
              this.error = 'Error loading data';
              this.toastr.error(this.error, 'Error');
              return of([]);
            })
          );
        }
      })
    ).subscribe(locations => {
      if (this.currentQuery === this.searchControl.value) {
        this.locations = locations;
        this.error = null;
        this.loadFavorites();
      }
    });
  }

  isEnglishLettersOnly(input: string): boolean {
    const englishLettersRegex = /^[A-Za-z\s]*$/;
    return englishLettersRegex.test(input);
  }

  async loadFavorites() {
    this.favorites = await this.favoritesService.getFavorites()
  }
  onCitySelected(event?: any) {
    const selectedLocation = this.locations.find(location => location.LocalizedName === event?.option?.value);
    let selectedLocationKey: string = '215854';
    if (selectedLocation) {
      selectedLocationKey = selectedLocation.Key;
    }
    this.searchCompleted.emit(selectedLocationKey);
  }

  isFavorite(locationKey: string): boolean {
    return this.favorites.some((fav) => fav.Key == locationKey);
  }

  async toggleFavorite(location: Location) {
    if (this.isFavorite(location.Key)) {
      await this.favoritesService.removeFromFavorites(location.Key);
      this.favorites = await this.favoritesService.getFavorites();
    } else {
      await this.favoritesService.addToFavorites(location);
      this.favorites = await this.favoritesService.getFavorites();
    }
  }
}