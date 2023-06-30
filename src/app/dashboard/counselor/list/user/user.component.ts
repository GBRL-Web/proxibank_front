import { Component, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { Client } from 'src/app/models/client.model';
import { ClientService } from 'src/app/service/client.service';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  animations: [
    trigger('listAnimationItem', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-20px)' }),
        animate('300ms', style({ opacity: 1, transform: 'none' }))
      ])
    ])
  ]
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

 delete() {
  console.log("[ITEM] Delete activated.");  
  this.clientService.deleteClient(this.client).subscribe(response => console.log(response));
  this.clientService.selectClient(undefined);
 }
}
