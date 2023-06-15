import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { Employee } from '../models/employee';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private link = 'http://localhost:8080/auth';
  _isAuthenticated: boolean = false;

  constructor(private http: HttpClient, private router: Router) {
    console.log(JSON.parse(sessionStorage.getItem('currentUser')|| '{}'));
    
    // Check if the user is already logged in
    if (sessionStorage.getItem('currentUser') !== null) {
      this._isAuthenticated = true;
      console.log('User logged in.');
    } else {
      console.log('User not logged in.');
      this.router.navigate(['/login']);
    }
  }

  login(credentials : any): Observable<Employee> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http
      .post<Employee>(`${this.link}/login`, credentials, { headers })
      .pipe(
        tap((data : any) => {
          const employee = data.employee;          
          sessionStorage.setItem('currentUser', JSON.stringify(employee));
          this._isAuthenticated = true;
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
    this._isAuthenticated = false;
  }
}
