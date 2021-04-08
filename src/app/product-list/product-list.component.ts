import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  constructor(private prodService:AngularFirestore, private route:Router) { }
  data!:any;
  ngOnInit(): void {
    this.prodService.collection('product').valueChanges({ idField: '_id' }).subscribe(res=>{
          this.data=res;
          console.log(res);
      });
  }

  nav(id:any){
    console.log(id)
    this.route.navigate(['/productDetail',id])
    }
}
