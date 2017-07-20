import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AirportsComponent } from '../airports/airports/airports.component';

const routes: Routes = [
	{ path: 'airports', component: AirportsComponent },
	{ path: 'notfound', component: AirportsComponent }
  	//{ path: '**', redirectTo: '/notfound' }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class RoutingModule { }
