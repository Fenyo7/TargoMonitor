import { Component, OnInit } from '@angular/core';
import { TableColumn, TableRow } from '../data-display/client-table/client-table.component';
import { ClientService } from 'src/app/services/client.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit{
  selectedTab = 1;
  currentDate = new Date();

  clientData: TableRow[] = [];

  machinesData: TableRow[] = [];

  monthlyMachinesData: TableRow[] = [];

  constructor(
    private clientService: ClientService
    ) {}

  ngOnInit(): void {
    this.selectTab(1);
  }

  fetchClients(): void {
    this.clientService.getAllClients().subscribe({
      next: (clients) => {
        this.clientData = clients.map(
          (client: {
            clientId: any;
            name: any;
            address: any;
            primaryContact: { name: any; phone: any; email: any };
            hasContract: any;
            doNotify: any;
          }) => ({
            clientId: client.clientId,
            name: client.name,
            address: client.address,
            primaryContact: client.primaryContact?.name || '',
            contactPhone: client.primaryContact?.phone || '',
            contactEmail: client.primaryContact?.email || '',
            hasContract: client.hasContract ? true : false,
            doNotify: client.doNotify ? true : false,
          })
        );
      },
      error: (error) => console.error(error),
    });
  }

  selectTab(tabIndex: number): void {
    this.selectedTab = tabIndex;
    
    if(tabIndex === 1) {
      this.fetchClients();
    }
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
