import { Component, OnInit, Input } from '@angular/core';
import { UserPreferences, Gender, Weather, OutfitStyle } from '../models';

@Component({
  selector: 'app-outfit-preview',
  templateUrl: './outfit-preview.component.html',
  styleUrls: ['./outfit-preview.component.scss']
})
export class OutfitPreviewComponent implements OnInit {
  @Input() weather: Weather;
  @Input() userPrefs: UserPreferences = { gender: Gender.Female, outfitStyle: OutfitStyle.Formal };
  readonly temperatureThresholds = {};
  outfit: 'freezing' | 'cold' | 'warm' | 'hot' = 'cold';

  constructor() {}

  ngOnInit() {
    if (this.weather) {
      const temp = this.weather.list[0].main.temp;
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

  get imagePath() {
    return `assets/img/outfits/${this.userPrefs.gender}_${this.userPrefs.outfitStyle}_${
      this.outfit
    }.svg`;
  }
}
