import { Component, Input } from '@angular/core';
import { TableColumn, TableRow } from '../client-table/client-table.component';
import { FilterOptions } from '../filter/filter.component';

@Component({
  selector: 'app-machine-table',
  templateUrl: './machine-table.component.html',
  styleUrls: ['./machine-table.component.scss']
})
export class MachineTableComponent {
  @Input() machineData: TableRow[] = [];
  originalMachineData: TableRow[] = [];
  activeFilters: { [key: string]: FilterOptions } = {};
  filterKey: string | null = null;
  filterName: string | null = null;
  existingFilter: FilterOptions = {
    contains: null,
    sort: 'none',
  };
  
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

  toggleFilterMenu(filterKey: string, event: MouseEvent): void {
    if (Object.keys(this.activeFilters).length === 0) {
      this.originalMachineData = this.machineData;
    }

    this.filterKey = this.filterKey === filterKey ? null : filterKey;
    this.existingFilter = this.activeFilters[filterKey];
    if (this.filterKey) {
      this.machineColumns.forEach((col) => {
        if (col.key === this.filterKey) {
          this.filterName = col.label;
        }
      });
    }
    event.stopPropagation();
  }
}
