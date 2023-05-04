import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { PostService } from 'src/app/service/post.service';

@Component({
  selector: 'app-details-post',
  templateUrl: './details-post.component.html',
  styleUrls: ['./details-post.component.css']
})
export class DetailsPostComponent implements OnInit {
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
