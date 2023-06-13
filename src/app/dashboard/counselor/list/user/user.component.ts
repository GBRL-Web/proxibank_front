import { Component, Input } from '@angular/core';
import { Client } from 'src/app/models/client';
import { ClientService } from 'src/app/service/client.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent {
@Input() client!: Client;

constructor(private clientService: ClientService) {}

 showDetails() {
  this.clientService.selectClient(this.client);
 }
}
