import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalStateService {
  private modalStateSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public modalState$: Observable<boolean> = this.modalStateSubject.asObservable();

  setModalState(state: boolean): void {
    this.modalStateSubject.next(state);
  }

  getModalState(): Observable<boolean> {
    return this.modalState$;
  }
}