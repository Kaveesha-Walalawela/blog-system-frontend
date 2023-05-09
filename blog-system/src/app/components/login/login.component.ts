import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  login!:FormGroup;
  signupUsers: any[] = [];
  signupObj:any = {
    userName: '',
    email: '',
    password: ''
  };
  LoginObj: any ={
    userName: '',
    password: ''
  };
  constructor(){}

  ngOnInit(): void{
  }
  onSignUp(){
    this.signupUsers.push(this.signupObj);
    localStorage.setItem('signUpUsers',JSON.stringify(this.signupUsers));
    this.signupObj = {
      userName: '',
      email: '',
      password: ''
  };
  }
  onLogin(){
  }
  // LoginForm(login:any){
  //   alert("Welcome to Blog")

  // }

}
