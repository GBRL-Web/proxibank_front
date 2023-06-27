import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, merge } from 'rxjs';
import { Client } from '../models/client.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  // Backend API URL.
  private apiUrl = 'http://localhost:8080/clients';

  // All the clients variables.
  private clients!: Client[];
  private clientsSubject = new Subject<Client[]>();
  clients$ = this.clientsSubject.asObservable();

  // The selected client variables.
  private clientSubject = new Subject<Client>();
  selectedClient$ = this.clientSubject.asObservable();
  private selectedClient!: Client;

  // Edit mode for the client.
  private editModeSubject: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);
  public editMode$: Observable<boolean> = this.editModeSubject.asObservable();

  constructor(private http: HttpClient) {
    this.getClients();
  }

  getClients(): Observable<Client[]> {
    const counselorId = JSON.parse(
      sessionStorage.getItem('currentUser') || '{}'
    ).id;
  
    const clients$ = this.http
      .get<Client[]>(`${this.apiUrl}/counselor/${counselorId}`)
      .pipe(
        tap((clients) => {
          this.clients = clients;
          this.clientsSubject.next(this.clients);
        }),
        catchError((error: HttpErrorResponse) => {
          console.error("Une erreur s'est produite :", error);
          throw new Error(
            "Quelque chose s'est mal passé ; Veuillez réessayer plus tard."
          );
        })
      );
  
    return merge(this.clientsSubject.asObservable(), clients$);
  }

  updateClient(client: Client): Observable<Client> {
    return this.http.put<Client>(`${this.apiUrl}`, client).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error("Une erreur s'est produite :", error);
        throw new Error(
          "Quelque chose s'est mal passé ; Veuillez réessayer plus tard."
        );
      })
    );
  }

  createClient(client: Client): Observable<Client> {
    const id_cls = JSON.parse(sessionStorage.getItem('currentUser') || '{}');
    
    return this.http
      .post<Client>(`${this.apiUrl}/counselors/${id_cls.id}`, client)
      .pipe(
        tap((newClient) => {
          this.clients.push(newClient);
          this.clientsSubject.next(this.clients);
        }),
        catchError(() => {
          throw new Error(
            'Une donnée est invalide veuillez vérifier le formulaire'
          );
        })
      );
  }

  updateClientsAfterEdit(client: Client) {
    const index = this.clients.findIndex((c) => c.id === client.id);
    if (index !== -1) {
      this.clients[index] = client;
      this.updateClient(client).subscribe(() => {
        this.clientsSubject.next(this.clients);
      });
    }
  }

  selectClient(client: any) {
    this.selectedClient = client;
    this.clientSubject.next(client);
  }

  getSelectedClient() {
    return this.selectedClient;
  }

  setEditMode(editMode: boolean): void {
    this.editModeSubject.next(editMode);
  }
}
