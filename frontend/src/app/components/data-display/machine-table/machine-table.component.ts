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
    {key: 'clientId', label: 'clientId', type: 'hidden'},
    {key: 'machineId', label: 'machineId', type: 'hidden'},
    {key: 'clientName', label: 'Partner', type: 'text'},
    {key: 'addressCity', label: 'Tepelhely városa', type: 'text'},
    {key: 'addressStreet', label: 'Utca, házszám', type: 'text'},
    {key: 'usePlace', label: 'Üzemeltetés helye', type: 'text'},
    {key: 'name', label: 'Név', type: 'text'},
    {key: 'inventoryNumber', label: 'Leltári szám', type: 'text'},
    {key: 'factoryNum', label: 'Gyári szám', type: 'text'},
    {key: 'brand', label: 'Gyártmány', type: 'text'},
    {key: 'type', label: 'Típus', type: 'text'},
    {key: 'lastInspect', label: 'Utolsó vizsgálat', type: 'date'},
    {key: 'lastInspectType', label: '- jellege', type: 'text'},
    {key: 'nextInspect', label: 'Következő vizsgálat', type: 'date'},
    {key: 'nextInspectType', label: '- jellege', type: 'text'},
    {key: 'nextIBF', label: 'Következő IBF', type: 'date'},
    
  ];
}
