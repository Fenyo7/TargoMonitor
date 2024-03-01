import { Component, EventEmitter, Input, Output } from '@angular/core';

export interface FilterOptions {
  sort: 'none' | 'asc' | 'desc';
  contains: string | null;
  select?: any[];
}

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent {
  @Input() columnKey: string = "";
  @Input() columnData: any[] = [];
  @Output() onFilterChange = new EventEmitter<FilterOptions>();

  filterCriteria: FilterOptions = {
    sort: 'none',
    contains: null,
    select: []
  };

  updateFilter(): void {
    this.onFilterChange.emit(this.filterCriteria);
  }
}
