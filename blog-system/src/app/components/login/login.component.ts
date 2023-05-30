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
  roles: string[] = [];
  signupObj: any = {
    userName: '',
    email: '',
    phoneNo: '',
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
      phoneNo: this.signupObj.phoneNo
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
    const loginData = {
      username: this.loginObj.userName,
      password: this.loginObj.password,
    };
    //var rolesString = localStorage.getItem('roles');
    
    // Call the login method from the UserService
    this.userService.login(loginData).subscribe(
      response => {
        // Handle the successful response here
        this.userService.setLoggedInUser(response); // Set the logged-in user
        localStorage.setItem('loggedInUser', JSON.stringify(response)); // Store the logged-in user in local storage
        // this.router.navigate(['/user']);

        // Get the roles from the logged-in user
        const roles = response.roles;
  
        // Check if roles is not null and has the expected structure
        if (roles && Array.isArray(roles)) {
          // Redirect based on the role
          if (roles.includes('ROLE_ADMIN')) {
            this.router.navigate(['/admin']);
          } else if (roles.includes('ROLE_USER')) {
            this.router.navigate(['/user']);
          } else {
            // Handle other roles or scenarios here
            alert('Unknown role');
          }
        } else {
          // Handle the case when roles is null or not available
          alert('Invalid roles data in the response');
        }
      },
      error => {
        // Handle the error response here
        if (error.status === 401) {
          alert('Wrong Credentials');
        } else {
          alert('An error occurred during login');
        }
      }
    );
  }
  
}
