import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Employee } from 'src/app/models/employee';
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
    if (value.username && value.password) {
      this.authService.login(value.username, value.password).subscribe(
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
