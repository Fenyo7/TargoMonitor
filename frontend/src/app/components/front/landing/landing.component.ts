import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {
  constructor( 
    private router: Router,
    ) { }

  ngOnInit(): void {
    let token = localStorage.getItem('token');
    if(token) {
      //this.router.navigate(['/dashboard']);
    }
  }
  showLogin: boolean = true;

  toggleForm() {
    this.showLogin = !this.showLogin;
  }
}

