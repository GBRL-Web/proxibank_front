import { Component, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Auth } from 'src/app/models/auth';
import { AuthenticationService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  @Input() username!: string;
  @Input() password!: string;

  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {}

  ngOnInit() {}

  onSubmit(form: NgForm) {
    const value = form.value;
    const credentials = new Auth(value.username, value.password);
    if (credentials) {
      this.authService.login(credentials).subscribe(
        () => {
          this.router.navigate(['/dashboard']);
        },
        (error: any) => alert(error)
      );
    } else {
      console.log('Duh.');
    }
  }
}
