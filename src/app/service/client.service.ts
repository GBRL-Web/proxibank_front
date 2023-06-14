import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Client } from '../models/client';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  link = 'http://localhost:8080/clients';
  private clients!: Client[];
  private clientsSubject = new Subject<Client[]>();
  clients$ = this.clientsSubject.asObservable();
  private clientSubject = new Subject<Client>();
  selectedClient$ = this.clientSubject.asObservable();
  private selectedClient!: Client;

  constructor(private http: HttpClient) {
    const counselorId = JSON.parse(sessionStorage.getItem('currentUser') || '{}').id;
    this.http
      .get<Client[]>(`${this.link}/counselor/${counselorId}`)
      .subscribe((clients) => {
        this.setClients(clients);
      });
  }

  setClients(clients: Client[]) {
    this.clients = clients;
    this.clientsSubject.next(this.clients);
  }

  getClients(): Observable<Client[]> {
    const counselorId = JSON.parse(sessionStorage.getItem('currentUser') || '{}').id;
    return this.http.get<Client[]>(`${this.link}/counselor/${counselorId}`).pipe(
      tap(clients => {
        this.clients = clients;
        this.clientsSubject.next(this.clients);
      }),
      catchError((error: HttpErrorResponse) => {
        console.error("Une erreur s'est produite :", error);
        return throwError("Quelque chose s'est mal passé ; Veuillez réessayer plus tard.");
      })
    );
  }

  addClient(newClient: Client) {
    return this.http.post(this.link, newClient);
  }

  updateClient(client: Client): Observable<Client> {
    return this.http.put<Client>(`${this.link}`, client)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          console.error("Une erreur s'est produite :", error);
          return throwError("Quelque chose s'est mal passé ; Veuillez réessayer plus tard.");
        })
      );
  }
  
  createClient(client: Client): Observable<Client> {
    const id_cls = JSON.parse(sessionStorage.getItem('currentUser') || '{}');
    return this.http.post<Client>(`${this.link}/counselors/${id_cls.id}`, client)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return throwError('Une donnée est invalide veuillé vérifier le formulaire');
        })
      );
  }

  updateClientsAfterEdit(client: Client) {
    const index = this.clients.findIndex(c => c.id === client.id);
    if (index !== -1) {
      this.clients[index] = client;
      this.updateClient(client).subscribe(() => {
        this.clientsSubject.next(this.clients);
      });
    }
  }

  updateClientsAfterAdd(newClient: Client) {
    this.clients.push(newClient);
    this.clientsSubject.next(this.clients);
}

  getAllClients(): Observable<Client[]> {
    return this.clientsSubject.asObservable();
  }

  selectClient(client: any) {
    this.selectedClient = client;
     this.clientSubject.next(client);
  }

  getSelectedClient() {
    return this.selectedClient;
  }
}
