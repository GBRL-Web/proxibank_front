import { Component, Input, SimpleChanges } from '@angular/core';
import { Account } from 'src/app/models/account.model';
import { Client } from 'src/app/models/client.model';
import { AccountService } from 'src/app/service/account.service';
import { ModalStateService } from 'src/app/service/modal-state.service';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.scss'],
})
export class AccountsComponent {

  accounts!: Account[];
  isModalOpen: boolean = false;
  @Input()
  accountsOwner!: Client;
  acc! : Account;

  constructor(private accountService: AccountService, private modalStateService : ModalStateService) {}

  // Checks changes to the client selected and returns the associated accounts.
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
    } else {
      this.accounts = []; // Reset the accounts to an empty array
    }
  }

  openModal(acc: Account): void {
    this.acc = acc;
    this.modalStateService.setModalState(true);
  }
}
