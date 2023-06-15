import { Component, Input, SimpleChanges } from '@angular/core';
import { Subject } from 'rxjs';
import { Account } from 'src/app/models/account';
import { Client } from 'src/app/models/client';
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

  openModal(): void {
    this.modalStateService.getModalState().subscribe(b => {console.log('Open modal ', b);
    });
    
    this.modalStateService.setModalState(true);
  }
}
