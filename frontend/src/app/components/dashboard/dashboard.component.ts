import { Component } from '@angular/core';
import { TableColumn, TableRow } from '../data-display/client-table/client-table.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  selectedTab = 1;

  columns: TableColumn[] = [
    { key: 'name', label: 'Név', type: 'text' },
    { key: 'address', label: 'Cím', type: 'text' },
    { key: 'hasContract', label: 'Szerződés', type: 'bool' },
    { key: 'doNotify', label: 'Értesítés', type: 'bool' },
  ];

  data: TableRow[] = [
    {
      id: 1,
      name: 'Cégnév ide jön',
      address: 'Cég címe',
      hasContract: false,
      doNotify: true,
    },
    {
      id: 2,
      name: 'Gémesi Kft.',
      address: 'Tatabánya, Szegfű u. 68.',
      hasContract: true,
      doNotify: true,
    },
    {
      id: 3,
      name: 'Görözdi Kft.',
      address: 'Ács, Győri u. 29.',
      hasContract: false,
      doNotify: false,
    },
    {
      id: 1,
      name: 'Cégnév ide jön',
      address: 'Cég címe',
      hasContract: false,
      doNotify: true,
    },
    {
      id: 2,
      name: 'Gémesi Kft.',
      address: 'Tatabánya, Szegfű u. 68.',
      hasContract: true,
      doNotify: true,
    },
    {
      id: 3,
      name: 'Görözdi Kft.',
      address: 'Ács, Győri u. 29.',
      hasContract: false,
      doNotify: false,
    },
    {
      id: 1,
      name: 'Cégnév ide jön',
      address: 'Cég címe',
      hasContract: false,
      doNotify: true,
    },
    {
      id: 2,
      name: 'Gémesi Kft.',
      address: 'Tatabánya, Szegfű u. 68.',
      hasContract: true,
      doNotify: true,
    },
    {
      id: 3,
      name: 'Görözdi Kft.',
      address: 'Ács, Győri u. 29.',
      hasContract: false,
      doNotify: false,
    },
    {
      id: 1,
      name: 'Cégnév ide jön',
      address: 'Cég címe',
      hasContract: false,
      doNotify: true,
    },
    {
      id: 2,
      name: 'Gémesi Kft.',
      address: 'Tatabánya, Szegfű u. 68.',
      hasContract: true,
      doNotify: true,
    },
    {
      id: 3,
      name: 'Görözdi Kft.',
      address: 'Ács, Győri u. 29.',
      hasContract: false,
      doNotify: false,
    },
    {
      id: 1,
      name: 'Cégnév ide jön',
      address: 'Cég címe',
      hasContract: false,
      doNotify: true,
    },
    {
      id: 2,
      name: 'Gémesi Kft.',
      address: 'Tatabánya, Szegfű u. 68.',
      hasContract: true,
      doNotify: true,
    },
    {
      id: 3,
      name: 'Görözdi Kft.',
      address: 'Ács, Győri u. 29.',
      hasContract: false,
      doNotify: false,
    },
    {
      id: 1,
      name: 'Cégnév ide jön',
      address: 'Cég címe',
      hasContract: false,
      doNotify: true,
    },
    {
      id: 2,
      name: 'Gémesi Kft.',
      address: 'Tatabánya, Szegfű u. 68.',
      hasContract: true,
      doNotify: true,
    },
    {
      id: 3,
      name: 'Görözdi Kft.',
      address: 'Ács, Győri u. 29.',
      hasContract: false,
      doNotify: false,
    },
    {
      id: 1,
      name: 'Cégnév ide jön',
      address: 'Cég címe',
      hasContract: false,
      doNotify: true,
    },
    {
      id: 2,
      name: 'Gémesi Kft.',
      address: 'Tatabánya, Szegfű u. 68.',
      hasContract: true,
      doNotify: true,
    },
    {
      id: 3,
      name: 'Görözdi Kft.',
      address: 'Ács, Győri u. 29.',
      hasContract: false,
      doNotify: false,
    },
    {
      id: 1,
      name: 'Cégnév ide jön',
      address: 'Cég címe',
      hasContract: false,
      doNotify: true,
    },
    {
      id: 2,
      name: 'Gémesi Kft.',
      address: 'Tatabánya, Szegfű u. 68.',
      hasContract: true,
      doNotify: true,
    },
    {
      id: 3,
      name: 'Görözdi Kft.',
      address: 'Ács, Győri u. 29.',
      hasContract: false,
      doNotify: false,
    },
    {
      id: 1,
      name: 'Cégnév ide jön',
      address: 'Cég címe',
      hasContract: false,
      doNotify: true,
    },
    {
      id: 2,
      name: 'Gémesi Kft.',
      address: 'Tatabánya, Szegfű u. 68.',
      hasContract: true,
      doNotify: true,
    },
    {
      id: 3,
      name: 'Görözdi Kft.',
      address: 'Ács, Győri u. 29.',
      hasContract: false,
      doNotify: false,
    },
    {
      id: 1,
      name: 'Cégnév ide jön',
      address: 'Cég címe',
      hasContract: false,
      doNotify: true,
    },
    {
      id: 2,
      name: 'Gémesi Kft.',
      address: 'Tatabánya, Szegfű u. 68.',
      hasContract: true,
      doNotify: true,
    },
    {
      id: 3,
      name: 'Görözdi Kft.',
      address: 'Ács, Győri u. 29.',
      hasContract: false,
      doNotify: false,
    },
    {
      id: 1,
      name: 'Cégnév ide jön',
      address: 'Cég címe',
      hasContract: false,
      doNotify: true,
    },
    {
      id: 2,
      name: 'Gémesi Kft.',
      address: 'Tatabánya, Szegfű u. 68.',
      hasContract: true,
      doNotify: true,
    },
    {
      id: 3,
      name: 'Görözdi Kft.',
      address: 'Ács, Győri u. 29.',
      hasContract: false,
      doNotify: false,
    },
  ];

  selectTab(tabIndex: number): void {
    this.selectedTab = tabIndex;
    // Update your data based on selected tab
    // This could involve fetching new data or filtering existing data
  }
}
