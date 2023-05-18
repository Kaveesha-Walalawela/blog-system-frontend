import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  
  // private baseUrl = 'http://localhost:3000/posts';
  // private apiUrl = 'your_api_url'; // Replace with your API URL
  private baseUrl = 'http://localhost:8080/api/posts';
  private apiUrl = 'http://localhost:8080/api/auth'; // Replace with your API URL
  private userPostsSubject = new BehaviorSubject<any[]>([]); // BehaviorSubject to keep track of user posts
  userPosts$: Observable<any[]> = this.userPostsSubject.asObservable(); // Observable for user posts
  savedPosts: any[] = [];

  constructor(private http: HttpClient, private userService: UserService) {}

  getAllPosts(): Observable<any> {
    return this.http.get<any>(this.baseUrl);
  }

  createPost(data: any): Observable<any> {
    const username = this.userService.getLoggedInUser()?.username;
    if (username) {
      data.username = username;
    }
    return this.http.post<any>(`${this.baseUrl}/post`, data);
  }
  

  getPostById(id: any): Observable<any> {
    console.log("id-----",id)
    return this.http.get<any>(`${this.baseUrl}/getPostById/${id}`);
    
  }

  updatePost(id: any, data: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/updatePostById/${id}`, data);
  }

  deletePost(id: any): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/deletePostById/${id}`);
  }

  addSavedPost(post: any) {
    this.savedPosts.push(post);
  }

  getSavedPosts() {
    return this.savedPosts;
  }

  removeSavedPost(post: any) {
    const index = this.savedPosts.indexOf(post);
    if (index >= 0) {
      this.savedPosts.splice(index, 1);
    }
  }

  // getUserPosts(userId: string): Observable<any[]> {
  //   const url = `${this.apiUrl}/posts?username=${userId}`;
  //   return this.http.get<any[]>(url);
  // }

  addPostToUser(userId: string, post: any) {
    const currentPosts = this.userPostsSubject.value;
    const updatedPosts = [...currentPosts, post];
    this.userPostsSubject.next(updatedPosts);
  }

  getUserPostsByUsername(username: string): Observable<any[]> {
    const url = `${this.baseUrl}?username=${username}`;
    return this.http.get<any[]>(url);
  }
  
  
}
