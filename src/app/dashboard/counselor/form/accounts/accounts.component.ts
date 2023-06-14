import { Component, Input, SimpleChanges } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { Account } from 'src/app/models/account';
import { Client } from 'src/app/models/client';
import { AccountService } from 'src/app/service/account.service';
import { ClientService } from 'src/app/service/client.service';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.scss'],
})
export class AccountsComponent {
  private readonly destroySubj = new Subject<void>();
  accounts!: Account[];
  @Input()
  accountsOwner!: Client;
  constructor(
    private accountService: AccountService,
    private clientService: ClientService
  ) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['accountsOwner'] && changes['accountsOwner'].currentValue) {
      this.accountService.getAccountsByClient(this.accountsOwner.id).subscribe({
        next: (result: Account[]) => {
          this.accounts = result;
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
  }


}
