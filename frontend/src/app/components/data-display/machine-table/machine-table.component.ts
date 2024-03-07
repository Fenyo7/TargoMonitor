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
    let filteredData = [...this.originalMachineData];

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

    this.machineData = filteredData;
  }
}
