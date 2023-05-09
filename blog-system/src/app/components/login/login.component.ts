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
  loginObj: any = {
    userName: '',
    password: ''
  };
  constructor() { }

  ngOnInit(): void {
    const localData = localStorage.getItem('signUpUsers');
    if(localData != null) {
      this.signupUsers = JSON.parse(localData);
    }
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
  onLogin() {
    debugger
    const isUserExist = this.signupUsers.find(m => m.userName == this.loginObj.userName && m.password == this.loginObj.password);
    if(isUserExist != undefined) {
      alert('User Logged in Successfully');
    } else {
      alert('Wrong Credentials');
    }
  }
  // LoginForm(login:any){
  //   alert("Welcome to Blog")

  // }

}
