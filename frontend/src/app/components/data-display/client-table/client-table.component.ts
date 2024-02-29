import { Component, Input, OnInit } from '@angular/core';
import { ClientService } from 'src/app/services/client.service';

export interface TableColumn {
  key: string;
  label: string;
  type?: 'text' | 'number' | 'date' | 'bool' | 'hidden';
}

export interface TableRow {
  [key: string]: any;
}

@Component({
  selector: 'app-client-table',
  templateUrl: './client-table.component.html',
  styleUrls: ['./client-table.component.scss']
})
export class ClientTableComponent implements OnInit{
  expandedRowId: number | null = null;

  @Input() clientData: TableRow[] = [];
  machineData: TableRow[] = [];

  clientColumns: TableColumn[] = [
    { key: 'clientId', label: 'ClientId', type: 'hidden'},
    { key: 'name', label: 'Név', type: 'text' },
    { key: 'address', label: 'Székhely', type: 'text' },
    { key: 'primaryContact', label: 'Elsődleges Kontakt Neve', type: 'text'},
    { key: 'contactPhone', label: 'Kontakt Telefonszáma', type: 'text'},
    { key: 'contactEmail', label: 'Kontakt Email címe', type: 'text'},
    { key: 'numberOfMachines', label: 'Gépek száma', type: 'number'},
    { key: 'hasContract', label: 'Szerződés', type: 'bool' },
    { key: 'doNotify', label: 'Értesítés', type: 'bool' },
  ];

  constructor(private clientService: ClientService) { }
  ngOnInit(): void {
    this.fetchClients();
  }

  fetchClients(): void {
    this.clientService.getAllClients().subscribe({
      next: (clients) => {
        this.clientData = clients;
        console.log(this.clientData);
      },
      error: (error) => console.error(error)
    });
  }

  toggleRow(rowId: number): void {
    this.expandedRowId = this.expandedRowId === rowId ? null : rowId;
    console.log("toggled row: " + this.expandedRowId);

    // Update machineData here
  }

  contacts(rowId: number): void {
    console.log(`Contacts for ${rowId}. row`);
  }

  editRow(rowId: number): void {
    console.log(`Edit row ${rowId}`);
  }
}
