import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PostService } from 'src/app/service/post.service';
import { UserService } from 'src/app/service/user.service'; // Update the path to match your actual UserService location

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css']
})
export class AddPostComponent implements OnInit {
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
      author: ['', Validators.required],
      content: ['', Validators.required],
      username: [{ value: '', disabled: true }, Validators.required],
      // status: ['', Validators.required]
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
      author: this.addPost.value.author,
      content: this.addPost.value.content,
      username: this.addPost.value.username,
      // status: this.addPost.value.status
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
    author: this.addPost.value.author,
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
