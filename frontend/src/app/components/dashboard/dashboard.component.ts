import { Component } from '@angular/core';
import { TableColumn, TableRow } from '../data-display/client-table/client-table.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  selectedTab = 1;
  currentDate = new Date();

  clientsData: TableRow[] = [
    {
      id: 1,
      name: 'Cégnév ide jön',
      address: 'Cég címe',
      numberOfMachines: 45,
      hasContract: false,
      doNotify: true,
    },
    {
      id: 2,
      name: 'Gémesi Kft.',
      address: 'Tatabánya, Szegfű u. 68.',
      numberOfMachines: 9,
      hasContract: true,
      doNotify: true,
    },
    {
      id: 3,
      name: 'Görözdi Kft.',
      address: 'Ács, Győri u. 29.',
      numberOfMachines: 4,
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
      numberOfMachines: 3,
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

  machinesData: TableRow[] = [
    {
      place: 'Tatabánya',
      usePlace: 'Üzemhely nemtom',
      isLifting: true,
      inventoryNum: 465542,
      name: 'Autódaru',
      brand: 'Pinguely TLM586',
      type: 'Tgk: MOL',
      factoryNum: 3031,
      manufactureYear: 2007,
      commissionDate: '2011.05.27.',
    },
    {
      place: 'Mucsaröcsöge',
      usePlace: 'Mucsaröcsöge alsó',
      isLifting: false,
      inventoryNum: 45682,
      name: 'Targonca',
      brand: 'Szép fajta',
      type: 'Cecse tipusu',
      factoryNum: 4592,
      manufactureYear: 2018,
      commissionDate: '2018.09.34.',
    },
    {
      place: 'Tatabánya',
      usePlace: 'Üzemhely nemtom',
      isLifting: true,
      inventoryNum: 465542,
      name: 'Autódaru',
      brand: 'Pinguely TLM586',
      type: 'Tgk: MOL',
      factoryNum: 3031,
      manufactureYear: 2007,
      commissionDate: '2011.05.27.',
    },
    {
      place: 'Mucsaröcsöge',
      usePlace: 'Mucsaröcsöge alsó',
      isLifting: false,
      inventoryNum: 45682,
      name: 'Targonca',
      brand: 'Szép fajta',
      type: 'Cecse tipusu',
      factoryNum: 4592,
      manufactureYear: 2018,
      commissionDate: '2018.09.34.',
    },
    {
      place: 'Tatabánya',
      usePlace: 'Üzemhely nemtom',
      isLifting: true,
      inventoryNum: 465542,
      name: 'Autódaru',
      brand: 'Pinguely TLM586',
      type: 'Tgk: MOL',
      factoryNum: 3031,
      manufactureYear: 2007,
      commissionDate: '2011.05.27.',
    },
    {
      place: 'Mucsaröcsöge',
      usePlace: 'Mucsaröcsöge alsó',
      isLifting: false,
      inventoryNum: 45682,
      name: 'Targonca',
      brand: 'Szép fajta',
      type: 'Cecse tipusu',
      factoryNum: 4592,
      manufactureYear: 2018,
      commissionDate: '2018.09.34.',
    },
    {
      place: 'Tatabánya',
      usePlace: 'Üzemhely nemtom',
      isLifting: true,
      inventoryNum: 465542,
      name: 'Autódaru',
      brand: 'Pinguely TLM586',
      type: 'Tgk: MOL',
      factoryNum: 3031,
      manufactureYear: 2007,
      commissionDate: '2011.05.27.',
    },
    {
      place: 'Mucsaröcsöge',
      usePlace: 'Mucsaröcsöge alsó',
      isLifting: false,
      inventoryNum: 45682,
      name: 'Targonca',
      brand: 'Szép fajta',
      type: 'Cecse tipusu',
      factoryNum: 4592,
      manufactureYear: 2018,
      commissionDate: '2018.09.34.',
    },
  ];

  monthlyMachinesData: TableRow[] = [
    {
      place: 'Tatabánya',
      usePlace: 'Üzemhely nemtom',
      isLifting: true,
      inventoryNum: 465542,
      name: 'Autódaru',
      brand: 'Pinguely TLM586',
      type: 'Tgk: MOL',
      factoryNum: 3031,
      manufactureYear: 2007,
      commissionDate: '2011.05.27.',
    },
    {
      place: 'Mucsaröcsöge',
      usePlace: 'Mucsaröcsöge alsó',
      isLifting: false,
      inventoryNum: 45682,
      name: 'Targonca',
      brand: 'Szép fajta',
      type: 'Cecse tipusu',
      factoryNum: 4592,
      manufactureYear: 2018,
      commissionDate: '2018.09.34.',
    },
  ];

  selectTab(tabIndex: number): void {
    this.selectedTab = tabIndex;
    // Update your data based on selected tab
    // This could involve fetching new data or filtering existing data
  }

  get formattedDate(): string {
    const options: Intl.DateTimeFormatOptions = { month: 'long', year: 'numeric' };
    return this.currentDate.toLocaleDateString('hu-HU', options).toUpperCase();
  }  

  previousMonth(): void {
    this.currentDate.setMonth(this.currentDate.getMonth() - 1);
    // Add logic to update data based on the new date
  }

  // Navigate to the next month
  nextMonth(): void {
    this.currentDate.setMonth(this.currentDate.getMonth() + 1);
    // Add logic to update data based on the new date
  }
}
