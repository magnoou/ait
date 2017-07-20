import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { RoutingModule } from './routing/routing.module';
import { AppComponent } from './app.component';
import { AirportsComponent } from './airports/airports/airports.component';
import { AirportService } from './services/airport.service';
import { HttpModule } from '@angular/http';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {MaterialModule} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    AirportsComponent
  ],
  imports: [
  	MaterialModule,
  	BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
  	NgbModule.forRoot(),
    BrowserModule,
    RoutingModule,
    HttpModule
  ],
  providers: [
  	AirportService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
