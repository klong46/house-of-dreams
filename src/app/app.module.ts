import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StartMenuComponent } from './components/start-menu/start-menu.component';
import { HouseComponent } from './components/house/house.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MatSliderModule } from '@angular/material/slider';
import { InfoComponent } from './components/info/info.component';

@NgModule({
  declarations: [
    AppComponent,
    StartMenuComponent,
    HouseComponent,
    InfoComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    MatSliderModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
