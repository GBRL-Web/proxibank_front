import { Component } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Client } from 'src/app/models/client.model';
import { ClientService } from 'src/app/service/client.service';
import { trigger, transition, style, animate, query, stagger } from '@angular/animations';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  animations: [
    trigger('listAnimation', [
      transition('* => *', [
        query(':enter', [
          style({ opacity: 0, transform: 'translateY(-20px)' }),
          stagger(100, [
            animate('100ms', style({ opacity: 1, transform: 'none' }))
          ])
        ], { optional: true })
      ])
    ])
  ]
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
