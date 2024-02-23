import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { loginDTO } from 'src/app/models/DTOs/login.dto';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  submitted = false;
  failedLogin = false;
  errorMessage = "";

  formFields = [
    { label: 'Email cím', controlName: 'email', type: 'email' },
    { label: 'Jelszó', controlName: 'password', type: 'password' }
  ];

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService
    ) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  onLogin() {
    this.submitted = true;
    this.failedLogin = false;
    this.errorMessage = "";
  
    if (!this.loginForm.valid) {
      return;
    }

    const userData: loginDTO = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password,
    }

    this.authService.login(userData).subscribe(
      (response: any) => {
        console.log('success!\n');
      },
      (error: any) => {
        this.failedLogin = true;
        
        if(error.status === 404) {
          this.errorMessage = "Ehhez az email címhez nem tartozik felhasználó.";
        } else if (error.status === 401) {
          this.errorMessage = "Hibás jelszó.";
        } else if (error.status === 400) {
          this.errorMessage = "Hiba történt bejelentkezéskor, kérjük próbálja meg később.";
        } else {
          this.errorMessage = "Váratlan hiba történt, kérjük próbálja meg később.";
        }
        console.error(error.message);
      }
    )
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
