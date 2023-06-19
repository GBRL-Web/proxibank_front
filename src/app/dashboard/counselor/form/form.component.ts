import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, Subject, Subscription, takeUntil } from 'rxjs';
import { Client } from 'src/app/models/client';
import { ClientService } from 'src/app/service/client.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent {

  clientForm!: FormGroup;
  selectedClient$!: Observable<Client | null>;
  selectedClient!: Client;

  onCreate: boolean = false;
  onEdit: boolean = false;
  isEditMode!: boolean;

  clientSub!: Subscription;
  modeSub!: Subscription;
  
  @Input() onRead: boolean = true;

  @Output() userUpdated = new EventEmitter<Client>();

  constructor(private clientService: ClientService) {}

  // Subscribes to SelectedClient and initializes the form.
  ngOnInit() { 
    this.clientSub = this.clientService.selectedClient$.subscribe((client: Client) => {
      this.selectedClient = client;
    });
    this.initForm(); 
    this.modeSub = this.clientService.editMode$.subscribe(editMode => {
      this.isEditMode = editMode;
    });   
  }

  // Initialize the form with validations.
  private initForm() {
    this.clientForm = new FormGroup({
      name: new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-zA-Z]+(([\' .-][a-zA-Z ])?[a-zA-Z]*)*$') // expects only letters and spaces
      ]),
      surname: new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-zA-Z]+(([\' .-][a-zA-Z ])?[a-zA-Z]*)*$') // expects only letters and spaces
      ]),
      address: new FormControl('', Validators.required),
      zip: new FormControl('', [
        Validators.required,
        Validators.pattern('^[0-9]{5}$') // expects a 5 digit number
      ]),
      city: new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-zA-Z]+(([\' .-][a-zA-Z ])?[a-zA-Z]*)*$') // expects only letters and spaces
      ]),
      tel: new FormControl('', [
        Validators.required,
        Validators.pattern('^[0-9]{10}$') // expects a 10 digit number
      ])
    });
    this.updateFormValues(this.selectedClient);
  }

  // This function is called when a client is selected, this fills in the form values.
  updateFormValues(client: Client | null) {
    if (client !== null) {
      this.onRead = true;
    }
    if (client) {
      this.clientForm.patchValue({
        name: client.name,
        surname: client.surname,
        address: client.address,
        zip: client.zip,
        city: client.city,
        tel: client.tel
      });
    }
  }

  // Enables input field completion when creating a new client
  onAddNew() {
    this.onCreate = true;
    this.onRead = false;
    this.onEdit = false;
    this.clientService.setEditMode(true);
  }

  // Function to create a new client
  onAddClient() {
    this.onSubmitForm();
    this.clientForm.reset();
    this.clientService.setEditMode(false);
  }

  // This is called when creating a new client or editing an existing client.
  onSubmitForm() {
    const formValue = this.clientForm.value;
    const clientData = {
      name: formValue.name,
      surname: formValue.surname,
      address: formValue.address,
      zip: formValue.zip,
      city: formValue.city,
      tel: formValue.tel
    };
  
    if (this.onEdit) {
      const updatedClient: Client = {
        id: this.selectedClient.id,
        ...clientData
      };
      this.clientService.updateClient(updatedClient)
        this.clientService.updateClientsAfterEdit(updatedClient);
        this.selectedClient = updatedClient;
        this.onEdit = false;
        this.onRead = true;
        this.clientForm.reset();
    }
    // Condition if the client is created.
    if (this.onCreate) {
      const updatedClient = {
        ...clientData
      } as Client;
      this.clientService.createClient(updatedClient).subscribe({
        next:(result : Client) => {
          this.clientService.updateClientsAfterAdd(result);
          alert('New client added successfully!');
          this.onEdit = false;
          this.onRead = true;
          this.onCreate = false;
          this.clientForm.reset();
        },
        error:(err) => {
          this.onCreate = false;
          alert(err);
        }
      });
    }
  }
// Condition if the user's information is being updated
  onEditClient() {
    this.onCreate = false;
    this.onRead = false;
    this.onEdit = true;
    this.clientService.setEditMode(true);
    if (this.selectedClient) {
      this.clientForm.patchValue({
        name: this.selectedClient.name,
        surname: this.selectedClient.surname,
        address: this.selectedClient.address,
        zip: this.selectedClient.zip,
        city: this.selectedClient.city,
        tel: this.selectedClient.tel
      });
    }
  }

  // Function to cancel the edit operation
  onCancelEdit() {
    this.onCreate = false;
    this.onEdit = false;
    this.onRead = true;
    this.updateFormValues(this.selectedClient);
    this.clientForm.reset();
    this.clientService.setEditMode(false);
  }

  // Resets the form values to be able to create new clients
  onResetForm() {
    this.onCreate = false;
    this.onEdit = false;
    this.onRead = true;
    this.clientForm.reset();
    this.clientService.selectClient(undefined);  
  }

  // Unsubscribe from all subscriptions. Check to see if any subscriptions are missing.
  onDestroy() {
    this.clientSub.unsubscribe();
    this.modeSub.unsubscribe();
  }
}
