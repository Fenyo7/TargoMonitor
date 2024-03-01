import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

export interface FilterOptions {
  sort: 'none' | 'asc' | 'desc';
  contains: string | null;
}

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent {
  @Input() columnKey: string = "";
  @Output() onFilterChange = new EventEmitter<FilterOptions>();
  @Output() onClearFilter = new EventEmitter<FilterOptions>();

  filterForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.filterForm = this.fb.group({
      contains: [''],
      sort: ['none']
    });
  }

  updateFilter(): void {
    this.onFilterChange.emit(this.filterForm.value);
  }

  clearFilter(): void {
    this.onFilterChange.emit({ sort: 'none', contains: null});
    this.filterForm = this.fb.group({
      contains: [''],
      sort: ['none']
    });
  }
}
