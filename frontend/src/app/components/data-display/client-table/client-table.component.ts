import { Component, EventEmitter, Input, Output } from '@angular/core';

export interface TableColumn {
  key: string;
  label: string;
  type?: 'text' | 'number' | 'date' | 'bool';
}

export interface TableRow {
  [key: string]: any;
}

@Component({
  selector: 'app-client-table',
  templateUrl: './client-table.component.html',
  styleUrls: ['./client-table.component.scss']
})
export class ClientTableComponent {
  expandedRowId: number | null = null;

  @Input() clientData: TableRow[] = [];

  clientColumns: TableColumn[] = [
    { key: 'name', label: 'Név', type: 'text' },
    { key: 'address', label: 'Cím', type: 'text' },
    { key: 'hasContract', label: 'Szerződés', type: 'bool' },
    { key: 'doNotify', label: 'Értesítés', type: 'bool' },
  ];

  machineData: TableRow[] = [
    {
      place: 'Tatabánya',
      usePlace: 'Üzemhely nemtom',
      isLifting: true,
      inventoryNum: 465542,
      name: 'Autódaru',
      brand: 'Pinguely TLM586',
      type: 'Tgk: MOL',
      factoryNum: 3031,
      manufactureYear: 2007,
      commissionDate: '2011.05.27.',
    },
    {
      place: 'Mucsaröcsöge',
      usePlace: 'Mucsaröcsöge alsó',
      isLifting: false,
      inventoryNum: 45682,
      name: 'Targonca',
      brand: 'Szép fajta',
      type: 'Cecse tipusu',
      factoryNum: 4592,
      manufactureYear: 2018,
      commissionDate: '2018.09.34.',
    },
  ];

  toggleRow(rowId: number | null): void {
    this.expandedRowId = this.expandedRowId === rowId ? null : rowId;
    console.log("toggled row: " + this.expandedRowId);

    // Update machineData here
  }
}
