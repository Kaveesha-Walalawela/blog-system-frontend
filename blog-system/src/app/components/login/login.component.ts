import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

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
    password: '',
    confirmPassword:''
  };
  loginObj: any = {
    userName: '',
    password: ''
  };

  constructor(private router: Router) { }

  ngOnInit(): void {
    const localData = localStorage.getItem('signUpUsers');
    if(localData != null) {
      this.signupUsers = JSON.parse(localData);
    }
  }

  onSignUp(){
    if (this.signupObj.password !== this.signupObj.confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    this.signupUsers.push(this.signupObj);
    localStorage.setItem('signUpUsers',JSON.stringify(this.signupUsers));
    this.signupObj = {
      userName: '',
      email: '',
      password: '',
      confirmPassword:''
    };
    debugger
    const isUserExist = this.signupUsers.find(m => m.userName == this.loginObj.userName && m.password == this.loginObj.password);
    if(isUserExist != undefined) {
      alert('Account Created Successfully. Please login !');
    } 
  }

  onLogin() {
    debugger
    const isUserExist = this.signupUsers.find(m => m.userName == this.loginObj.userName && m.password == this.loginObj.password);
    if(isUserExist != undefined) {
      this.router.navigate(['/home']);
    } else {
      alert('Wrong Credentials');
    }
  }
}
