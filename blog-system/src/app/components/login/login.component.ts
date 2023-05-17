import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  login!: FormGroup;
  signupUsers: any[] = [];
  signupObj: any = {
    userName: '',
    email: '',
    password: '',
    confirmPassword: ''
  };
  loginObj: any = {
    userName: '',
    password: ''
  };

  constructor(private router: Router, private userService: UserService) { }

  ngOnInit(): void {
    const localData = localStorage.getItem('signUpUsers');
    if (localData != null) {
      this.signupUsers = JSON.parse(localData);
    }
  }

  onSignUp() {
    if (this.signupObj.password !== this.signupObj.confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    // Create a signupData object with the necessary properties
    const signupData = {
      username: this.signupObj.userName,
      email: this.signupObj.email,
      password: this.signupObj.password,
      // roles: [] // Set the roles if required
    };
  
    // Call the signup method from the UserService
    this.userService.signup(signupData).subscribe(
      response => {
        // Handle the successful response here
        alert('Account Created Successfully. Please login!');
      },
      error => {
        // Handle the error response here
        alert('Error occurred during signup');
      }
    );
  }
  

  onLogin() {
    // Create a loginData object with the necessary properties
    const loginData = {
      username: this.loginObj.userName,
      password: this.loginObj.password,
    };
    // Call the login method from the UserService
    this.userService.login(loginData).subscribe(
      response => {
        // Handle the successful response here
        this.userService.setLoggedInUser(response); // Set the logged-in user
        this.router.navigate(['/user']);
      },
      error => {
        // Handle the error response here
        alert('Wrong Credentials');
      }
    );
  }
  
}
