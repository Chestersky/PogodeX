import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { UserPrefService } from 'app/services';
import { UserPreferences, Gender, OutfitStyle } from 'app/models';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss']
})
export class SettingsPage implements OnInit {
  preferences = new FormGroup({
    gender: new FormControl(Gender.Female),
    outfitStyle: new FormControl(OutfitStyle.Formal)
  });

  constructor(private userPrefs: UserPrefService) {
    this.userPrefs.userPreferences$.subscribe(prefs => this.preferences.setValue(prefs));
  }

  ngOnInit() {}

  savePreferences() {
    this.userPrefs.updateUserPreferences(this.preferences.value);
  }
}
