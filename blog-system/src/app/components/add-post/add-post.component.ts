import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
// import { FormControl, FormGroup, Validators } from '@angular/core';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css']
})
export class AddPostComponent implements OnInit {
  constructor(){

  }
  addPost = new FormGroup({
  title:new FormControl('', Validators.required),
  author:new FormControl('', Validators.required),
  content:new FormControl('', Validators.required)

});
onSubmit(){
  console.log(this.addPost.value);
}

ngOnInit(): void {

}
}
