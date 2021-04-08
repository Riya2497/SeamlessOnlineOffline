import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { Cart } from '../classes';
import firebase from 'firebase/app';
import 'firebase/firestore';
@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  pid!:string
  data:any
  product:any
  cart!:any[]
  cartObj!:Cart
  pQuant!:number;
  successMsg!:string
  constructor(private prodService:AngularFirestore,
  private route:ActivatedRoute,private router:Router) { }
  db = firebase.firestore();
  ngOnInit(): void {
    this.route.params.subscribe(param=>this.pid=param['Id'])
        console.log(this.pid)
        this.prodService.collection('product').doc(this.pid).valueChanges({ idField: '_id' }).subscribe(res=>{
          this.data=res;
          console.log(this.data);
        })
  }

  addCart(data:any){
    this.cart=[]
    let same:any;
    let email=sessionStorage.getItem("uEmail");
    this.cart=JSON.parse(sessionStorage.getItem("uCart") || '{}')
    console.log(this.pQuant);
    this.cart.forEach((res:any)=>{
      if(res.p_Id==data._id){
        res.pQuantity=Number(res.pQuantity)+Number(this.pQuant);
        same=true;
      }
    })

    if(!same){
      this.cartObj={"p_Id":String(data._id),"pQuantity":Number(this.pQuant),"pPrice":Number(data.pPrice)};
      this.cart.push(this.cartObj)
    }
    let uId=sessionStorage.getItem("uId")
    this.prodService.collection('users').doc(`${uId}`).update({ 
      [`uCart`]: this.cart 
    });
    this.successMsg="Added Successfuly in Cart"
    sessionStorage.setItem("uCart",JSON.stringify(this.cart));
  }

  goBack(){
    this.router.navigate(['/product-list'])
  }
}

