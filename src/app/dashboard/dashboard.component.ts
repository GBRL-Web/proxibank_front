import { Employee } from 'src/app/models/employee';
import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  employee!: Employee;
  isDir: boolean = false;

  constructor() {
    this.employee = JSON.parse(sessionStorage.getItem('currentUser')|| '{}');
    this.isDirector();
  }

  isDirector(): void{
    const employee = JSON.parse(sessionStorage.getItem('currentUser')|| '{}');
    if (employee.role !== 'director') {
      console.log('Not director');
      this.isDir = false;
    } else {
      console.log('Director');      
      this.isDir = true;
    }
  }
}
