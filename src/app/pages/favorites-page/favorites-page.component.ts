import { Component, OnInit } from '@angular/core';
import { FavoritesService } from '../../services/favorites.service';
import { WeatherService } from '../../services/weather.service';
import { City } from 'src/app/models/city.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-favorites-page',
  templateUrl: './favorites-page.component.html',
  styleUrls: ['./favorites-page.component.scss']
})
export class FavoritesPageComponent implements OnInit {

  public favorites: City[] = [];
  public list: any;

  constructor(private favoritesService: FavoritesService, private weatherService: WeatherService, private router: Router) { }

  ngOnInit() {
    this.getFavorites();
  }

  private getFavorites() {
    this.favorites = this.favoritesService.getFavorites();

    if (this.favorites.length > 0) {
      this.weatherService.getCurrentWeatherForGroupByIds(this.favorites.map(f => f.id)).subscribe(group => {
        this.list = group.list;
      });
    }
  }

  public getForecast(cityId: number) {
    this.router.navigateByUrl(`home?id=${cityId}`);
  }

}
