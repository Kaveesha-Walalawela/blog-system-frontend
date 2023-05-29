import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private baseUrl = 'http://localhost:8080/api/auth';

  constructor(private http: HttpClient) {}

  getAllUsers(): Observable<any[]> {
    const url = `${this.baseUrl}/users`;
    return this.http.get<any[]>(url);
  }

  updateUser(userId: string, updatedUser: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/adminUpdateUserById/${userId}`, updatedUser);
  }

  deleteUser(userId: string): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/adminDeleteUserById/${userId}`);
  }

  getUserById(userId: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/users/${userId}`);
  }
  
  warningUser(userId: string): Observable<any> {
    const url = `${this.baseUrl}/adminWarningUser/${userId}`;
    return this.http.put<any>(url, {});
  }  
}
