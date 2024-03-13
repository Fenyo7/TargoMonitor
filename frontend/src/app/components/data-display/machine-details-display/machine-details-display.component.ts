import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-machine-details-display',
  templateUrl: './machine-details-display.component.html',
  styleUrls: ['./machine-details-display.component.scss']
})
export class MachineDetailsDisplayComponent {
  @Input() machine: any = null;
}
