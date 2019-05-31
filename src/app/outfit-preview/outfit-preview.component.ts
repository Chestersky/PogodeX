import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { UserPreferences, Gender, Weather, OutfitStyle } from '../models';

@Component({
  selector: 'app-outfit-preview',
  templateUrl: './outfit-preview.component.html',
  styleUrls: ['./outfit-preview.component.scss']
})
export class OutfitPreviewComponent implements OnInit, OnChanges {
  @Input() weather: Weather;
  @Input() userPrefs: UserPreferences;
  readonly temperatureThresholds = {};
  outfit: 'freezing' | 'cold' | 'warm' | 'hot' = 'cold';

  constructor() {}

  ngOnInit() {
    if (this.weather) {
      const temp = Math.round(this.weather.list[0].main.temp);
      if (temp <= -5) {
        this.outfit = 'freezing';
      } else if (temp > -5 && temp <= 10) {
        this.outfit = 'cold';
      } else if (temp > 10 && temp <= 25) {
        this.outfit = 'warm';
      } else if (temp > 25) {
        this.outfit = 'hot';
      }
    }
  }

  ngOnChanges() {
    if (!this.userPrefs) {
      this.userPrefs = { gender: Gender.Female, outfitStyle: OutfitStyle.Formal };
    }
  }

  get imagePath() {
    return `assets/img/outfits/${this.userPrefs.gender}_${this.userPrefs.outfitStyle}_${
      this.outfit
    }.png`;
  }
}
