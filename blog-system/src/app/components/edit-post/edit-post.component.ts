import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PostService } from 'src/app/service/post.service';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css']
})
export class EditPostComponent implements OnInit {

  postId: any;
  post: any;
  editPost = new FormGroup({
    title:new FormControl('', Validators.required),
    author:new FormControl('', Validators.required),
    content:new FormControl('', Validators.required)
  });

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private postService: PostService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.postId = params['id'];
      this.postService.getPostById(this.postId).subscribe(
        (data) => {
          this.post = data;
          this.editPost.patchValue({
            title: this.post.title,
            author: this.post.author,
            content: this.post.content
          });
        },
        (error) => {
          console.log("Error Occurred!");
        }
      );
    });
  }

  onSubmit() {
    console.log(this.editPost.value);
    this.postService.updatePost(this.postId, this.editPost.value).subscribe((data)=>{
      alert("Blog Post Updated Successfully !");
      this.router.navigate(['/']);
    },(error)=>{
      console.log("Error Occured !")
    })
  }

}
