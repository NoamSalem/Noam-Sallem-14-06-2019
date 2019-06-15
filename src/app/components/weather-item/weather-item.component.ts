import { Component, OnInit, Input } from '@angular/core';
import { WeatherItem } from '../../models/weather.model';
import moment from 'moment';

const DAYS_OF_WEEK = ['Sun', 'Mon','Tue', 'Wed', 'Thur', 'Fri', 'Sat'];

@Component({
  selector: 'weather-item',
  templateUrl: './weather-item.component.html',
  styleUrls: ['./weather-item.component.scss']
})
export class WeatherItemComponent implements OnInit {

  @Input() data: WeatherItem;
  public day: string;
  public date: string;

  constructor() { }

  ngOnInit() {
    this.day = DAYS_OF_WEEK[moment(this.data.dt_txt).day()];
    this.date = moment(this.data.dt_txt).format('DD-MMMM');
  }

}
