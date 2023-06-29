import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Auth } from 'src/app/models/auth.model';
import { AuthenticationService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {}

  onSubmit(form: NgForm) {
    const value = form.value;
    const credentials = new Auth(value.username, value.password);
    if (credentials) {
      this.authService.login(credentials).subscribe({
        next: () => {
          if (this.authService._isAuthenticated) {
            this.router.navigate(['/dashboard']);
          } else {
            alert('Authentication failed. Please check your credentials.');
          }
        },
        error: (error: any) => alert(error),
      });
    }
  }
}
