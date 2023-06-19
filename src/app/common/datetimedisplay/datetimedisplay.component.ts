import { Component, OnInit, OnDestroy } from '@angular/core';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-date-time-display',
  templateUrl: './datetimedisplay.component.html',
  styleUrls: ['./datetimedisplay.component.scss']
})
export class DateTimeDisplayComponent implements OnInit, OnDestroy {
  currentDate!: Date;
  currentTime!: string;
  currentHour!: string;
  currentMinute!: string;
  currentDay!: string;
  days: string[] = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  private intervalSubscription!: Subscription;

  ngOnInit() {
    this.intervalSubscription = interval(1000).subscribe(() => {
      this.currentDate = new Date();
      this.updateTime();
    });
  }

  ngOnDestroy() {
    if (this.intervalSubscription) {
      this.intervalSubscription.unsubscribe();
    }
  }

  updateTime() {
    const hours = this.currentDate.getHours();
    const minutes = this.currentDate.getMinutes();
    this.currentDay = this.days[this.currentDate.getDay()];
    this.currentHour = this.padNumber(hours);
    this.currentMinute = this.padNumber(minutes);
  }

  padNumber(value: number): string {
    return value.toString().padStart(2, '0');
  }
}