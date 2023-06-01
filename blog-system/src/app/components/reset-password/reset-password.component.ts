import { Component } from '@angular/core';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent {
  username: string;

  constructor(private userService: UserService) {
    this.username = '';
  }

  resetPassword() {
    this.userService.resetPassword(this.username).subscribe(
      response => {
        alert('An email with a new password has been sent to your registered email address.');
        // Redirect to the login page or any other desired page
      },
      error => {
        alert('Failed to reset password. Please try again.');
      }
    );
  }
}
