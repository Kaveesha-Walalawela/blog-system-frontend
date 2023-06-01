import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  isLoggedIn: boolean;
  loggedInUser: any;

  constructor(private router: Router, private userService: UserService) {
    this.isLoggedIn = userService.isLoggedIn();
    this.loggedInUser = userService.getLoggedInUser();
  }
  logout(): void {
    // Clear the local storage login data
    this.userService.logout();
    localStorage.removeItem('loggedInUser');

    // Redirect to the login page
    this.router.navigate(['/login']);
  }

  navigateToAddPost(): void {
    if (!this.isLoggedIn) {
      alert("Oops! To fully enjoy our captivating blog, please sign up or log in.");
      // Optionally, you can also navigate to the login page
      this.router.navigate(['/login']);
    } else {
      // Navigate to the Add Post page
      this.router.navigate(['/addpost']);
    }
  }
  

}


//2nd round