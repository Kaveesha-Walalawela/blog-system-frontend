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

}
