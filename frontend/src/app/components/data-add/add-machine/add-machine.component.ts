import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Observable, combineLatest, map, startWith } from 'rxjs';
import { addMachineDTO } from 'src/app/models/DTOs/addMachine.dto';
import { Client } from 'src/app/models/client.model';
import { ClientService } from 'src/app/services/client.service';
import { MachineService } from 'src/app/services/machine.service';

@Component({
  selector: 'app-add-machine',
  templateUrl: './add-machine.component.html',
  styleUrls: ['./add-machine.component.scss'],
})
export class AddMachineComponent implements OnInit {
  machineForm!: FormGroup;
  dataTableForm!: FormGroup;
  inspectGroupNumberControl = new FormControl('');

  typeFormControl = new FormControl('');

  daruControl = new FormControl('');
  darulancControl = new FormControl('');
  onjaroControl = new FormControl('');
  targoncaControl = new FormControl('');
  targoncameghajtControl = new FormControl('');
  vezetoulesControl = new FormControl('');
  mozgomunkaControl = new FormControl('');
  mozgomeghajtControl = new FormControl('');
  jarmureszereltControl = new FormControl('');
  emeloasztalControl = new FormControl('');
  adapterControl = new FormControl('');
  jarmuemeloControl = new FormControl('');
  jarmuemelomeghajtControl = new FormControl('');
  kezijarmuemeloControl = new FormControl('');
  keziemeloControl = new FormControl('');
  vezerlesControl = new FormControl('');

  clients$!: Observable<Client[]>;
  filteredClients$!: Observable<Client[]>;
  isLifting: boolean = false;
  isDangerous: boolean = false;

  inspectGroupNumberOptions = [1, 2, 3, 4, 5];

  typeOptions = [
    'Egyéb',
    'Daru',
    'Önjáró daru / rakodódaru',
    'Targonca',
    'Körülkerített emelőterű emelő',
    'Toronydaru',
    'Mozgó munkaállvány / Kosaras személyemelő',
    'Járműre szerelt emelőgép',
    'Járműemelő',
    'Emelőasztal',
    'Kézi emelőeszköz',
    'Rakodógép (nem emelőgép)',
    'Kotrógép (nem emelőgép)',
    'Kézi béka',
    'Függesztő eszköz',
    'Szintkiegyenlítő (rámpa)',
    'Adapter',
    'Bak',
  ];

  daruOptions = [
    'Híddaru',
    'Futómacska',
    'Bakdaru',
    'Oszlopos / konzolos forgódaru',
    'Emelődob',
  ];

  darulancOptions = ['Sodronyköteles', 'Láncos'];

  onjaroOptions = [
    'Autódaru',
    'Pókdaru',
    'Rakodódaru (járműre szerelt)',
    'Földmunkagép daru üzemben',
  ];

  targoncaOptions = [
    'Vezetőüléses',
    'Gyalogkíséretű',
    'Vezetőállásos',
    'Kommissiózó',
  ];

  targoncameghajtOptions = ['Elektromos', 'Diesel / Benzin', 'Gázüzemű'];

  vezetoulesOptions = [
    'Homlokvillás',
    'Oldalvillás',
    'Tolóoszlopos',
    'Változtatható kinyúlású',
    'Rakodógép targonca üzemmódban',
  ];

  mozgomunkaOptions = [
    'Ollós',
    'Karos',
    'Oszlopos',
    'Rakodógép személyemelő üzemmódban',
  ];

  mozgomeghajtOptions = ['Elektromos', 'Diesel'];

  jarmureszereltOptions = [
    'Egyéb',
    'Emelőhátfal',
    'Konténeremelő / multilift',
    'Billencs (nem emelőgép)',
    'Járműre szerelt szerelőkosár',
    'Trailer',
    'Hulladékszállító jármű',
  ];

  emeloasztalOptions = ['Helyhez kötött', 'Mobil'];

  adapterOptions = ['Targoncához', 'Daruhoz'];

  jarmuemeloOptions = [
    'Egyéb',
    'Kétoszlopos',
    'Négyoszlopos',
    'Padlóemelő',
    'Aknaperememelő',
    'Kézi',
  ];

  jarmuemelomeghajtOptions = ['Kézi', 'Pneumatikus', 'Elektromos'];

  kezijarmuemeloOptions = ['Krokodil', 'Motorkiemelő (zsiráf)', 'Olajemelő'];

  keziemeloOptions = [
    'Egyéb',
    'Kézi magasemelésű targonca',
    'Kézi csörlő',
    'Emelőasztal',
  ];

