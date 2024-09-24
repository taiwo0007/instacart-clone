import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-delivery-times-dates',
  templateUrl: './delivery-times-dates.component.html',
  styleUrls: ['./delivery-times-dates.component.css']
})
export class DeliveryTimesDatesComponent implements OnInit {
  isSelected: number = 0;
  dates: { dayName: string, month: string, day: string, year: string, date: string, short_month:string }[] = [];

  @Output() selectedDate = new EventEmitter<{ date: string }>();

  constructor() { }

  ngOnInit(): void {
    const date = new Date();
    for (let i = 0; i < 5; i++) {
      const newDate = new Date(date);
      newDate.setDate(date.getDate() + i);
      const dayName = new Intl.DateTimeFormat('en-GB', { weekday: 'short' }).format(newDate);
      const dateObj = this.formatDate(newDate);
      const dateStr = `${dateObj.day}/${dateObj.month}/${dateObj.year}`;
      this.dates.push({ dayName, ...dateObj, date: dateStr });
    }

    this.selectedDate.emit(this.dates[0]);

  }

  formatDate(date: Date): { month: string, day: string, year: string, short_month:string } {
    const day = String(date.getDate()).padStart(2, '0');
    const short_month = new Intl.DateTimeFormat('en-GB', { month: 'short' }).format(date).toUpperCase();

    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = String(date.getFullYear());
    return { month, day, year, short_month };
  }

  selectButton(number: number) {
    this.isSelected = number;
    this.selectedDate.emit(this.dates[number]);
  }
}
