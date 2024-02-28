import { Component, Input } from '@angular/core';
import { TableColumn, TableRow } from '../client-table/client-table.component';

@Component({
  selector: 'app-machine-table',
  templateUrl: './machine-table.component.html',
  styleUrls: ['./machine-table.component.scss']
})
export class MachineTableComponent {
  @Input() machineData: TableRow[] = [];
  
  machineColumns: TableColumn[] = [
    {key: 'data', label: 'Adat', type: 'text'},
    {key: 'num', label: 'Szám', type: 'number'},
  ];
}
