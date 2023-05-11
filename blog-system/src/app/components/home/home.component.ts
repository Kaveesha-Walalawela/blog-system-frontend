import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/service/post.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  posts!:any;

  constructor(private postService:PostService){}

  ngOnInit(): void {
    this.postService.getAllPosts().subscribe((data)=>{
      this.posts = data;

    }, (error)=>{
      console.warn('Some error occured!')
    })
    
  }

  editPost(post: any) {
    // Open a modal or dialog box to allow the user to edit the content of the post
  }

  deletePost(post: any) {
    this.postService.deletePost(post.id).subscribe(() => {
      // Remove the post from the list of posts
      this.posts = this.posts.filter((p: any) => p.id !== post.id);
    }, (error)=>{
      console.warn('Some error occured while deleting the post!')
    })
  }

}
