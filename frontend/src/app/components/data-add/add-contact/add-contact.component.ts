import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, combineLatest, map, startWith } from 'rxjs';
import { Client } from 'src/app/models/client.model';
import { ClientService } from 'src/app/services/client.service';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.scss'],
})
export class AddContactComponent implements OnInit {
  contactForm!: FormGroup;
  isPrimary: boolean = true;

  clients$!: Observable<Client[]>;
  filteredClients$!: Observable<Client[]>;

  constructor(
    private fb: FormBuilder,
    private contactService: ContactService,
    private clientService: ClientService
  ) {}

  ngOnInit() {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      position: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', Validators.required],
      client: [''],
    });

    this.clients$ = this.clientService.getAllClients();

    this.filteredClients$ = combineLatest([
      this.clients$,
      this.contactForm.get('client')!.valueChanges.pipe(
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

  onToggle(field: 'isPrimary') {
    this[field] = !this[field];
  }

  displayClientName(client?: Client): string {
    return client ? client.name : '';
  }

  onSubmit() {
    if (this.contactForm.valid) {
      const selectedClient = this.contactForm.value.client as Client;

      const contactData = {
        clientId: selectedClient.clientId,
        isPrimary: this.isPrimary,
        ...this.contactForm.value,
      };
      this.contactService.addContact(contactData).subscribe({
        next: (response) => console.log(response),
        error: (error) => console.error(error),
      });
    }
  }
}