  vezerlesOptions = ['Talajról vezérelt', 'Rádió távvezérlés'];

  constructor(
    private fb: FormBuilder,
    private machineService: MachineService,
    private clientService: ClientService,
  ) {}

  ngOnInit() {
    this.machineForm = this.fb.group({
      addressCity: ['', Validators.required],
      addressStreet: ['', Validators.required],
      usePlace: [''],
      inventoryNumber: [''],
      brand: [''],
      type: [''],
      factoryNumber: [''],
      manufactureYear: new FormControl(),
      commissionDate: new FormControl(),
      note: [''],
      client: [''],
    });

    this.dataTableForm = this.fb.group({
      licenseNumber: [''],
      adapterName: [''],
      controlMode: [''],
      vehicleType: [''],
      liftHeight: [''],
      ropeDiam: [''],
      console: [''],
      weight: [''],
      power: [''],
      chain: [''],
      load: [''],
      span: [''],
      rope: [''],
      bend: [''],
    });

    this.clients$ = this.clientService.getAllClients();

    this.filteredClients$ = combineLatest([
      this.clients$,
      this.machineForm.get('client')!.valueChanges.pipe(
        startWith(''),
        map((value) => (typeof value === 'object' ? value.name : value))
      ),
    ]).pipe(
      map(([clients, search]) =>
        clients.filter((client) =>
          client.name.toLowerCase().includes(search.toLowerCase())
        )
      )
    );

    this.typeFormControl.valueChanges.subscribe((_) => {
      this.typeChange();
    });
  }

  displayClientName(client?: Client): string {
    return client ? client.name : '';
  }

  onToggle(field: 'isDangerous' | 'isLifting') {
    this[field] = !this[field];

    if (this.isLifting) this.isDangerous = true;
  }

  typeChange(): void {
    this.dataTableForm = this.fb.group({
      licenseNumber: [''],
      adapterName: [''],
      controlMode: [''],
      vehicleType: [''],
      liftHeight: [''],
      ropeDiam: [''],
      console: [''],
      weight: [''],
      power: [''],
      chain: [''],
      load: [''],
      span: [''],
      rope: [''],
      bend: [''],
    });
  }

  private generateCodePortion(
    control: FormControl,
    options: string[]
  ): string | null {
    const value = control.value;
    if (!value) return null;

    const index = options.indexOf(value);
    if (index === -1) return null;

    return index < 10 ? `0${index}` : `${index}`;
  }

