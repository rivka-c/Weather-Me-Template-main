import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchPage } from './weather/components/search/search.page';
import { WeatherComponent } from './weather/components/weather/weather.component';


const routes: Routes = [
  {
    path: 'weather',
    component: WeatherComponent,
  },
  {
    path: 'weather/:locationKey', 
    component: WeatherComponent,
  },
  { path: '', redirectTo: 'weather', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
