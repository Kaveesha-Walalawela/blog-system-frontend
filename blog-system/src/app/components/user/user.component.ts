import { Component, OnInit } from '@angular/core';
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
  acceptedPosts: any[] = []; // Variable to store accepted posts
  rejectedPosts: any[] = []; // Variable to store rejected posts
  pendingPosts: any[] = []; // Variable to store pending posts
  draftPosts: any[] = []; // Variable to store draft posts
  selectedTab: string = 'tab1';
  constructor(
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
        this.filterPosts(); // Call the method to filter posts based on status
      },
      (error) => {
        console.warn('Some error occurred while fetching user posts!');
      }
    );
  }
  

  filterPosts() {
    this.acceptedPosts = this.userPosts.filter(post => post.status === 'ACCEPTED');
    this.rejectedPosts = this.userPosts.filter(post => post.status === 'REJECTED');
    this.pendingPosts = this.userPosts.filter(post => post.status === 'PENDING');
    this.draftPosts = this.userPosts.filter(post => post.status === 'DRAFT');
  }

  deletePost(post: any) {
    this.postService.deletePost(post.id).subscribe(
      () => {
        this.userPosts = this.userPosts.filter((p: any) => p.id !== post.id);
        this.filterPosts(); // Update filtered posts after deleting a post
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
        this.filterPosts(); // Update filtered posts after submitting a draft
      },
      (error) => {
        console.warn('Some error occurred while submitting the draft!');
      }
    );
  }
}
