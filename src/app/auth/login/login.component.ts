import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Auth } from 'src/app/models/auth.model';
import { AuthenticationService } from 'src/app/service/auth.service';
import { trigger, transition, style, animate } from '@angular/animations';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('0.5s', style({ opacity: 1 })),
      ]),
      transition(':leave', [
        animate('0.5s', style({ opacity: 0 })),
      ]),
    ]),
  ],
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
