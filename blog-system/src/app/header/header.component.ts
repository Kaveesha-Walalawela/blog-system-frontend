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

  constructor(private router: Router, private userService: UserService) {
    this.isLoggedIn = userService.isLoggedIn();
  }
  logout(): void {
    // Clear the local storage login data
    this.userService.logout();
    localStorage.removeItem('loggedInUser');

    // Redirect to the login page
    this.router.navigate(['/login']);
  }
}


//2nd round