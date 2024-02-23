import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  submitted = false;

  formFields = [
    { label: 'Email cím', controlName: 'email', type: 'email' },
    { label: 'Jelszó', controlName: 'password', type: 'password' }
  ];

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  onLogin() {
    this.submitted = true;
  
    if (this.loginForm.valid) {
      console.log(this.loginForm.value);
      // Handle login logic here
    } 
  }
  

  isFieldInvalid(controlName: string): boolean {
    const control = this.loginForm.get(controlName);
    return Boolean(control?.invalid && (control?.dirty || control?.touched));
  }

  getFieldLabel(controlName: string): string {
    if (this.isFieldInvalid(controlName) && this.submitted) {
      return `${this.formFields.find(field => field.controlName === controlName)?.label} kitöltése kötelező!`;
    }
    return this.formFields.find(field => field.controlName === controlName)?.label || '';
  }
}
