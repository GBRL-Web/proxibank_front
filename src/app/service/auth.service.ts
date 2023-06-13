import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { Auth } from '../models/auth';
import { Employee } from '../models/employee';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private link = 'http://localhost:8080/auth';
  _isAuthenticated: boolean = false;

  constructor(private http: HttpClient) {
    console.log(JSON.parse(sessionStorage.getItem('currentUser')|| '{}'));
    
    // Check if the user is already logged in
    if (sessionStorage.getItem('currentUser') !== null) {
      console.log('User logged in');
      this._isAuthenticated = true;
    } else {
      console.log('User not logged in');
    }
  }

  ngOnInit(): void {}

  login(username: string, password: string): Observable<Employee> {
    const auth = new Auth(username, password);
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http
      .post<Employee>(`${this.link}/login`, auth, { headers })
      .pipe(
        tap((employee: Employee) => {
          // Store the user's session data in local storage
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
