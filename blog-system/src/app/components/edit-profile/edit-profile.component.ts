import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  editProfileForm!: FormGroup;

  constructor(private userService: UserService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.editProfileForm = new FormGroup({
      username: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      phoneNo: new FormControl('', Validators.required)
    });

    const userId = this.route.snapshot.paramMap.get('userId'); // Get the userId from the route parameters

    // Retrieve existing user details and populate the form
    const user = this.userService.getLoggedInUser();
    if (user) {
      this.editProfileForm.patchValue({
        username: user.username,
        email: user.email,
        phoneNo: user.phoneNo
      });
    }
  }

  onSubmit() {
    if (this.editProfileForm.invalid) {
      return;
    }

    const updatedProfile = this.editProfileForm.value;
    // Call the user service to update the profile
    this.userService.updateProfile(updatedProfile).subscribe(
      (data) => {
        alert('Profile updated successfully!');
        // Optionally, you can update the logged in user in the UserService
        this.userService.setLoggedInUser(data);
      },
      (error) => {
        console.log('Error occurred while updating profile!');
      }
    );
  }
}
