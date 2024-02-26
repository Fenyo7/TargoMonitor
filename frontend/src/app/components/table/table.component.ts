import { Component, Input } from '@angular/core';

// Interface for column definitions
export interface TableColumn {
  key: string; // key of the data object
  label: string; // display name for the column header
  type?: 'text' | 'number' | 'date' | 'bool'; // additional types can be added as needed
  // Add more properties for customization (e.g., format, width)
}

// Interface for table data
export interface TableRow {
  [key: string]: any; // key-value pairs matching the column definitions
}

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent {
  @Input() clientColumns: TableColumn[] = [];
  @Input() clientData: TableRow[] = [];
}
