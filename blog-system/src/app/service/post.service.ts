import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  
  private baseUrl = 'http://localhost:8080/api/posts';
  private apiUrl = 'http://localhost:8080/api/auth';
  private userPostsSubject = new BehaviorSubject<any[]>([]);
  userPosts$: Observable<any[]> = this.userPostsSubject.asObservable();
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

  getUserPostsByUsername(username: string): Observable<any[]> {
    const url = `${this.baseUrl}/getPostByUsername/${username}`;
    return this.http.get<any[]>(url);
  }
}
//