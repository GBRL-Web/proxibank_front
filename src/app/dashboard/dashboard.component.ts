import { Employee } from 'src/app/models/employee.model';
import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent {
  employee!: Employee;

  constructor() {
    this.employee = JSON.parse(sessionStorage.getItem('currentUser')|| '{}');
    this.isDirector();
  }

  isDirector(): boolean{
    const employee = JSON.parse(sessionStorage.getItem('currentUser')|| '{}');
    if (employee.role !== 'director') {
      return false;
    } else {  
      return true;
    }
  }
}
