import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

declare var google: any;

@IonicPage()
@Component({
  selector: 'page-maps',
  templateUrl: 'maps.html',
})
export class MapsPage {
  @ViewChild('map') mapRef : ElementRef;
  map: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log(this.mapRef);
    this.showMap();
  }

  showMap() {
    const location = new google.maps.LatLng(51.507351, -0.127758);

    const options ={
      center: location,
      zoom: 10
    }

    this.map = new google.maps.Map(this.mapRef.nativeElement, options);
  }

}
