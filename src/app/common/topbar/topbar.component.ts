import { Component } from '@angular/core';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent {
  connectedValue: boolean = true;

  isConnected(): boolean {
    return this.connectedValue;
  }

  logout(): void {
    this.connectedValue = false;
  }
}
