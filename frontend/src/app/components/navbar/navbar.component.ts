import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  menuDropdownOpen: boolean = false;
  accountDropdownOpen: boolean = false;

  toggleMenuDropdown(): void {
    this.menuDropdownOpen = !this.menuDropdownOpen;
    this.accountDropdownOpen = false;
  }

  toggleAccountDropdown(): void {
    this.accountDropdownOpen = !this.accountDropdownOpen;
    this.menuDropdownOpen = false;
  }
}
