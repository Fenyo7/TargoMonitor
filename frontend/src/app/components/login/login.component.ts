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
  
    if (!this.loginForm.valid) {
      return;
    }

    
  }
  
  isFieldInvalid(controlName: string): boolean {
    const control = this.loginForm.get(controlName);
    return this.submitted && control?.invalid ? true : false;
  }

  getFieldLabel(controlName: string): string {
    if (!this.submitted) return this.formFields.find(field => field.controlName === controlName)?.label || '';

    const control = this.loginForm.get(controlName);
    
    if (control?.errors) {
      if (control.errors['required']) {
        return `${this.formFields.find(field => field.controlName === controlName)?.label} kitöltése kötelező`;
      }
      if (control.errors['email']) {
        return 'Érvénytelen email formátum';
      }
    }
    return this.formFields.find(field => field.controlName === controlName)?.label || '';
  }
}
