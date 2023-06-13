import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Employee } from 'src/app/models/employee';
import { AuthenticationService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent {
  employee!: Employee;

  constructor(private authService: AuthenticationService, private router: Router) {
  }
  
  isConnected(): boolean {
    this.employee = JSON.parse(sessionStorage.getItem('currentUser')|| '{}');
     return this.authService._isAuthenticated;
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
