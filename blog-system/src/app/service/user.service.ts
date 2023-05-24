import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private loggedInUser: any;
  private baseUrl = 'http://localhost:8080/api/auth/';
  
  constructor(private http: HttpClient) { 
    const storedUser = localStorage.getItem('loggedInUser');
    if (storedUser) {
      this.loggedInUser = JSON.parse(storedUser);
    }
  }

  logout(): void{
    localStorage.clear();
  }

  getLoggedInUser(): any {
    return this.loggedInUser;
  }

  setLoggedInUser(user: any): void {
    this.loggedInUser = user;
  }

  isLoggedIn() {
    return this.loggedInUser != null;
  }
  signup(signupData: any): Observable<any> {
    const url = `${this.baseUrl}signup`;
    return this.http.post<any>(url, signupData);
  }

  login(loginData: any): Observable<any> {
    const url = `${this.baseUrl}signin`;
    return this.http.post<any>(url, loginData);
}

updateProfile(updatedProfile: any): Observable<any> {
  const url = `${this.baseUrl}/updateUserProfile/{userId}${this.loggedInUser.id}`;
  return this.http.put<any>(url, updatedProfile, httpOptions);
}

}