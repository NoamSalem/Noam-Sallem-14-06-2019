import { City } from "./city.model";

export class WeatherResponse {
    list: WeatherItem[] = [];
    message: number;
    code: string;
    cnt: Number;
    city: City;
}

export class WeatherItem {
    dt: number; //Time of data forecasted, unix, UTC
    dt_txt: string
    main:MainInfo;
    wind: Wind;
    weather: Weather [];

    clounds: any;
    sys: any;
}

export const DATE_FORMAT = 'YYYY-MM-DD HH:mm:ss';

class Wind {
    deg: number;
    speed: number;
}

class Weather {
    description: string;
    icon: string;
    id: number;
    main: string;
}

class MainInfo {
    grnd_level: number;
    humidity: number;
    pressure: number;
    sea_level: number;
    temp: number;
    temp_kf: number;
    temp_max: number;
    temp_min: number;
}