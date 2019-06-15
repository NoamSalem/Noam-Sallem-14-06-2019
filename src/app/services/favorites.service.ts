import { Injectable } from '@angular/core';
import { City } from '../models/city.model';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {

  constructor() { }

  public addToFavorites(newFavorite: City) {
    const favorites = this.getFavorites();
    favorites.push(newFavorite);
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }

  public removeFromFavorites(favoriteToRemove: City) {
    const favorites = this.getFavorites();
    const index = favorites.findIndex(f => f.id === favoriteToRemove.id);
    favorites.splice(index, 1);
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }


  public getFavorites(): City[] {
    const favorites = JSON.parse((localStorage.getItem('favorites')));
    return favorites? favorites : [];
  }

  public isInFavorites(cityId: number): boolean {
    const favorites: City[] = this.getFavorites();
    const exists = favorites.find(f => f.id === cityId);
    return exists? true : false;
  }

}
