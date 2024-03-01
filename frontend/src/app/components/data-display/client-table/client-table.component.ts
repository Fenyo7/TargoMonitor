import { Component, Input, OnInit } from '@angular/core';
import { ClientService } from 'src/app/services/client.service';
import { ContactService } from 'src/app/services/contact.service';
import { FilterOptions } from '../filter/filter.component';

export interface TableColumn {
  key: string;
  label: string;
  type?: 'text' | 'number' | 'date' | 'bool' | 'hidden' | 'actions';
}

export interface TableRow {
  [key: string]: any;
}

@Component({
  selector: 'app-client-table',
  templateUrl: './client-table.component.html',
  styleUrls: ['./client-table.component.scss'],
})
export class ClientTableComponent implements OnInit {
  expandedRowId: number | null = null;
  contactRowId: number | null = null;
  contactData: any[] = [];
  selectedClientForContacts: string = '';
  filterKey: string | null = null;
  filterColumnData = [];

  @Input() clientData: TableRow[] = [];
  machineData: TableRow[] = [];

  clientColumns: TableColumn[] = [
    { key: 'clientId', label: 'ClientId', type: 'hidden' },
    { key: 'name', label: 'Név', type: 'text' },
    { key: 'address', label: 'Székhely', type: 'text' },
    { key: 'primaryContact', label: 'Elsődleges Kontakt Neve', type: 'text' },
    { key: 'contactPhone', label: 'Kontakt Telefonszáma', type: 'text' },
    { key: 'contactEmail', label: 'Kontakt Email címe', type: 'text' },
    { key: 'numberOfMachines', label: 'Gépek száma', type: 'number' },
    { key: 'hasContract', label: 'Szerződés', type: 'bool' },
    { key: 'doNotify', label: 'Értesítés', type: 'bool' },
    { key: 'actions', label: 'Akciógombok', type: 'actions' },
  ];

  constructor(
    private clientService: ClientService,
    private contactService: ContactService
  ) {}

  ngOnInit(): void {
    this.fetchClients();
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

  toggleRow(rowId: number): void {
    this.expandedRowId = this.expandedRowId === rowId ? null : rowId;
    console.log('toggled row: ' + this.expandedRowId);

    // Update machineData here
  }

  toggleContacts(row: TableRow): void {
    if (this.contactRowId === row['clientId']) {
      this.contactRowId = null;
      this.contactData = [];
    } else {
      this.contactRowId = row['clientId'];
      this.selectedClientForContacts = row['name'];

      this.contactService
        .getContactsOfClient(this.contactRowId as number)
        .subscribe({
          next: (contacts) => {
            this.contactData = contacts;
            console.log('Contacts fetched:', this.contactData);
          },
          error: (error) => console.error('Error fetching contacts:', error),
        });
    }
  }

  editRow(row: TableRow): void {
    console.log(`Edit ${row['name']}`);
  }

  addMachine(row: TableRow): void {
    console.log(`Add machine to ${row['name']}, id: ${row['clientId']}`);
  }

  openFilterMenu(filterKey: string): void {
    this.filterKey = this.filterKey === filterKey ? null : filterKey;
    this.filterColumnData = []; // Fill up with data of the selected column 
    console.log('filter open for ' + this.filterKey);
  }

  applyFilters(filterCriteria: FilterOptions, filterKey: string): void {
    let filteredData = [...this.clientData];
  
    if (filterCriteria.contains) {
      filteredData = filteredData.filter(row =>
        row[filterKey]?.toString().toLowerCase().includes(filterCriteria.contains?.toLowerCase())
      );
    }
  
    // TODO: Add sorting logic here based on filterCriteria.sort
  
    this.clientData = filteredData;
  }
}
