import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClientService } from 'src/app/services/client.service';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.scss'],
})
export class AddClientComponent implements OnInit {
  clientForm!: FormGroup;
  hasContract: boolean = false;
  doNotify: boolean = false;

  constructor(private fb: FormBuilder, private clientService: ClientService) {}

  ngOnInit() {
    this.clientForm = this.fb.group({
      name: ['', Validators.required],
      address: ['', Validators.required],
    });
  }

  onToggle(field: 'hasContract' | 'doNotify') {
    this[field] = !this[field];
  }

  onSubmit() {
    if (this.clientForm.valid) {
      const clientData = {
        ...this.clientForm.value,
        hasContract: this.hasContract,
        doNotify: this.doNotify,
      };
      this.clientService.addClient(clientData).subscribe({
        next: (response) => console.log(response),
        error: (error) => console.error(error),
      });
    }
  }
}
