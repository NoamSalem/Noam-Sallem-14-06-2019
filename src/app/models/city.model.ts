export class City {
    coord: GeoPoints;
    country: string;
    id: number;
    name: string;
    population?: number;
    timezone?: number;
}

class GeoPoints {
    lat: number;
    lon: number;
}