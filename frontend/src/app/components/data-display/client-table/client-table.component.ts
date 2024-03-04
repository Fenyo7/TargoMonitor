import { Component, Input, OnInit } from '@angular/core';
import { ClientService } from 'src/app/services/client.service';
import { ContactService } from 'src/app/services/contact.service';
import { FilterOptions } from '../filter/filter.component';
import { empty } from 'rxjs';

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
export class ClientTableComponent {
  expandedRowId: number | null = null;
  contactRowId: number | null = null;
  contactData: any[] = [];
  selectedClientForContacts: string = '';
  filterKey: string | null = null;
  filterName: string | null = null;

  originalClientData: TableRow[] = [];
  @Input() clientData: TableRow[] = [];
  machineData: TableRow[] = [];
  activeFilters: { [key: string]: FilterOptions } = {};
  existingFilter: FilterOptions = {
    contains: null,
    sort: 'none',
  };

  clientColumns: TableColumn[] = [
    { key: 'clientId', label: 'ClientId', type: 'hidden' },
    { key: 'name', label: 'Név', type: 'text' },
    { key: 'address', label: 'Székhely', type: 'text' },
    { key: 'primaryContact', label: 'Kapcsolattartó', type: 'text' },
    { key: 'contactPhone', label: 'Kapcs. Telefonszáma', type: 'text' },
    { key: 'contactEmail', label: 'Kapcs. Email címe', type: 'text' },
    { key: 'billingEmail', label: 'Számlázási email', type: 'text' },
    { key: 'numberOfMachines', label: 'Gépek száma', type: 'number' },
    { key: 'hasContract', label: 'Szerződés', type: 'bool' },
    { key: 'doNotify', label: 'Értesítés', type: 'bool' },
    { key: 'actions', label: 'Akciógombok', type: 'actions' },
  ];

  constructor(private contactService: ContactService) {}

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
    if (Object.keys(this.activeFilters).length === 0) {
      this.originalClientData = this.clientData;
    }

    this.filterKey = this.filterKey === filterKey ? null : filterKey;
    this.existingFilter = this.activeFilters[filterKey];
    if (this.filterKey) {
      this.clientColumns.forEach((col) => {
        if (col.key === this.filterKey) {
          this.filterName = col.label;
        }
      });
    }
    event.stopPropagation();
  }

  closeFilter(): void {
    if (this.filterKey !== null) {
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
        delete this.activeFilters[this.filterKey];
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
    });

    const sortKey = Object.keys(this.activeFilters).find(
      (key) =>
        this.activeFilters[key].sort === 'asc' ||
        this.activeFilters[key].sort === 'desc'
    );

    if (sortKey) {
      const sortCriteria = this.activeFilters[sortKey].sort;
      filteredData.sort((a, b) => {
        let valA = a[sortKey],
          valB = b[sortKey];

        if (!isNaN(parseFloat(valA)) && !isNaN(parseFloat(valB))) {
          valA = parseFloat(valA);
          valB = parseFloat(valB);
        } else {
          valA = valA?.toString().toLowerCase();
          valB = valB?.toString().toLowerCase();
        }

        if (sortCriteria === 'asc') {
          return valA > valB ? 1 : valA < valB ? -1 : 0;
        } else {
          return valA < valB ? 1 : valA > valB ? -1 : 0;
        }
      });
    }

    this.clientData = filteredData;
  }
}
