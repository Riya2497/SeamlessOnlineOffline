import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import firebase from 'firebase/app';
import 'firebase/firestore';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  obj={
    oPid!:Map,
    oSid!:String,
    oUid!:String,
    oPayStatus!:Boolean,
    oPrice!:Number,
    oQRcode!:String,
    oType!:String,
    oStatus!:String,
    oTid!:String,
  }

  id!: string;
  pQuantity!:number;
  s_id!:string;
  u_id!:string;
  data:any;
  delete!:boolean;
  pSize:string = "M" 
  pData:any[]=[]
  constructor(private prodService:AngularFirestore,private router:Router) { }
  db = firebase.firestore();
  ngOnInit(): void {
    let cart = sessionStorage.getItem('uCart');
    console.log("cart:",cart)
    for(const a of JSON.parse(cart || '{}')){
      this.prodService.collection('product').doc(a.p_Id).valueChanges({idField:'p_id'}).subscribe(res=>{
        let data:any=res;
        data["pQuantity"]=a.pQuantity;
        this.pData.push(data);
      })
    }
    }
  
  goToStore(){
      console.log("go to store call map");
      this.router.navigate(['/map-locator'])
  }

  goOnline(){}

  
}

