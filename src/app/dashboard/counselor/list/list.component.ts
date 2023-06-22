import { Component } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Client } from 'src/app/models/client.model';
import { ClientService } from 'src/app/service/client.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent {
  allClients!: Client[];
  clients$!: Observable<Client[]>;
  clientsSubscription!: Subscription;


  constructor(private clientService : ClientService){}
  
  ngOnInit() {
    this.clients$ = this.clientService.getClients();
    this.clientsSubscription = this.clientService.clients$.subscribe(
      (clients) => {
        this.allClients = clients;
      }
    );
  }

  ngOnDestroy() { 
    this.clientsSubscription.unsubscribe();
  }

}
