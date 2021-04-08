import { Component, NgZone, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import firebase from 'firebase/app';
import 'firebase/firestore';
import { UUID } from 'angular2-uuid';
import { Order } from './order'
import { Timestamp } from '@google-cloud/firestore';
import { MapsAPILoader } from '@agm/core';
@Component({
  selector: 'app-map-locator',
  templateUrl: './map-locator.component.html',
  styleUrls: ['./map-locator.component.css']
})
export class MapLocatorComponent implements OnInit {
  data: any[] = []
  lat:any= 22.280140
  lng:any= 73.158770
  cart: any
  zoom:any=8
  cDate:any
  ordersPlaced: Order[] = []
  uuidValue!: string;
  storesSelected: any[] = []
  selectedProd: any
  selectedQuant: any
  map:any;
  successMsg:any;
  declare navigator:any;
  pStatus:any;
  constructor(private store: AngularFirestore, private router: Router, 
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone) { 
    //  this.GetCurrentLocation()
    }

  db = firebase.firestore();

  ngOnInit(): void {
    this.cart = JSON.parse(sessionStorage.getItem('uCart') || '{}');

    console.log("cart:", this.cart)
  }

  public GetCurrentLocation(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position)  =>            { 
         this.ShowLocation(position, this.map);
      });
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }

  private ShowLocation(position: any, map: any): void {
    this.lng = +position.coords.longitude;
    this.lat = +position.coords.latitude;
   
  }

  handleChange(e: any) {
    console.log(e)
    this.selectedProd = e.p_Id
    this.data = [];

    this.db.collection('shop').where(`sInStock.${e.p_Id}`, ">=", e.pQuantity).get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          let data = doc.data();
          console.log(doc.id)
          data["sId"] = doc.id
          this.data.push(data);
          console.log(this.data)
        })
      })
  }

  checkout() {

    console.log("booked order")
    this.uuidValue = UUID.UUID();
    if(this.pStatus==false)
      this.cDate=firebase.firestore.Timestamp.fromDate(new Date(new Date().setSeconds(new Date().getSeconds() + 20)))
    else
      this.cDate=firebase.firestore.Timestamp.fromDate(new Date(new Date().setSeconds(new Date().getSeconds() + 4000)))
   
      for (let a of this.storesSelected) {
      let price = this.cart.find((res: any) => res.p_Id == a.selectedId).pPrice
      let singleOrder = {
        "oPayStatus": this.pStatus,
        "oPid": {
          [a.selectedId]: a.selectedQuantity
        },
        "oPrice": Number(a.selectedQuantity * price),
        "oQRcode": this.uuidValue,
        "oSid": a.sId,
        "oStatus": "Placed",
        "oTid": "",
        "oTimeCompeletion": this.cDate,
        "oTimeOrder": firebase.firestore.Timestamp.fromDate(new Date(new Date())),
        "oType": "OF",
        "oUid": String(sessionStorage.getItem('uEmail'))
      };

      this.ordersPlaced.push(singleOrder);
    }

    console.log(this.ordersPlaced);

    let c: any = 100
    this.db.collection('orders').orderBy("oTimeOrder", "desc")
      .limit(1)
      .get()
      .then(querySnapshot => {
        if (!querySnapshot.empty) {
          querySnapshot.forEach(doc => {
            c = doc.id
          })
        }
      }).finally(() => { this.save(++c); console.log(c) })

  }
  save(c: any) {
    const decreasedValue = firebase.firestore.FieldValue.increment(-1);
    //For the above example
    let uId=sessionStorage.getItem("uId")
    for (let ord of this.ordersPlaced) {
      let val: any;
      for (let key in ord.oPid) {
        val = key
      }
      this.db.collection("shop").doc(`${ord.oSid}`).update({
        [`sInStock.${val}`]: decreasedValue
      })


      this.store.collection("shop").doc(`${ord.oSid}`).valueChanges({ idField: 'sId' }).subscribe(res => {
        let data: any = res;
        if (data.sInStock[`${val}`] == 0) {
          this.db.collection('prod-shop').where(`pId`, "==", `${val}`).get()
            .then((querySnapshot) => {
              querySnapshot.forEach((doc) => {
                let psId = doc.id;
                let data1 = doc.data();
                data1["sId"].forEach((element: any, index: any) => {
                  if (element == data.sId) {
                    this.db.collection("prod-shop").doc(`${psId}`).update({
                      'sId': firebase.firestore.FieldValue.arrayRemove(data.sId)
                    })
                  }
                })
              })
            })
        }
      })

      this.db.collection("product").doc(`${val}`).update({
        [`pInStock`]: decreasedValue
      })

      this.db.collection("orders").doc(`${c}`).set(ord);
      this.db.collection("users").doc(`${uId}`).update({
        'uOrders': firebase.firestore.FieldValue.arrayUnion(`${c}`)
      })
      c++;
    }

    console.log("deleted usercart")
    
    this.db.collection('users').doc(`${uId}`).update({
      uCart: []
    });

    sessionStorage.setItem('uCart', JSON.stringify([]))

    this.router.navigate(['/placed'])
  }

  markerClick(info: any, store: any) {
    console.log(store)

   }

  clearcart() {
    let uId=sessionStorage.getItem("uId")
    this.db.collection('users').doc(`${uId}`).update({
      uCart: []
    });

    sessionStorage.setItem('uCart', JSON.stringify([]))
    this.router.navigate(['/login'])
  }

  addStore(store: any) {
    store["selectedId"] = this.selectedProd
    store["selectedQuantity"] = this.cart.find((res: any) =>
      res.p_Id == this.selectedProd).pQuantity

    this.storesSelected.push(store);
    console.log(this.storesSelected);
    this.successMsg = `Store Selected for ${this.selectedProd}`
  }

  paymnt(status:any){
    this.pStatus=status;
  }
}
