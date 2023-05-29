import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/service/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users: any[] = [];
  warningCount: number = 0;

  constructor(
    private router: Router,
    private usersService: UsersService
    ) {}

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.usersService.getAllUsers().subscribe(
      (data) => {
        this.users = data;
      },
      (error) => {
        console.warn('Some error occurred while fetching users!');
      }
    );
  }

  redirectToEditPage(userId: string) {
    this.router.navigate(['/admin-edit-users', userId]);
  }

  updateUser(user: any) {
    const updatedUser = {
      username: user.username,
      email: user.email,
      roles: user.roles,
      phoneNo: user.phoneNo
    };

    this.usersService.updateUser(user.id, updatedUser).subscribe(
      (data) => {
        // Handle successful update response
        console.log('User updated successfully:', data);
      },
      (error) => {
        // Handle error response
        console.error('Error updating user:', error);
      }
    );
  }

  deleteUser(user: any) {
    this.usersService.deleteUser(user.id).subscribe(
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

  warningUser(userId: string) {
    this.usersService.warningUser(userId).subscribe(
      (data) => {
        // Handle successful warning response
        console.log('User warned successfully:', data);
        // Update the users list with the updated user
        const updatedUser = this.users.find(u => u.id === userId);
        if (updatedUser) {
          updatedUser.warningCount = data.warningCount; // Update the warning count
        }
      },
      (error) => {
        // Handle error response
        console.error('Error warning user:', error);
      }
    );
  }
  
}  
