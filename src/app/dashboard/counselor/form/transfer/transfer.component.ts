import { Component } from '@angular/core';
import { ModalStateService } from 'src/app/service/modal-state.service';

@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.scss']
})
export class TransferComponent {
  modalState!: boolean;

  constructor(private modalStateService: ModalStateService) {}

  ngOnInit(): void {
    this.modalStateService.getModalState().subscribe(state => {
      console.log('ngOnInit modal state: ',state);
      
      this.modalState = state;
    });
  }

  closeModal(): void {
    this.modalStateService.setModalState(false);
  }
}
