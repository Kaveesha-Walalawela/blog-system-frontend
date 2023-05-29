import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/service/users.service';

@Component({
  selector: 'app-admin-warnings',
  templateUrl: './admin-warnings.component.html',
  styleUrls: ['./admin-warnings.component.css']
})
export class AdminWarningsComponent implements OnInit {

  users: any[] = [];
  warnings: number[] = [];

  constructor(private usersService: UsersService) {}

  ngOnInit() {
    this.loadWarnings();
  }

loadWarnings() {
  this.usersService.getWarnings().subscribe(
    (data) => {
      this.users = data;
    },
    (error) => {
      console.warn('Some error occurred while fetching warnings!');
    }
  );
}


}