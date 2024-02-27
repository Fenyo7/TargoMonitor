import { Component, Input } from '@angular/core';

export interface TableColumn {
  key: string;
  label: string;
  type?: 'text' | 'number' | 'date' | 'bool';
}

export interface TableRow {
  [key: string]: any;
}

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent {
  expandedRowId: number | null = null;

  @Input() clientColumns: TableColumn[] = [];
  @Input() clientData: TableRow[] = [];

  machineColumns: TableColumn[] = [
    {key: 'data', label: 'Adat', type: 'text'},
    {key: 'num', label: 'Szám', type: 'number'},
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