  generateCode(): string | null {
    let code: string = '';
    let typeCode = 0;
    if (this.typeFormControl.value) {
      typeCode = this.typeOptions.indexOf(this.typeFormControl.value);
      if (typeCode / 10 < 1) {
        code += `0${typeCode}.`;
      } else {
        code += typeCode + '.';
      }
    } else return null;

    switch (typeCode) {
      case 1: {
        // Daru
        let daruCode = 0;
        if (this.daruControl.value) {
          daruCode = this.daruOptions.indexOf(this.daruControl.value);
          if (daruCode / 10 < 1) {
            code += `0${daruCode}.`;
          } else {
            code += daruCode + '.';
          }
        } else return null;

        let darulancCode = 0;
        if (this.darulancControl.value) {
          darulancCode = this.darulancOptions.indexOf(
            this.darulancControl.value
          );
          if (darulancCode / 10 < 1) {
            code += `0${darulancCode}.`;
          } else {
            code += darulancCode + '.';
          }
        } else return null;
        break;
      }
      case 2: {
        // Önjáró daru / rakodódaru
        let onjaroCode = 0;
        if (this.onjaroControl.value) {
          onjaroCode = this.onjaroOptions.indexOf(this.onjaroControl.value);
          if (onjaroCode / 10 < 1) {
            code += `0${onjaroCode}.`;
          } else {
            code += onjaroCode + '.';
          }
        } else return null;
        break;
      }
      case 3: {
        // Targonca
        let targoncameghajtCode = 0;
        if (this.targoncameghajtControl.value) {
          targoncameghajtCode = this.targoncameghajtOptions.indexOf(
            this.targoncameghajtControl.value
          );
          if (targoncameghajtCode / 10 < 1) {
            code += `0${targoncameghajtCode}.`;
          } else {
            code += targoncameghajtCode + '.';
          }
        } else return null;

        let targoncaCode = 0;
        if (this.targoncaControl.value) {
          targoncaCode = this.targoncaOptions.indexOf(
            this.targoncaControl.value
          );
          if (targoncaCode / 10 < 1) {
            code += `0${targoncaCode}.`;
          } else {
            code += targoncaCode + '.';
          }
        } else return null;

        let vezetoulesCode = 0;
        if (targoncaCode === 0) {
          if (this.vezetoulesControl.value) {
            vezetoulesCode = this.vezetoulesOptions.indexOf(
              this.vezetoulesControl.value
            );
            if (vezetoulesCode / 10 < 1) {
              code += `0${vezetoulesCode}.`;
            } else {
              code += vezetoulesCode + '.';
            }
          } else return null;
        }
        break;
      }
      case 7: {
        // Járműre szerelt emelőgép
        let jarmureszereltCode = 0;
        if (this.jarmureszereltControl.value) {
          jarmureszereltCode = this.jarmureszereltOptions.indexOf(
            this.jarmureszereltControl.value
          );
          if (jarmureszereltCode / 10 < 1) {
            code += `0${jarmureszereltCode}.`;
          } else {
            code += jarmureszereltCode + '.';
          }
        } else return null;
        break;
      }
      case 8: {
        // Járműemelő
        let jarmuemelomeghajtCode = 0;
        if (this.jarmuemelomeghajtControl.value) {
          jarmuemelomeghajtCode = this.jarmuemelomeghajtOptions.indexOf(
            this.jarmuemelomeghajtControl.value
          );
          if (jarmuemelomeghajtCode / 10 < 1) {
            code += `0${jarmuemelomeghajtCode}.`;
          } else {
            code += jarmuemelomeghajtCode + '.';
          }
        } else return null;

        let jarmuemeloCode = 0;
        if (this.jarmuemeloControl.value) {
          jarmuemeloCode = this.jarmuemeloOptions.indexOf(
            this.jarmuemeloControl.value
          );
          if (jarmuemeloCode / 10 < 1) {
            code += `0${jarmuemeloCode}.`;
          } else {
            code += jarmuemeloCode + '.';
          }
        } else return null;

        let keziemeloCode = 0;
        if (jarmuemeloCode === 6) {
          if (this.kezijarmuemeloControl.value) {
            keziemeloCode = this.kezijarmuemeloOptions.indexOf(
              this.kezijarmuemeloControl.value
            );
            if (keziemeloCode / 10 < 1) {
              code += `0${keziemeloCode}.`;
            } else {
              code += keziemeloCode + '.';
            }
          } else return null;
        }
        break;
      }
      case 9: {
        // Emelőasztal
        let emeloasztalCode = 0;
        if (this.emeloasztalControl.value) {
          emeloasztalCode = this.emeloasztalOptions.indexOf(
            this.emeloasztalControl.value
          );
          if (emeloasztalCode / 10 < 1) {
            code += `0${emeloasztalCode}.`;
          } else {
            code += emeloasztalCode + '.';
          }
        } else return null;
        break;
      }
      case 10: {
        // Kézi emelőeszköz
        let keziemeloCode = 0;
        if (this.keziemeloControl.value) {
          keziemeloCode = this.keziemeloOptions.indexOf(
            this.keziemeloControl.value
          );
          if (keziemeloCode / 10 < 1) {
            code += `0${keziemeloCode}.`;
          } else {
            code += keziemeloCode + '.';
          }
        } else return null;
        break;
      }
      case 15: {
        // Adapter
        let adapcerCode = 0;
        if (this.adapterControl.value) {
          adapcerCode = this.adapterOptions.indexOf(this.adapterControl.value);
          if (adapcerCode / 10 < 1) {
            code += `0${adapcerCode}.`;
          } else {
            code += adapcerCode + '.';
          }
        } else return null;
        break;
      }
    }

    return code;
  }

  generateName(code: string): string {
    return `${code}`;
  }

  onSubmit() {
    const code = this.generateCode();
    let name = '';
    if (code) {
      name = this.generateName(code);
    }

    if (this.machineForm.valid) {
      const selectedClient = this.machineForm.value.client as Client;

      const machineData: addMachineDTO = {
        clientId: selectedClient.clientId,
        kind: code,
        name: name,
        ...this.machineForm.value,
        ...this.dataTableForm.value,
        commissionDate: new Date(Date.now()),
        isDangerous: this.isDangerous,
        isLifting: this.isLifting,
      };
      console.log(machineData);
      this.machineService.addMachine(machineData).subscribe({
        next: (response) => console.log(response),
        error: (error) => console.log(error),
      });
    }
  }
}
