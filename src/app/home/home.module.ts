import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, IonTabs } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule, Route } from '@angular/router';

import { HomePage } from './home.page';
import { WeatherDate } from 'app/models';

const routes: Route[] = [
  {
    path: '',
    component: HomePage,
    children: [
      {
        path: 'today',
        children: [
          {
            loadChildren: '../weather/weather.module#WeatherPageModule',
            path: '',
            data: { date: WeatherDate.Today }
          }
        ]
      },
      {
        path: 'tomorrow',
        children: [
          {
            path: '',
            loadChildren: '../weather/weather.module#WeatherPageModule',
            data: { date: WeatherDate.Tomorrow }
          }
        ]
      },
      {
        path: 'day-after-tomorrow',
        children: [
          {
            path: '',
            loadChildren: '../weather/weather.module#WeatherPageModule',
            data: { date: WeatherDate.DayAfterTomorrow }
          }
        ]
      },
      { path: '', redirectTo: 'today', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, RouterModule.forChild(routes)],
  declarations: [HomePage]
})
export class HomePageModule {}
