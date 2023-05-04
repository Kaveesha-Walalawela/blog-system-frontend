import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  baseUrl="http://localhost:3000/posts"
  constructor(private http:HttpClient) { }
  //Get ALL data
  getAllPosts(){
    return this.http.get(this.baseUrl);
  }
  //Create post
  createPost(data:any){
    return this.http.post(this.baseUrl,data);

  }//Get post by ID
  getPostById(id:any){
    return this.http.get('this.baseUrl/${id}')
  }
  //Update post
  updatePost(id:any, data:any){
    return this.http.get('this.baseUrl/${id}')
  }
  //Delete post
  deletePost(id:any){
    return this.http.delete('this.baseUrl/${id}')
  }
  
}
