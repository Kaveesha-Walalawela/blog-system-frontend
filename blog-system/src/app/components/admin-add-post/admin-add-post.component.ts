import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PostService } from 'src/app/service/post.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-admin-add-post',
  templateUrl: './admin-add-post.component.html',
  styleUrls: ['./admin-add-post.component.css']
})
export class AdminAddPostComponent implements OnInit {
  addPost!: FormGroup;
  userService: UserService;

  constructor(
    private formBuilder: FormBuilder,
    private postService: PostService,
    userService: UserService
  ) {
    this.userService = userService;
  }

  ngOnInit(): void {
    this.addPost = this.formBuilder.group({
      title: ['', Validators.required],
      content: ['', Validators.required],
      username: [{ value: '', disabled: true }, Validators.required],
    });

    // Set the logged-in user's username as the default value for the username field
    const loggedInUser = this.userService.getLoggedInUser();
    if (loggedInUser) {
      this.addPost.patchValue({ username: loggedInUser.username });
    }
  }

  onSubmit() {
    if (this.addPost.invalid) {
      return;
    }

    const postData = {
      title: this.addPost.value.title,
      content: this.addPost.value.content,
      username: this.addPost.value.username,
    };

    this.postService.createPost(postData).subscribe(
      (data) => {
        alert('Blog Post Successful!');
        this.addPost.reset();
      },
      (error) => {
        console.log('Error Occurred!');
      }
    );
  }

  saveAsDraft() {
    if (this.addPost.invalid) {
      return;
    }

    const draftData = {
      title: this.addPost.value.title,
      content: this.addPost.value.content,
      username: this.addPost.value.username,
      status: 'draft' // Set the status as "draft"
    };

    this.postService.createPost(draftData).subscribe(
      (data) => {
        alert('Blog Draft Saved!');
        this.addPost.reset();
      },
      (error) => {
        console.log('Error Occurred!');
      }
    );
  }
}