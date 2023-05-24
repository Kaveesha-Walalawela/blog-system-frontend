import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PostService } from 'src/app/service/post.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {

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
    // Check if the user is already logged in
    const loggedInUser = this.userService.getLoggedInUser();
    if (loggedInUser) {
      this.loggedInUser = loggedInUser;
      this.loadUserPosts();
    } else {
      this.router.navigate(['/login']); // Redirect to the login page if the user is not logged in
    }
  }

  redirectToEditProfile() {
    this.router.navigate(['/edit-profile']);
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

  getInitials(name: string): string {
    if (name) {
      const names = name.split(' ');
      if (names.length > 1) {
        return names[0][0].toUpperCase() + names[names.length - 1][0].toUpperCase();
      } else {
        return names[0][0].toUpperCase();
      }
    }
    return '';
  }

  getAvatarColorClass(username: string | undefined): string {
    if (username) {
      const firstLetter = username.charAt(0).toUpperCase();
      const colorClasses: { [key: string]: string } = {
        A: 'avatar-color-a',
        B: 'avatar-color-b',
        C: 'avatar-color-c',
        D: 'avatar-color-d',
        E: 'avatar-color-e',
        F: 'avatar-color-f',
        G: 'avatar-color-g',
        H: 'avatar-color-h',
        I: 'avatar-color-i',
        J: 'avatar-color-j',
        K: 'avatar-color-k',
        L: 'avatar-color-l',
        M: 'avatar-color-m',
        N: 'avatar-color-n',
        O: 'avatar-color-o',
        P: 'avatar-color-p',
        Q: 'avatar-color-q',
        R: 'avatar-color-r',
        S: 'avatar-color-s',
        T: 'avatar-color-t',
        U: 'avatar-color-u',
        V: 'avatar-color-v',
        W: 'avatar-color-w',
        X: 'avatar-color-x',
        Y: 'avatar-color-y',
        Z: 'avatar-color-z'
      };
      // Return the corresponding CSS class based on the first letter
      return colorClasses[firstLetter] || 'avatar-color-default';
    }
  
    return 'avatar-color-default';
  }
  

}


