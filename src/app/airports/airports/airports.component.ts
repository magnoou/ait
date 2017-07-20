import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { AirportService } from '../../services/airport.service';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs//Rx';

import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';

declare var google;

//Const for conversion
const nauticalMile:number = 0.000539957;
@Component({
  selector: 'app-airports',
  templateUrl: './airports.component.html',
  styleUrls: ['./airports.component.css']
})
export class AirportsComponent implements OnInit {

	myControl: FormControl;
	myControl2: FormControl;
	originAp: any;
	destinationAp: any;
	distance:any;
	options:any[] = [];
	options2:any[] = [];
   filteredOptions: any;
   filteredOptions2: any;
   byCodeSearch:boolean;


@ViewChild('map') mapElement: ElementRef;
  map: any;

	firstAirportLat:number;
	firstAirportLon:number;
	secAirportLat:number;
	secAirportLon:number;
	marker1:any;
	marker2:any;
    poly:any;
    geodesicPoly:any;
	
  constructor(private airportService:AirportService) {
  	this.myControl = new FormControl();
  	this.myControl2 = new FormControl();
  	this.byCodeSearch = false;
  	this.distance = "";
  	this.originAp = {"name":""};
  	this.destinationAp = {"name":""};
  	this.filteredOptions = this.myControl.valueChanges
        .startWith(null)
        .map(name => this.filter(true,name));
    this.filteredOptions2 = this.myControl2.valueChanges
        .startWith(null)
        .map(name => this.filter(false,name));
  }

  //Clear input value on click
  clearAp(evt){
  	evt.target.value ="";
  	this.distance = "";
  }

  ngOnInit() {
  	console.log("AIRPORT COMPONENT");
  }

  //Filter function for ng autocomplete
  filter(code: boolean, val: string): any[] {
  	
  	if(code)
  		this.options = [];
  	else
  		this.options2 = [];
  	if(val && val.length > 0){


  	this.airportService.getAirport(val, this.byCodeSearch).subscribe(
  		res => {console.log("AIRPORT res ",res)
	  		if (res && res.length > 0){
	  			for(var x=0;x<res.length;x++){
	  				if(code)
	  					if (this.byCodeSearch)
	  						this.options.push(res[x]);
	  					else
	  						this.options.push(res[x]);
	  				else
	  					if (this.byCodeSearch)
	  						this.options2.push(res[x]);
	  					else
	  						this.options2.push(res[x]);
	  					//this.options2.push(res[x].code);

	  			}
	  		} 
  		},
  		error => console.log("AIRPORT2 ",error)
  		);
  	}
  	 return (code)?this.options:this.options2;
   }

	apSelected(){
		//Fires map loading when both airports are selected
	   	if (this.originAp && this.originAp.lat && this.destinationAp && this.destinationAp.lat){
	   		this.firstAirportLat = this.originAp.lat;
	  		this.firstAirportLon = this.originAp.lon;
	  		this.secAirportLat= this.destinationAp.lat;
	  		this.secAirportLon= this.destinationAp.lon;
	   		this.loadMap();
	  		this.calculateDistance();
	   	}
    }

    //Calculates the nautical miles value since google api returns meters value
	calculateDistance(){
	  	var ap1Cord = new google.maps.LatLng(this.firstAirportLat, this.firstAirportLon);
	    var ap2Cord = new google.maps.LatLng(this.secAirportLat, this.secAirportLon);
	    this.distance = google.maps.geometry.spherical.computeDistanceBetween(ap1Cord, ap2Cord)*nauticalMile;
	}
	
	//Toggle for searching by name or by IATA code
	changeSearch(){
	  	this.byCodeSearch=!this.byCodeSearch;
	}

	loadMap(){
 		var classRef = this;
 
      	let latLng = new google.maps.LatLng(this.firstAirportLat,this.firstAirportLon);
 
	    let mapOptions = {
	        //center: latLng,
	    	zoom: 15,
	        mapTypeId: google.maps.MapTypeId.ROADMAP
	    }
 
      	this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);


      	this.marker1 = new google.maps.Marker({
        	map: this.map,
          	draggable: true,
          	position: {lat: this.firstAirportLat, lng: this.firstAirportLon}
        });

        this.marker2 = new google.maps.Marker({
          	map: this.map,
          	draggable: true,
          	position: {lat: this.secAirportLat, lng: this.secAirportLon}
        });
        

        this.poly = new google.maps.Polyline({
          strokeColor: '#FF0000',
          strokeOpacity: 1.0,
          strokeWeight: 3,
          map: this.map,
        });

        this.geodesicPoly = new google.maps.Polyline({
          strokeColor: '#CC0099',
          strokeOpacity: 1.0,
          strokeWeight: 3,
          geodesic: true,
          map: this.map
        });

        this.update();

		let mimap=this.map;

		//this was just for testing cuz i was having problems with the zoom
		this.map.addListener('zoom_changed', function() {
		    var z = mimap.getZoom();
		    console.log("zoom=",z);
		});

        //click marker event
        this.map.addListener('click', function(evt, trw){
          //was going to add more functionality to markers but ran out of time
        });

        let markers = [];
	}

	update() {
        var path = [this.marker1.getPosition(), this.marker2.getPosition()];
        this.poly.setPath(path);
        this.geodesicPoly.setPath(path);
        var bounds = new google.maps.LatLngBounds();
        bounds.extend(this.marker1.getPosition());
        bounds.extend(this.marker2.getPosition());
        this.map.fitBounds(bounds);
        //var heading = google.maps.geometry.spherical.computeHeading(path[0], path[1]);
        //document.getElementById('heading').value = heading;
        //document.getElementById('origin').value = path[0].toString();
        //document.getElementById('destination').value = path[1].toString();
      }

}
