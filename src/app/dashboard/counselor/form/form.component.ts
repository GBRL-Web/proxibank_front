import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, Subject, takeUntil } from 'rxjs';
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
  private readonly destroySubj = new Subject<void>();

  onCreate: boolean = false;
  onEdit: boolean = false;
  @Input() onRead: boolean = true;

  @Output() userUpdated = new EventEmitter<Client>();

  constructor(private clientService: ClientService) {}

  ngOnInit() { 
    this.clientService.selectedClient$.pipe(takeUntil(this.destroySubj)).subscribe((client: Client) => {
      this.selectedClient = client;
    });
    this.initForm();    
  }

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
    console.log('Initializer called...');    
  }

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
    console.log('[UPDATE FORM]Client: ' + this.clientService.getSelectedClient());    
    console.log('[UPDATE FORM]Edit: ' + this.onEdit + '/n', 'Create: ' + this.onCreate + '/n', 'Read: ' + this.onRead + '/n');
  }
  onAddNew() {
    this.onCreate = true;
    this.onRead = false;
    this.onEdit = false;
  }

  onAddClient() {
    this.onCreate = true;
    this.onRead = false;
    this.onEdit = false;
    this.onSubmitForm();
    this.clientForm.reset();
    console.log('[ADD]Edit: ' + this.onEdit + '/n', 'Create: ' + this.onCreate + '/n', 'Read: ' + this.onRead + '/n');
  }

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
      this.clientService.updateClient(updatedClient).subscribe(() => {
        this.clientService.updateClientsAfterEdit(updatedClient);
        this.selectedClient = updatedClient;
        this.onEdit = false;
        this.onRead = true;
        this.clientForm.reset();
      });
      console.log('[UPDATE]Edit: ' + this.onEdit + '/n', 'Create: ' + this.onCreate + '/n', 'Read: ' + this.onRead + '/n');
    }

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
    console.log('[CREATE]Edit: ' + this.onEdit + '/n', 'Create: ' + this.onCreate + '/n', 'Read: ' + this.onRead + '/n');
  }
  onEditClient() {
    this.onCreate = false;
    this.onRead = false;
    this.onEdit = true;
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
    console.log('[EDIT]Edit: ' + this.onEdit + '/n', 'Create: ' + this.onCreate + '/n', 'Read: ' + this.onRead + '/n');
  }

  onCancelEdit() {
    this.onCreate = false;
    this.onEdit = false;
    this.onRead = true;
    this.updateFormValues(this.selectedClient);
    this.clientForm.reset();
    console.log('[CANCEL]Edit: ' + this.onEdit + '/n', 'Create: ' + this.onCreate + '/n', 'Read: ' + this.onRead + '/n');
  }

  onResetForm() {
    this.onCreate = false;
    this.onEdit = false;
    this.onRead = true;
    this.clientForm.reset();
    this.clientService.selectClient(undefined);  
    console.log('[RESET]Edit: ' + this.onEdit + '/n', 'Create: ' + this.onCreate + '/n', 'Read: ' + this.onRead + '/n');
  }
}
