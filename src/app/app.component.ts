/// <reference types="@types/googlemaps" />
import { AngularFirestore } from '@angular/fire/firestore';
import { AgmCoreModule } from '@agm/core';
import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { MapsAPILoader } from '@agm/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'preetyTuff';
  data:any=[]
  latitude!: number;
  longitude!: number;
  zoom!: number;
  address!: string;
  cLen:any=0;
  private geoCoder!: google.maps.Geocoder;
  constructor(private store: AngularFirestore,private router:Router) {}
  email:any;
  check:any
  ngOnInit() {
  }
  ngDoCheck(): void { 
    this.email=sessionStorage.getItem("uEmail");
    this.check=sessionStorage.getItem("uCustomer")
    this.cLen=JSON.parse(sessionStorage.getItem("uCart")||'{}').length
    
  }
  // todo = this.store.collection('shop').valueChanges({ merchId: 'mId' }).subscribe(res=>{
  //   console.log(res);
  // });

  
  logout() {
    sessionStorage.clear();
    this.router.navigate(['/login']);
  }
}
