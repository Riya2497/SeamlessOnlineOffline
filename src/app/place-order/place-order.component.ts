import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import firebase from 'firebase/app';
import 'firebase/firestore';
@Component({
  selector: 'app-place-order',
  templateUrl: './place-order.component.html',
  styleUrls: ['./place-order.component.css']
})
export class PlaceOrderComponent implements OnInit {
  orderLists:any[]=[];
  db = firebase.firestore();
  user:any;
  // dataToString = JSON.stringify(this.data);
  constructor(private services:AngularFirestore) { }

  ngOnInit(): void {
    let uId=sessionStorage.getItem("uId")
    this.db.collection('users').doc(`${uId}`).get()
    .then((querySnapshot) => {
          let data:any=querySnapshot.data();
          data["uId"]=querySnapshot.id
          this.user=data;
    })
    .finally(()=>this.orderList())
    
  }

  orderList(){
    console.log( this.user)
    const increase = firebase.firestore.FieldValue.increment(1);
    let val=this.user.uOrders
  
    for(let a of val){
      this.db.collection('orders').doc(`${a}`).get().then(res=>{
        var data:any=res.data();
        data['oId']=res.id;
        var pId=data['oPid']
        if(data['oTimeCompeletion'] < firebase.firestore.Timestamp.fromDate(new Date(new Date())) 
        && data['oStatus']=="Placed"){
          data['oStatus']="Cancelled"
          data['oQRcode']=""
          this.db.collection("orders").doc(`${a}`).update({
            'oStatus': 'Cancelled',
            'oQRcode':""
          })

          this.db.collection("shop").doc(`${data.oSid}`).update({
            [`sInStock.${Object.keys(pId)}`]: increase,
          })
          
        }
        this.db.collection('shop').doc(`${data.oSid}`).get().then(res=>{
          let val:any=res.data()
         
          data['sAddress']=val.sAddress;
          this.orderLists.push(data);
          this.orderLists.sort((a:any,b:any) => b.oId - a.oId)
        })
      })
    }
    
  }

}
