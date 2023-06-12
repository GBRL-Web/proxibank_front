import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { Auth } from '../models/auth';
import { Employee } from '../models/employee';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private link = 'http://localhost:8080/auth';

  constructor(private http: HttpClient) {
    // Check if the user is already logged in
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  login(username: string, password: string): Observable<Employee> {
    const auth = new Auth(username, password);
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<Employee>(`${this.link}/login`, auth, { headers })
      .pipe(
        tap((employee: Employee) => {
          // Store the user's session data in local storage
          sessionStorage.setItem('currentUser', JSON.stringify(employee));
        }),
        catchError((error: any) => {
          console.error(error);
          return throwError('Identifiant ou mot de passe invalide');
        })
      );
  }

  // Remove the user's session data from local storage
  logout() {
    sessionStorage.removeItem('currentUser');
  }

}