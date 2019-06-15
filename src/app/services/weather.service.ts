import { Injectable } from '@angular/core';
import { HttpHandlerService } from './http-handler.service';


@Injectable({
  providedIn: 'root'
})
export class WeatherService extends HttpHandlerService {

  private url = 'https://api.openweathermap.org/data/2.5/forecast?APPID=493da02645d3ef28f03073e89f7211eb&units=metric&';

  public getWeatherByGeoLocation(lat: number, lon: number) {
    const query = `lat=${lat}&lon=${lon}`;
    return this.get(this.url + query, {});
  }

  public getWeatherByCity(city: string, country: string) {
    const query = `q=${city},${country}`;
    return this.get(this.url + query, {});
  }

  public getWeatherById(id: number) {
    const query = `id=${id}`;
    return this.get(this.url + query, {});
  }

  public getCurrentWeatherForGroupByIds(ids: number[]) {
    const url = 'http://api.openweathermap.org/data/2.5/group?APPID=493da02645d3ef28f03073e89f7211eb&units=metric&id=';
    const idsQuery = ids.join(',');
    return this.get(url + idsQuery, {});
  }
}
