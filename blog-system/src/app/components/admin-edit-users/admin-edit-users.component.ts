import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from 'src/app/service/users.service';

@Component({
  selector: 'app-admin-edit-users',
  templateUrl: './admin-edit-users.component.html',
  styleUrls: ['./admin-edit-users.component.css']
})
export class AdminEditUsersComponent implements OnInit{

  userId: string ='';
  user: any = {};

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private usersService: UsersService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.userId = params['id'];
      this.loadUser();
    });
  }

  loadUser() {
    this.usersService.getUserById(this.userId).subscribe(
      (data) => {
        this.user = data;
      },
      (error) => {
        console.error('Error fetching user:', error);
      }
    );
  }

  updateUser() {
    this.usersService.updateUser(this.userId, this.user).subscribe(
      (data) => {
        console.log('User updated successfully:', data);
        this.router.navigate(['/users']);
      },
      (error) => {
        console.error('Error updating user:', error);
      }
    );
  }

}
