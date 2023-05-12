import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/service/post.service';

@Component({
  selector: 'app-saved-posts',
  templateUrl: './saved-posts.component.html',
  styleUrls: ['./saved-posts.component.css']
})
export class SavedPostsComponent implements OnInit {
  savedPosts: any[] = [];

  constructor(private postService: PostService) {}

  ngOnInit(): void {
    // Get the list of saved posts from the PostService
    this.savedPosts = this.postService.getSavedPosts();
  }

  removeSavedPost(post: any) {
    // Remove the post from the list of saved posts in the PostService
    this.postService.removeSavedPost(post);
    // Update the list of saved posts in the component
    this.savedPosts = this.postService.getSavedPosts();
  }
}
