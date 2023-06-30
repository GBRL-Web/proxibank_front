import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, merge } from 'rxjs';
import { Client } from '../models/client.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

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
      sessionStorage.getItem('currentUser') ?? '{}'
    ).id;

    const clients$ = this.http
      .get<Client[]>(`${this.apiUrl}/counselor/${counselorId}`)
      .pipe(
        tap((clients) => {
          this.clients = clients;
          this.clientsSubject.next(this.clients);
        }),
        catchError((error: HttpErrorResponse) => {
          console.error("An error occurred:", error);
          throw new Error(
            "Something went wrong; please try again later."
          );
        })
      );

    return merge(this.clientsSubject.asObservable(), clients$);
  }

  updateClient(client: Client): Observable<Client> {
    return this.http.put<Client>(`${this.apiUrl}`, client).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error("An error occurred:", error);
        throw new Error(
          "Something went wrong; please try again later."
        );
      })
    );
  }

  createClient(client: Client): Observable<Client> {
    console.log("[SERVICE-FRONT] Creating client...");
    
    const currentUser = JSON.parse(sessionStorage.getItem('currentUser') ?? '{}');
    return this.http
      .post<Client>(`${this.apiUrl}/counselor/${currentUser.id}`, client)
      .pipe(
        tap((newClient) => {
          this.clients.push(newClient);
          this.clientsSubject.next(this.clients);
        }),
        catchError(() => {
          throw new Error(
            'Invalid data; please check the form.'
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

  deleteClient(client: Client): Observable<string> {
    console.log("[SERVICE-FRONT] Delete activated.");
    const index = this.clients.findIndex((c) => c.id === client.id);
    if (index !== -1) {
      this.clients.splice(index, 1);
      this.clientsSubject.next(this.clients);
      return this.http.delete<string>(`${this.apiUrl}/delete/${client.id}`).pipe(
        map(() => "Client deleted successfully."),
        catchError((error: HttpErrorResponse) => {
          console.error("An error occurred:", error);
          throw new Error(
            "Something went wrong; please try again later."
          );
        })
      );
    }
    throw new Error("The specified client does not exist.");
  }
}

