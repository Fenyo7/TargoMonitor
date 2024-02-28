import { Component } from '@angular/core';

@Component({
  selector: 'app-add-data',
  templateUrl: './add-data.component.html',
  styleUrls: ['./add-data.component.scss']
})
export class AddDataComponent {
  addClient: boolean = true;

  toggleForm() {
    this.addClient = !this.addClient;
  }
}
