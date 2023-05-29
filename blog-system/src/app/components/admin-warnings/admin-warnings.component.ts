import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/service/users.service';

@Component({
  selector: 'app-admin-warnings',
  templateUrl: './admin-warnings.component.html',
  styleUrls: ['./admin-warnings.component.css']
})
export class AdminWarningsComponent implements OnInit {

  users: any[] = [];
  usersLessThan5: any[] = [];
  usersMoreThan5: any[] = [];

  constructor(private usersService: UsersService) {}

  ngOnInit() {
    this.loadWarnings();
  }

  loadWarnings() {
    this.usersService.getWarnings().subscribe(
      (data: any[]) => {
        this.users = data;
        this.usersLessThan5 = data.filter(user => user.warnings < 5);
        this.usersMoreThan5 = data.filter(user => user.warnings >= 5);
      },
      (error) => {
        console.warn('Some error occurred while fetching warnings!');
      }
    );
  }

  deleteUser(user: any) {
    this.usersService.deleteUserByUsername(user.username).subscribe(
      (data) => {
        // Handle successful delete response
        console.log('User deleted successfully');
        // Remove the deleted user from the users list
        this.users = this.users.filter(u => u.id !== user.id);
      },
      (error) => {
        // Handle error response
        console.error('Error deleting user:', error);
      }
    );
  }
  

}
