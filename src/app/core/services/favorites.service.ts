import { Injectable } from '@angular/core';
import { Location } from 'src/app/shared/models/location.model';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {
  private favorites: Location[] = [];

  constructor() {
    this.loadFavorites();
  }

  private saveFavorites(): void {
    localStorage.setItem('favorites', JSON.stringify(this.favorites));
  }

  private loadFavorites(): void {
    const favorites = localStorage.getItem('favorites');
    if (favorites) {
      this.favorites = JSON.parse(favorites);
    }
  }

  async addToFavorites(location: Location): Promise<void> {
    this.favorites.push(location);
    this.saveFavorites();
  }

  async removeFromFavorites(locationKey: string): Promise<void> {
    const cityToRemoveIndex = this.favorites.findIndex((favorite) => favorite.Key === locationKey);
    if (cityToRemoveIndex !== -1) {
      this.favorites.splice(cityToRemoveIndex, 1);
      this.saveFavorites();
    }
  }

  async getFavorites(): Promise<Location[]> {
    return this.favorites;
  }
}