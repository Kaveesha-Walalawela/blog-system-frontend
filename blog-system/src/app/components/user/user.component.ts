import { Component, Inject, OnInit } from '@angular/core';
import { UserService } from 'src/app/service/user.service';
import { PostService } from 'src/app/service/post.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  loggedInUser: any; // Variable to store the logged-in user
  userPosts: any[] = []; // Variable to store user's posts
  term: string = '';

  constructor(
    // @Inject(UserService) private userService: UserService,
    private postService: PostService,
    private router: Router,
    private userService: UserService,
  ) {}

  ngOnInit() {
    this.loggedInUser = this.userService.getLoggedInUser(); // Get the logged-in user
    this.loadUserPosts();
  }

  loadUserPosts() {
    this.postService.getUserPostsByUsername(this.loggedInUser.username).subscribe(
      (data) => {
        this.userPosts = data;
      },
      (error) => {
        console.warn('Some error occurred while fetching user posts!');
      }
    );
  }

  deletePost(post: any) {
    this.postService.deletePost(post.id).subscribe(
      () => {
        this.userPosts = this.userPosts.filter((p: any) => p.id !== post.id);
      },
      (error) => {
        console.warn('Some error occurred while deleting the post!');
      }
    );
  }

  savePost(post: any) {
    this.postService.addSavedPost(post);
    this.router.navigate(['/saved-posts']);
  }

  submitDraft(post: any) {
    // Update the post status to 'PENDING' and send it for submission
    post.status = 'PENDING';
    this.postService.updatePost(post.id, post).subscribe(
      () => {
        alert('Draft submitted!');
        this.userPosts.find(p => p.id === post.id).status = 'PENDING'; // Update the status in the userPosts array
      },
      (error) => {
        console.warn('Some error occurred while submitting the draft!');
      }
    );
  }
}
