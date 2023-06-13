import { Component } from '@angular/core';
import { Account } from 'src/app/models/account';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.scss']
})
export class AccountsComponent {
 accounts!: Account[];
}
