import { Component, OnInit } from '@angular/core';
import {
  TableColumn,
  TableRow,
} from '../data-display/client-table/client-table.component';
import { ClientService } from 'src/app/services/client.service';
import { MachineService } from 'src/app/services/machine.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  selectedTab = 1;
  currentDate = new Date();

  clientData: TableRow[] = [];

  machineData: TableRow[] = [];

  monthlyMachinesData: TableRow[] = [];

  constructor(
    private clientService: ClientService,
    private machineService: MachineService
  ) {}

  ngOnInit(): void {
    this.selectTab(1);
  }

  fetchClients(): void {
    this.clientService.getAllClients().subscribe({
      next: (clients) => {
        this.clientData = clients.map(
          (client: {
            clientId: any;
            name: any;
            address: any;
            primaryContact: { name: any; phone: any; email: any };
            hasContract: any;
            doNotify: any;
            billingEmail: any;
          }) => ({
            clientId: client.clientId,
            name: client.name,
            address: client.address,
            primaryContact: client.primaryContact?.name || '',
            contactPhone: client.primaryContact?.phone || '',
            contactEmail: client.primaryContact?.email || '',
            billingEmail: client.billingEmail || '',
            hasContract: client.hasContract ? true : false,
            doNotify: client.doNotify ? true : false,
          })
        );
      },
      error: (error) => console.error(error),
    });
  }

  fetchMachines(): void {
    this.machineService.getAllMachines().subscribe({
      next: (machines) => {
        this.machineData = machines.map(
          (machine: {
            clientId: any;
            clientName: any;
            machineId: any;
            addressCity: any;
            addressStreet: any;
            usePlace: any;
            isDangerous: any;
            isLifting: any;
            inventoryNumber: any;
            factoryNumber: any;
            kind: any;
            name: any;
            brand: any;
            type: any;
            manufactureYear: any;
            commissionDate: any;
            lastMainInsDate: any;
            note: any;

            licenseNumber?: string;
            adapterName?: string;
            controlMode?: string;
            vehicleType?: string;
            liftHeight?: string;
            ropeDiam?: string;
            console?: string;
            weight?: string;
            power?: string;
            chain?: string;
            load?: string;
            span?: string;
            rope?: string;
            bend?: string;
          }) => ({
            clientId: machine.clientId,
            clientName: machine.clientName,
            machineId: machine.machineId,
            addressCity: machine.addressCity,
            addressStreet: machine.addressStreet,
            usePlace: machine.usePlace,
            isDangerous: machine.isDangerous,
            isLifting: machine.isLifting,
            inventoryNumber: machine.inventoryNumber,
            factoryNumber: machine.factoryNumber,
            kind: machine.kind,
            name: machine.name,
            brand: machine.brand,
            type: machine.type,
            manufactureYear: machine.manufactureYear,
            commissionDate: machine.commissionDate,
            lastInspect: machine.lastMainInsDate,
            note: machine.note,

            licenseNumber:  machine.licenseNumber,
            adapterName:  machine.name,
            controlMode: machine.controlMode,
            vehicleType:  machine.vehicleType,
            liftHeight:  machine.liftHeight,
            ropeDiam:  machine.ropeDiam,
            console: machine.console,
            weight:  machine.weight,
            power: machine.power,
            chain:  machine.chain,
            load:  machine.load,
            span: machine.span,
            rope:  machine.rope,
            bend:  machine.bend,
          })
        );
      },
      error: (error) => console.error(error),
    });
  }

  selectTab(tabIndex: number): void {
    this.selectedTab = tabIndex;

    if (tabIndex === 1) {
      this.fetchClients();
    }

    if (tabIndex === 2) {
      this.fetchMachines();
    }
  }

  get formattedDate(): string {
    const options: Intl.DateTimeFormatOptions = {
      month: 'long',
      year: 'numeric',
    };
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
