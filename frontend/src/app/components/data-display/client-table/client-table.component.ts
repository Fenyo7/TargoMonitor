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
    {data: 'Valami adat', num: 3},
    {data: 'még egy kis adat', num: 9},
    {data: 'csak hogy biztosra menjünk', num: 11}
  ];

  toggleRow(rowId: number | null): void {
    this.expandedRowId = this.expandedRowId === rowId ? null : rowId;
    console.log("toggled row: " + this.expandedRowId);

    // Update machineData here
  }
}
