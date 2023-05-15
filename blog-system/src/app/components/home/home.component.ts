import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/service/post.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  posts: any;
  term: string = '';
  filteredPosts: any;

  constructor(private postService: PostService, private router: Router) {}

  ngOnInit(): void {
    this.postService.getAllPosts().subscribe(
      (data) => {
        this.posts = data;
        this.filteredPosts = data;
      },
      (error) => {
        console.warn('Some error occurred!');
      }
    );
  }

  editPost(post: any) {
    this.router.navigate(['/editpost', post.id]);
  }

  deletePost(post: any) {
    this.postService.deletePost(post.id).subscribe(
      () => {
        this.posts = this.posts.filter((p: any) => p.id !== post.id);
        this.filteredPosts = this.filteredPosts.filter((p: any) => p.id !== post.id);
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

  filterPosts() {
    this.filteredPosts = this.posts.filter((post: any) =>
      post.title.toLowerCase().includes(this.term.toLowerCase())
    );
  }
}
