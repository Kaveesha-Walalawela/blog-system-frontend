import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  loggedInUser: any; // Variable to store the logged-in user

  constructor(private userService: UserService) { } // Inject the UserService

  ngOnInit() {
    this.loggedInUser = this.userService.getLoggedInUser(); // Get the logged-in user
  }

}
