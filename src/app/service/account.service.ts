import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Account } from '../models/account.model';
import { Observable } from 'rxjs';
import { Transfer } from '../models/transfer.model';
import { ClientService } from './client.service';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  private link = 'http://localhost:8080/accounts/';
  constructor(private http: HttpClient, private clientService: ClientService) {}

  getAccountsByClient(id: number): Observable<Account[]> {
    return this.http.get<Account[]>(this.link + 'client/' + id);
  }

  transferTo(fromAcc: Account, toAccount: number, amount: number) {
    const transfer = new Transfer(fromAcc.accountNumber, toAccount, amount);
    console.log("[SERVICE-FRONT] TRANSFER: " + fromAcc.accountNumber + " " + toAccount + " " + amount);

    this.http.post(this.link + 'transfer', transfer).subscribe(
      (response) => {
        // Handle the response here
        console.log('Transfer successful', response);
      },
      (error) => {
        // Handle the error here
        console.error('Transfer error', error.message);
      }
    );
  }
}
