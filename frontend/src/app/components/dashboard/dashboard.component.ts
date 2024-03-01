import { Component } from '@angular/core';
import { TableColumn, TableRow } from '../data-display/client-table/client-table.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  selectedTab = 1;
  currentDate = new Date();

  machinesData: TableRow[] = [];

  monthlyMachinesData: TableRow[] = [];

  selectTab(tabIndex: number): void {
    this.selectedTab = tabIndex;
    // Update your data based on selected tab
    // This could involve fetching new data or filtering existing data
  }

  get formattedDate(): string {
    const options: Intl.DateTimeFormatOptions = { month: 'long', year: 'numeric' };
    return this.currentDate.toLocaleDateString('hu-HU', options).toUpperCase();
  }  

  previousMonth(): void {
    this.currentDate.setMonth(this.currentDate.getMonth() - 1);
    // Add logic to update data based on the new date
  }

  // Navigate to the next month
  nextMonth(): void {
    this.currentDate.setMonth(this.currentDate.getMonth() + 1);
    // Add logic to update data based on the new date
  }
}
