import { Component, OnInit } from '@angular/core';
import firebase from 'firebase/app';
import 'firebase/firestore';
@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css']
})
export class StoreComponent implements OnInit {
  db = firebase.firestore();
  orderList:any[]=[];
  eCode:any=""
  completed:any=false
  cid:any;
  constructor() { 

  }

  ngOnInit(): void {
    this.db.collection('orders').where('oSid','==','s-3').get().then(querySnapshot=>{
      querySnapshot.forEach((doc) => {
        let data = doc.data();
        data["oId"] = doc.id
        data["eCode"]="";
        this.orderList.push(data);
        console.log(this.orderList);
      })
    })
  }

  validateCode ( code:any ){
    console.log(code.oQRcode,"->",code.eCode);
    if(code.oQRcode==code.eCode){
      this.db.collection('orders').doc(`${code.oId}`).update({
        'oQRcode':"1",
        'oStatus':"Completed"
      })
      this.completed=true;
      this.cid=code.oId
    }
  }
}
