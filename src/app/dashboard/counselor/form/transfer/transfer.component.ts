import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ModalStateService } from 'src/app/service/modal-state.service';
import { Transfer } from 'src/app/models/transfer.model';
import { AccountService } from 'src/app/service/account.service';

@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.scss']
})
export class TransferComponent {
  modalState!: boolean;

  constructor(private modalStateService: ModalStateService, private accountService : AccountService) {}

  ngOnInit(): void {
    this.modalStateService.getModalState().subscribe(state => {     
      this.modalState = state;
    });
  }

  onSubmit(form: NgForm): void {
    const values = form.value;
    const accNum = parseInt(values.accNum);
    const accSum = parseInt(values.accSum);
    this.accountService.transferTo(accNum, accSum);    
  }

  closeModal(): void {
    this.modalStateService.setModalState(false);
  }
}
