import { Component, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { Client } from 'src/app/models/client.model';
import { ClientService } from 'src/app/service/client.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent {
@Input() client!: Client;
@Input() selClient! : Client;
clientSub!: Subscription;
editSub!: Subscription;
editMode!: boolean;

constructor(private clientService: ClientService) {}

ngOnInit(): void {
 this.clientSub=  this.clientService.selectedClient$.subscribe((client: Client) => {
    this.selClient = client;
  });
  this.editSub = this.clientService.editMode$.subscribe(mode => this.editMode = mode);
}

 showDetails() {
  this.clientService.selectClient(this.client);  
 }

 ngOnDestroy(): void {
  this.clientSub.unsubscribe();
  this.editSub.unsubscribe();
 }
}
