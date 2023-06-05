import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostService } from 'src/app/service/post.service';

@Component({
  selector: 'app-admin-details-posts',
  templateUrl: './admin-details-posts.component.html',
  styleUrls: ['./admin-details-posts.component.css']
})
export class AdminDetailsPostsComponent implements OnInit {

  public id!:any;
  public post:any;


  constructor(private actRouted:ActivatedRoute, private postService:PostService){
    this.id=this.actRouted.snapshot.paramMap.get('id');

  }
  ngOnInit(): void {
    this.postService.getPostById(this.id).subscribe(data=>{
      this.post=data;
    },(error)=>{
      console.warn('POst does not exist')
    })
    
  }


}
