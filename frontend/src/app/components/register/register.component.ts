import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      name: ['', [Validators.required]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]]
    }, { validator: matchingPasswordsValidator('password', 'confirmPassword') });    
  }

  onRegister() {
    console.log('Registering with the following details:');
      Object.keys(this.registerForm.value).forEach(key => {
        console.log(`${key}: ${this.registerForm.value[key]}`);
      });
  }

  formFields = [
    { label: 'Email cím', controlName: 'email', type: 'email' },
    { label: 'Felhasználónév', controlName: 'name', type: 'text' },
    { label: 'Jelszó', controlName: 'password', type: 'password' },
    { label: 'Jelszó megerősítése', controlName: 'confirmPassword', type: 'password' }
  ];

  isFieldInvalid(controlName: string): boolean {
    const control = this.registerForm.get(controlName);
    return Boolean(control?.invalid && (control?.dirty || control?.touched));
  }

  getFieldLabel(controlName: string): string {
    if (this.isFieldInvalid(controlName)) {
      if(controlName === 'confirmPassword' && !this.isPasswordMatching()){
        return 'Jelszavak nem egyeznek!'
      }
      return `${this.formFields.find(field => field.controlName === controlName)?.label} kötelező!`;
    }
    return this.formFields.find(field => field.controlName === controlName)?.label || '';
  }

  isPasswordMatching(): boolean {
    const password = this.registerForm.get('password')?.value;
    const confirmPassword = this.registerForm.get('confirmPassword')?.value;

    return password === confirmPassword;
  }
}

export function matchingPasswordsValidator(controlName: string, matchingControlName: string) {
  return (formGroup: FormGroup) => {
    const control = formGroup.controls[controlName];
    const matchingControl = formGroup.controls[matchingControlName];

    if (matchingControl.errors && !matchingControl.errors['matchingPasswords']) {
      return;
    }

    if (control.value !== matchingControl.value) {
      matchingControl.setErrors({ matchingPasswords: true });
    } else {
      matchingControl.setErrors(null);
    }
  };
}