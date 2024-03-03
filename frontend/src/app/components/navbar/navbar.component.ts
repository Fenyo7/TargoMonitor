import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  menuDropdownOpen: boolean = false;
  accountDropdownOpen: boolean = false;

  constructor(private router: Router) {}

  toggleMenuDropdown(): void {
    this.menuDropdownOpen = !this.menuDropdownOpen;
    this.accountDropdownOpen = false;
  }

  toggleAccountDropdown(): void {
    this.accountDropdownOpen = !this.accountDropdownOpen;
    this.menuDropdownOpen = false;
  }

  clickOutAccount(): void {
    this.accountDropdownOpen = false;
  }

  clickOutMenu(): void {
    this.menuDropdownOpen = false;
  }
}
