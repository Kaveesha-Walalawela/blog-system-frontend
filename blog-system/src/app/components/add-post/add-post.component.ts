import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
// import { FormControl, FormGroup, Validators } from '@angular/core';
import { PostService } from 'src/app/service/post.service';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css']
})
export class AddPostComponent implements OnInit {
  constructor(private postService:PostService){

  }
  addPost = new FormGroup({
  title:new FormControl('', Validators.required),
  author:new FormControl('', Validators.required),
  content:new FormControl('', Validators.required)

});
onSubmit(){
  console.log(this.addPost.value);
  this.postService.createPost(this.addPost.value).subscribe((data)=>{
    alert("Blog Post Successful !");
    this.addPost.reset()
  },(error)=>{
    console.log("Error Occured !")
  })
  }

ngOnInit(): void {

}
}
