import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { WeatherPage } from './weather.page';
import { OutfitPreviewComponent } from 'app/outfit-preview/outfit-preview.component';

const routes: Routes = [
  {
    path: '',
    component: WeatherPage
  }
];

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, RouterModule.forChild(routes)],
  declarations: [WeatherPage, OutfitPreviewComponent]
})
export class WeatherPageModule {}
