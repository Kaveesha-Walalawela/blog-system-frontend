import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  // private baseUrl = 'http://localhost:3000/posts';
  // private apiUrl = 'your_api_url'; // Replace with your API URL
  private baseUrl = 'http://localhost:8080/api/posts';
  private apiUrl = 'http://localhost:8080/api/auth'; // Replace with your API URL
  savedPosts: any[] = [];

  constructor(private http: HttpClient) {}

  getAllPosts(): Observable<any> {
    return this.http.get<any>(this.baseUrl);
  }

  createPost(data: any): Observable<any> {
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

  getUserPosts(userId: string): Observable<any[]> {
    const url = `${this.apiUrl}/posts?author=${userId}`;
    return this.http.get<any[]>(url);
  }
}
