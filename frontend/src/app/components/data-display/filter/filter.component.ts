import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

export interface FilterOptions {
  sort: 'none' | 'asc' | 'desc';
  contains: string | null;
}

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})
export class FilterComponent implements OnChanges {
  @Input() columnKey: string = '';
  @Input() columnName: string | null = '';
  @Input() existingFilter: FilterOptions = {
    contains: null,
    sort: 'none',
  };
  @Output() onFilterChange = new EventEmitter<FilterOptions>();
  @Output() onClearFilter = new EventEmitter<FilterOptions>();

  filterForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.filterForm = this.fb.group({
      contains: '',
      sort: 'none',
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['existingFilter'] && this.existingFilter) {
      this.filterForm.setValue({
        contains: this.existingFilter.contains || '',
        sort: this.existingFilter.sort || 'none'
      });
    }
  }

  updateFilter(): void {
    this.onFilterChange.emit(this.filterForm.value);
  }

  clearFilter(): void {
    this.onFilterChange.emit({ sort: 'none', contains: null });
    this.filterForm = this.fb.group({
      contains: '',
      sort: ['none'],
    });
  }

  toggleSort(direction: 'asc' | 'desc'): void {
    const currentDirection = this.filterForm.get('sort')?.value;

    let newDirection = 'none';
    if(currentDirection !== direction) {
      newDirection = direction;
    }

    this.filterForm.get('sort')?.setValue(newDirection);
  }
}
