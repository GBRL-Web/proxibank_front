import { Component } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('.5s', style({ opacity: 1 })),
      ]),
      transition(':leave', [
        animate('.5s', style({ opacity: 0 })),
      ]),
    ]),
  ],
})
export class AppComponent {
  title = 'proxibank_front';
}
