import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { QuerySnapshot } from '@google-cloud/firestore';
import firebase from 'firebase/app';
import 'firebase/firestore';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user!:string
  pass!:string
  constructor(private registerService:AngularFirestore,private router: Router) { }
  data:any;
  db = firebase.firestore();
  errorMsg:any
  ngOnInit(): void {
  }
  login() {
    let user={
      'uEmail':"",
      'uPass': ""
    };
    user['uPass']=this.pass;
    user['uEmail']=this.user;

    this.db.collection('users').where(`uEmail`, '==', this.user).get().then(querySnapshot=>{
      querySnapshot.forEach(res=>{
        let data:any=res.data()
        data['uId']=res.id;
        if(data['uCustomer']==true && data['uPass']==this.pass){
          sessionStorage.setItem("uId",data['uId'])
          sessionStorage.setItem("uEmail", data['uEmail']);
          sessionStorage.setItem("uCustomer", data['uCustomer']);
          sessionStorage.setItem("uCart", JSON.stringify(data['uCart']));
          this.router.navigate(['/product-list']);
        }
        else if(data['uCustomer']==false && data['uPass']==this.pass){
          sessionStorage.setItem("uId",data['uId'])
          sessionStorage.setItem("uEmail", data['uEmail']);
          sessionStorage.setItem("uCustomer", data['uCustomer']);
          this.router.navigate(['/store']);
        }
        else{
          this.errorMsg="Incorrect Credentials"
        }
      })
      
    })
  }
}
