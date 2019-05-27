import { Component, OnInit } from '@angular/core';
import { UserPreferences, Gender } from '../models';

@Component({
  selector: 'app-outfit-preview',
  templateUrl: './outfit-preview.component.html',
  styleUrls: ['./outfit-preview.component.scss']
})
export class OutfitPreviewComponent implements OnInit {
  userPrefs: UserPreferences = { gender: Gender.Male, preferredOutfit: 'casual' };
  temperature: 'freezing' | 'cold' | 'warm' | 'hot' = 'cold';

  constructor() {}

  ngOnInit() {}

  get imagePath() {
    return `assets/img/outfits/${this.userPrefs.gender}_${this.userPrefs.preferredOutfit}_${
      this.temperature
    }.svg`;
  }
}
