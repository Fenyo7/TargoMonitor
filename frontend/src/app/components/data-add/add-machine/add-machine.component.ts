import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Observable, combineLatest, map, startWith } from 'rxjs';
import { Client } from 'src/app/models/client.model';
import { ClientService } from 'src/app/services/client.service';
@Component({
  selector: 'app-add-machine',
  templateUrl: './add-machine.component.html',
  styleUrls: ['./add-machine.component.scss'],
})
export class AddMachineComponent implements OnInit {
  machineForm!: FormGroup;

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

  clients$!: Observable<Client[]>;
  filteredClients$!: Observable<Client[]>;
  isLifting: boolean = false;
  isDangerous: boolean = false;

  typeOptions = [
    'Daru',
    'Önjáró daruk és rakodódaruk',
    'Targonca',
    'Körülkerített emelőterű emelő',
    'Toronydaru',
    'Mozgó munkaállvány',
    'Járműre szerelt emelőgép',
    'Járműemelő',
    'Emelőasztal',
    'Kézi emelőeszköz',
    'Rakodógép (nem emelőgép)',
    'Kotrógép (nem emelőgép)',
    'Kézi béka',
    'Függesztő eszköz',
    'Adapter',
    'Bak',
    'Egyéb',
  ];

  daruOptions = [
    'Híddaru',
    'Futómacska',
    'Bakdaru',
    'Oszlopos / konzolos forgódaru',
    'Emelődob'
  ];

  darulancOptions = [
    'Sodronyköteles',
    'Láncos'
  ];

  onjaroOptions = [
    'Autódaru',
    'Pókdaru',
    'Rakodódaru (járműre szerelt)',
    'Földmunkagép daru üzemben'
  ];

  targoncaOptions = [
    'Vezetőüléses',
    'Gyalogkíséretű',
    'Vezetőállásos',
    'Kommissiózó'
  ];

  targoncameghajtOptions = [
    'Elektromos',
    'Diesel / Benzin',
    'Gázüzemű'
  ];

  vezetoulesOptions = [
    'Homlokvillás',
    'Oldalvillás',
    'Tolóoszlopos',
    'Változtatható kinyúlású',
    'Rakodógép targonca üzemmódban'
  ];

  mozgomunkaOptions = [
    'Ollós',
    'Karos',
    'Oszlopos',
    'Rakodógép személyemelő üzemmódban'
  ];

  mozgomeghajtOptions = [
    'Elektromos',
    'Diesel'
  ];

  jarmureszereltOptions = [
    'Emelőhátfal',
    'Konténeremelő / multilift',
    'Billencs (nem emelőgép)',
    'Egyéb'
  ];

  emeloasztalOptions = [
    'Helyhez kötött',
    'Mobil'
  ];

  adapterOptions = [
    'Targoncához',
    'Daruhoz'
  ];

  jarmuemeloOptions = [
    'Kétoszlopos',
    'Négyoszlopos',
    'Padlóemelő',
    'Aknaperememelő',
    'Kézi',
    'Egyéb'
  ];

  jarmuemelomeghajtOptions = [
    'Kézi',
    'Pneumatikus',
    'Elektromos'
  ]

  kezijarmuemeloOptions = [
    'Krokodil',
    'Motorkiemelő (zsiráf)',
    'Olajemelő'
  ]

  keziemeloOptions = [
    'Kézi magasemelésű targonca',
    'Kézi csörlő',
    'Egyéb'
  ];

  constructor(
    private fb: FormBuilder,
    // private machineService: MachineService,
    private clientService: ClientService
  ) {}

  ngOnInit() {
    this.machineForm = this.fb.group({
      addressCity: ['', Validators.required],
      addressStreet: ['', Validators.required],
      addressNumber: ['', Validators.required],
      usePlace: [''],
      inventoryNumber: ['', Validators.required],
      brand: ['', Validators.required],
      type: ['', Validators.required],
      factoryNumber: ['', Validators.required],
      manufactureYear: [''],
      commissionDate: ['', Validators.required],
      note: [''],
      client: [''],
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
  }

  displayClientName(client?: Client): string {
    return client ? client.name : '';
  }

  onToggle(field: 'isDangerous' | 'isLifting') {
    this[field] = !this[field];
  }

  onSubmit() {
    // Form submission logic
  }
}
