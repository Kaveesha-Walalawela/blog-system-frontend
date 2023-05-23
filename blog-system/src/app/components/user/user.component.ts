import { Component, Inject, OnInit } from '@angular/core';
import { UserService } from 'src/app/service/user.service';
import { PostService } from 'src/app/service/post.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  loggedInUser: any;
  acceptedPosts: any[] = [];
  rejectedPosts: any[] = [];
  pendingPosts: any[] = [];
  draftPosts: any[] = [];
  selectedTab: string = 'accepted';

  // private baseUrl = 'http://localhost:8080/api/posts';

  constructor(
    private userService: UserService,
    private postService: PostService,
    private router: Router,
    private http: HttpClient,
    // @Inject(MatSnackBar) private snackBar: MatSnackBar

  ) {}

  ngOnInit() {
    this.loggedInUser = this.userService.getLoggedInUser();
    this.loadUserPosts();
  }

  loadUserPosts() {
    const username = this.loggedInUser?.username;
    if (username) {
      this.postService.getUserPostsByUsername(username).subscribe(
        (data) => {
          this.acceptedPosts = data.filter((post: any) => post.status === 'ACCEPTED');
          this.rejectedPosts = data.filter((post: any) => post.status === 'REJECTED');
          this.pendingPosts = data.filter((post: any) => post.status === 'PENDING');
          this.draftPosts = data.filter((post: any) => post.status === 'DRAFT');
          console.log(this.draftPosts)
        },
        (error) => {
          console.warn('Some error occurred while fetching user posts!');
        }
      );
    }
  }

  // deletePost(post: any) {
  //   this.postService.deletePost(post.id).subscribe(
  //     () => {
  //       switch (post.status) {
  //         case 'ACCEPTED':
  //           this.acceptedPosts = this.acceptedPosts.filter((p: any) => p.id !== post.id);
  //           break;
  //         case 'REJECTED':
  //           this.rejectedPosts = this.rejectedPosts.filter((p: any) => p.id !== post.id);
  //           break;
  //         case 'PENDING':
  //           this.pendingPosts = this.pendingPosts.filter((p: any) => p.id !== post.id);
  //           break;
  //         case 'DRAFT':
  //           this.draftPosts = this.draftPosts.filter((p: any) => p.id !== post.id);
  //           break;
  //       }
  //     },
  //     (error) => {
  //       console.warn('Some error occurred while deleting the post!');
  //     }
  //   );
  // }

  
  

  changeTab(tab: string) {
    this.selectedTab = tab;
  }

  editPost(post: any): void {
    this.router.navigate(['/editpost', post.id]);
  }
  
  
  deletePost(post: any) {
    this.postService.deletePost(post.id).subscribe(
      () => {
        switch (post.status) {
          case 'ACCEPTED':
            this.acceptedPosts = this.acceptedPosts.filter((p: any) => p.id !== post.id);
            break;
          case 'REJECTED':
            this.rejectedPosts = this.rejectedPosts.filter((p: any) => p.id !== post.id);
            break;
          case 'PENDING':
            this.pendingPosts = this.pendingPosts.filter((p: any) => p.id !== post.id);
            break;
          case 'DRAFT':
            this.draftPosts = this.draftPosts.filter((p: any) => p.id !== post.id);
            break;
        }
      },
      (error) => {
        console.warn('Some error occurred while deleting the post!');
      }
    );
  }

  sharePost(post: any) {
    console.log('Sharing post:', post);
    this.postService.sharePostById(post.id).subscribe(
      (response) => {
        console.log('Post shared successfully!');
        alert('Shared successfully');
        // Refresh the page
      location.reload();
      },
      (error) => {
        console.warn('Some error occurred while sharing the post!');
      }
    );
  }
  
}