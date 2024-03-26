import { Component } from '@angular/core';

@Component({
  selector: 'app-add-data',
  templateUrl: './add-data.component.html',
  styleUrls: ['./add-data.component.scss']
})
export class AddDataComponent {
  selectedTab: number = 1;

  selectTab(tab: number): void {
    this.selectedTab = tab;
  }
}
