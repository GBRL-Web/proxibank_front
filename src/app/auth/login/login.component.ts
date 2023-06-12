import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Employee } from 'src/app/models/employee';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  ngOnInit() {}

  onSubmit(form : NgForm) {
    const value = form.value;
    if (value.username && value.password) {
      value.authService.login(value.username, value.password).subscribe(
        (employee: Employee) => {
          value.router.navigate(['/dashboard']);
        },
        (error: any) => alert(error)
      );
    } else {
      console.log('Duh.');
      
    }
  }
}

