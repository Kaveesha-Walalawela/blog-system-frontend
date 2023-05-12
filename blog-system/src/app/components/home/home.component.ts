import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/service/post.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  posts!:any;

  constructor(private postService:PostService, private router: Router){}

  ngOnInit(): void {
    this.postService.getAllPosts().subscribe((data)=>{
      this.posts = data;

    }, (error)=>{
      console.warn('Some error occured!')
    })
    
  }

  editPost(post: any) {
    this.router.navigate(['/editpost', post.id]);
}


  deletePost(post: any) {
    this.postService.deletePost(post.id).subscribe(() => {
      // Remove the post from the list of posts
      this.posts = this.posts.filter((p: any) => p.id !== post.id);
    }, (error)=>{
      console.warn('Some error occured while deleting the post!')
    })
  }

  savePost(post: any) {
    // Add the post to the list of saved posts
    this.postService.addSavedPost(post);
    // Navigate to the saved-posts page
    this.router.navigate(['/saved-posts']);
  }

}
