import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  baseUrl="http://localhost:3000/posts"
  savedPosts: any[] =[];
  addSavedPost(post: any) {
    this.savedPosts.push(post);
  }
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
    return this.http.get(`${this.baseUrl}/${id}`)
  }
  //Update post
  updatePost(id:any, data:any){
    return this.http.put(`${this.baseUrl}/${id}`, data)
  }
  //Delete post
  deletePost(id:any){
    return this.http.delete(`${this.baseUrl}/${id}`)
  }
  
//Save post
savePost(post: any){
  this.savedPosts.push(post);
}

//Get saved posts
getSavedPosts(){
  return this.savedPosts;
}

//Remove post from saved posts
removeSavedPost(post: any){
  const index = this.savedPosts.indexOf(post);
  if(index >= 0){
    this.savedPosts.splice(index, 1);
  }
} 
}
