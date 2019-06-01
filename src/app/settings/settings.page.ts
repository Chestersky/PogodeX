import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { UserPrefService } from 'app/services';
import { UserPreferences } from 'app/models';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss']
})
export class SettingsPage implements OnInit {
  preferences = new FormGroup({
    gender: new FormControl(''),
    outfitStyle: new FormControl('')
  });

  constructor(private userPrefs: UserPrefService) {
    this.userPrefs.userPreferences$.subscribe(prefs => this.preferences.setValue(prefs));
  }

  ngOnInit() {}

  savePreferences() {
    this.userPrefs.updateUserPreferences(this.preferences.value);
  }
}
