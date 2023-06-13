import { Component, Input } from '@angular/core';
import { Client } from 'src/app/models/client';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent {
@Input() client!: Client;


 showDetails() {
  console.log('yes.');  
 }
}
