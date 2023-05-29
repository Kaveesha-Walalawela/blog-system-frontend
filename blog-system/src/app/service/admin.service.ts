import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  
  private baseUrl = 'http://localhost:8080/api/posts';

  savedPosts: any[] = [];


  constructor(private http: HttpClient) { }

  getAllPendingPosts(): Observable<any> {
    const url = `${this.baseUrl}`;
    return this.http.get<any>(url);
  }

  acceptPostById(postId: string): Observable<any> {
    // Implement the method to accept a post by its ID in the backend
    const url = `${this.baseUrl}/acceptPostById/${postId}`;
    return this.http.put<any>(url, {});
  }

  rejectPostById(postId: string): Observable<any> {
    // Implement the method to reject a post by its ID in the backend
    const url = `${this.baseUrl}/rejectPostById/${postId}`;
    return this.http.put<any>(url, {});
  }

  getAllUsers(): Observable<any[]> {
    const url = `${this.baseUrl}/admin/users`;
    return this.http.get<any[]>(url);
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


}