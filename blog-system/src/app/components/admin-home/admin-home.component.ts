import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/service/admin.service';
import { PostService } from 'src/app/service/post.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent implements OnInit {

  posts: any;
  term: string = '';
  filteredPosts: any;
  loggedInUser: any;

  constructor(
    private postService: PostService,
    private userService: UserService,
    private router: Router,
    private adminService: AdminService
  ) {}

  ngOnInit(): void {
    this.postService.getAllPosts().subscribe(
      (data) => {
        this.posts = data.filter(
          (post: any) =>
            post.status !== 'DRAFT' &&
            post.status !== 'PENDING' &&
            post.status !== 'REJECTED'
        ); // Filter out draft posts
        this.filteredPosts = this.posts;
      },
      (error) => {
        console.warn('Some error occurred!');
      }
    );

    this.loggedInUser = this.userService.getLoggedInUser();
  }

  deletePost(post: any) {
    this.postService.deletePost(post.id).subscribe(
      () => {
        this.posts = this.posts.filter((p: any) => p.id !== post.id);
        this.filteredPosts = this.filteredPosts.filter(
          (p: any) => p.id !== post.id
        );
      },
      (error) => {
        console.warn('Some error occurred while deleting the post!');
      }
    );
  }

  isPostSaved: boolean = false;

  savePost(post: any) {
    this.adminService.addSavedPost(post);
    this.isPostSaved = true;
    this.showPostSavedMessage();
  }

  showPostSavedMessage() {
    setTimeout(() => {
      this.isPostSaved = false;
    }, 3000); // Remove the message after 3 seconds
  }

  isUserPost(post: any): boolean {
    return post.username === this.loggedInUser?.username;
  }

  filterPosts() {
    this.filteredPosts = this.posts.filter((post: any) =>
      post.title.toLowerCase().includes(this.term.toLowerCase())
    );
  }
}
