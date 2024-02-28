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
    {key: 'place', label: 'Telephely', type: 'text'},
    {key: 'usePlace', label: 'Üzemeltetés helye', type: 'text'},
    {key: 'inventoryNum', label: 'Leltári Szám', type: 'text'},
    {key: 'name', label: 'Név', type: 'text'},
    {key: 'brand', label: 'Gyártmány', type: 'text'},
    {key: 'type', label: 'Típus', type: 'text'},
    {key: 'factoryNum', label: 'Gyári szám', type: 'text'},
    {key: 'manufactureYear', label: 'Gyártás éve', type: 'text'},
    {key: 'commissionDate', label: 'Üzembehelyezés ideje', type: 'text'},
    {key: 'isLifting', label: 'Emelőgép?', type: 'bool'},
  ];
}
