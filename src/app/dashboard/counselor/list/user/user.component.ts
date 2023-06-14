import { Component, Input } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { Client } from 'src/app/models/client';
import { ClientService } from 'src/app/service/client.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent {
  private readonly destroySubj = new Subject<void>();
@Input() client!: Client;
selClient! : Client;

constructor(private clientService: ClientService) {}

ngOnInit(): void {
  this.clientService.selectedClient$.pipe(takeUntil(this.destroySubj)).subscribe((client: Client) => {
    this.selClient = client;
  });
}

 showDetails() {
  this.clientService.selectClient(this.client);
 }

 ngOnDestroy(): void {
  this.destroySubj.next();
  this.destroySubj.complete();
 }
}
