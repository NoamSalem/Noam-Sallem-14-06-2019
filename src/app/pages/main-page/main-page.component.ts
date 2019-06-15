import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../../services/weather.service';
import { FavoritesService } from '../../services/favorites.service';
import { ErrorDialogComponent } from '../../components/error-dialog/error-dialog.component';
import { WeatherResponse, WeatherItem, DATE_FORMAT } from '../../models/weather.model';
import { ActivatedRoute } from '@angular/router';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import cities from '../../static-data/city.list.json';
import { City } from 'src/app/models/city.model';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import moment from 'moment';
import { MatDialog } from '@angular/material/dialog';

const DAYS_OF_WEEK = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {

  public form: FormGroup;
  private cityOptions: City[] = cities;
  public filteredCityOptions: Observable<City[]>;
  public weatherForecast: WeatherResponse;
  public isFavorite: boolean;
  public day: string;
  public condition: string;

  constructor(private weatherService: WeatherService,
    private favoritesService: FavoritesService,
    private dialog: MatDialog,
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute) {

    this.form = this.fb.group({
      city: ['', this.englishLetterValidator]
    })
  }

  ngOnInit() {
    this.setFilteredCityOptionsListener();

    const cityId = Number(this.activatedRoute.snapshot.queryParamMap.get('id'));
    if (cityId) {
      this.getWeatherForecast(cityId);
    } else {
      this.getInitialWeather();
    }

  }

  public get controls() {
    return this.form.controls;
  }

  private setFilteredCityOptionsListener() {
    this.filteredCityOptions = this.form.controls.city.valueChanges
      .pipe(
        startWith(''),
        map(value => typeof value === 'string' ? value : value.name),
        map(name => name ? this._filter(name) : this.cityOptions.slice())
      );
  }


  private _filter(value: string): City[] {

    return this.cityOptions.filter(option => option.name.toLowerCase().indexOf(value) === 0 || option.country.toLowerCase().indexOf(value) === 0);
  }

  public displayFn(city?: City): string | undefined {
    return city ? `${city.name}, ${city.country}` : undefined;
  }

  private getInitialWeather() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.weatherService.getWeatherByGeoLocation(position.coords.latitude, position.coords.longitude).subscribe((weatherResponse: WeatherResponse) => {
          this.setFiveDaysForecast(weatherResponse);
        });
      });
    } else {
      this.weatherService.getWeatherByCity('Tel Aviv', 'IL').subscribe((weatherResponse: WeatherResponse) => {
        this.setFiveDaysForecast(weatherResponse);
      });
    }
  }

  public toggleFavorite() {
    if (this.favoritesService.isInFavorites(this.weatherForecast.city.id)) {
      this.favoritesService.removeFromFavorites(this.weatherForecast.city);
      this.isFavorite = false;
    } else {
      this.favoritesService.addToFavorites(this.weatherForecast.city);
      this.isFavorite = true;
    }
  }

  public citySelected(city: City) {
    this.getWeatherForecast(city.id);
  }

  private getWeatherForecast(cityId: number) {
    this.weatherService.getWeatherById(cityId).subscribe((weatherResponse: WeatherResponse) => {
      this.setFiveDaysForecast(weatherResponse);
    }, err => {
      this.openErrorDialog();
    });
  }

  private setFiveDaysForecast(weatherResponse: WeatherResponse) {
    this.weatherForecast = weatherResponse;
    const newList: WeatherItem[] = [weatherResponse.list[0]];
    const forecastDay = moment(weatherResponse.list[0].dt_txt);
    for (let i = 0; i < 4; i++) {
      const dateToSearch = forecastDay.add(1, 'day').format(DATE_FORMAT);
      const dayForecast = weatherResponse.list.find(weatherItem => weatherItem.dt_txt === dateToSearch);
      if (dayForecast) {
        newList.push(dayForecast);
      }
    }
    this.weatherForecast.list = newList;
    this.isFavorite = this.favoritesService.isInFavorites(this.weatherForecast.city.id);

    this.condition = this.weatherForecast.list[0].weather[0].description;
    this.day = DAYS_OF_WEEK[moment(this.weatherForecast.list[0].dt_txt).day()];

  }


  private openErrorDialog(): void {
    this.dialog.open(ErrorDialogComponent, {
      width: '250px',
    });
  }

  private englishLetterValidator(control: FormControl) {
    
    if (typeof control.value === 'object') {
      return null;
    }
    
    if (/^[a-zA-Z, \s]*$/.test(control.value)) {
      return null;
    }

    return {english: true}
  }

}
