import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { StatesComponent } from './states/states.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    StatesComponent,
    NavBarComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    NgxChartsModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
