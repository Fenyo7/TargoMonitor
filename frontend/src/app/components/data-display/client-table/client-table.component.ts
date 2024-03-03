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
  filterName: string | null = null;

  originalClientData: TableRow[] = [];
  clientData: TableRow[] = [];
  machineData: TableRow[] = [];
  activeFilters: { [key: string]: FilterOptions } = {};
  existingFilter: FilterOptions = {
    contains: null,
    sort: 'none'
  }

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
        this.originalClientData = clients.map(
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
        this.clientData = this.originalClientData;
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

  closeContact(): void {
    this.contactRowId = null;
    this.contactData = [];
  }

  editRow(row: TableRow): void {
    console.log(`Edit ${row['name']}`);
  }

  addMachine(row: TableRow): void {
    console.log(`Add machine to ${row['name']}, id: ${row['clientId']}`);
  }

  toggleFilterMenu(filterKey: string, event: MouseEvent): void {
    this.filterKey = this.filterKey === filterKey ? null : filterKey;
    this.existingFilter = this.activeFilters[filterKey];
    if(this.filterKey) {
      this.clientColumns.forEach(col => {
        if (col.key === this.filterKey) {
          this.filterName = col.label;
        }
      });
    }
    event.stopPropagation();
  }

  closeFilter(): void {
    if(this.filterKey !== null) {
      this.filterKey = null;
    }
  }

  clearFilter(filterKey: string): void {
    delete this.activeFilters[filterKey];
    this.applyAllFilters();
  }  

  applyFilter(filterCriteria: FilterOptions): void {
    if (this.filterKey) {
      if (filterCriteria.contains || filterCriteria.sort !== 'none') {
        this.activeFilters[this.filterKey] = filterCriteria;
      } else {
        delete this.activeFilters[this.filterKey]; // Remove filter if criteria are essentially 'empty'
      }
      this.applyAllFilters();
    }
  }

  applyAllFilters(): void {
    let filteredData = [...this.originalClientData];

    Object.keys(this.activeFilters).forEach((key) => {
      const filter = this.activeFilters[key];
      if (filter.contains) {
        filteredData = filteredData.filter((row) =>
          row[key]
            ?.toString()
            .toLowerCase()
            .includes(filter.contains?.toLowerCase())
        );
      }
      // Add more conditions based on other types of filters like 'sort'
    });

    this.clientData = filteredData;
  }
}
