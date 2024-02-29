import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-contact-display',
  templateUrl: './contact-display.component.html',
  styleUrls: ['./contact-display.component.scss']
})
export class ContactDisplayComponent {
  @Input() contactData: any = null;
  @Input() clientName: string = "";
}
