import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Account } from '../models/account';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  link = "http://localhost:8080/bankaccounts/client/"
  constructor(private http : HttpClient) { }

  getAccountsByClient(id : number) : Observable<Account[]>{
    return this.http.get<Account[]>(this.link+id);
  }
}
