import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StartMenuComponent } from './components/start-menu/start-menu.component';
import { HouseComponent } from './components/house/house.component';
import { InfoComponent } from './components/info/info.component';

const routes: Routes = [
  { path: '', redirectTo: '/menu', pathMatch: 'full' },
  { path: 'menu', component: StartMenuComponent },
  { path: 'house', component: HouseComponent },
  { path: 'info', component: InfoComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
