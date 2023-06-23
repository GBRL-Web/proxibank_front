import { Component, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ModalStateService } from 'src/app/service/modal-state.service';
import { AccountService } from 'src/app/service/account.service';
import { Account } from 'src/app/models/account.model';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.scss'],
})
export class TransferComponent {
  modalState!: boolean;
  @Input() fromAcc!: Account;
  error$!: Observable<boolean>;

  constructor(
    private modalStateService: ModalStateService,
    private accountService: AccountService
  ) {}

  ngOnInit(): void {
    this.modalStateService.getModalState().subscribe((state) => {
      this.modalState = state;
    });
    this.error$ = of(true);
  }

  onSubmit(form: NgForm): void {
    const values = form.value;
    const accNum = parseInt(values.accNum);
    const accSum = parseInt(values.accSum);

    this.error$ = new Observable<boolean>((observer) => {
      if (this.fromAcc.balance > accSum) {
        this.accountService.transferTo(this.fromAcc, accNum, accSum);
      } else {
        observer.next(false); // Error: Insufficient balance
      }
      observer.complete();
    });
  }

  closeModal(): void {
    this.modalStateService.setModalState(false);
  }
}
