import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { registerDTO } from 'src/app/models/DTOs/register.dto';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  submitted = false;
  failedLogin = false;
  errorMessage = "";

  formFields = [
    { label: 'Email cím', controlName: 'email', type: 'email' },
    { label: 'Felhasználónév', controlName: 'name', type: 'text' },
    { label: 'Jelszó', controlName: 'password', type: 'password' },
    { label: 'Jelszó megerősítés', controlName: 'confirmPassword', type: 'password' },
  ];

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService
    ) {}

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      name: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8), Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/)]],
      confirmPassword: ['', Validators.required],
    });
  }

  onRegister(): void {
    this.submitted = true;
    this.failedLogin = false;
    this.errorMessage = "";

    if (!this.isPasswordMatching()) {
      this.registerForm.get('confirmPassword')?.setErrors({ 'notMatching': true });
      return;
    }
    if (!this.registerForm.valid) {
      return;
    }

    const userData: registerDTO = {
      email: this.registerForm.value.email,
      username: this.registerForm.value.name,
      password: this.registerForm.value.password,
    };

    this.authService.register(userData).subscribe(
      (response: any) => {
        console.log('success!\n' + response.message);
      },
      (error: any) => {
        this.failedLogin = true;

        if (error.status === 400) {
          this.errorMessage = "Ez az email cím vagy felhasználónév már foglalt.";
          console.log(error.message);
        }
      }
    )
  }

  getFieldLabel(controlName: string): string {
    if (!this.submitted) return this.formFields.find(field => field.controlName === controlName)?.label || '';

    const control = this.registerForm.get(controlName);
    if (controlName === 'confirmPassword' && !this.isPasswordMatching()) {
      return 'A jelszavak nem egyeznek';
    }
    if (control?.errors) {
      if (control.errors['required']) {
        return `${this.formFields.find(field => field.controlName === controlName)?.label} kitöltése kötelező`;
      }
      if (control.errors['email']) {
        return 'Érvénytelen email formátum';
      }
      if (control.errors['minlength']) {
        return 'A jelszónak legalább 8 karakter hosszúnak kell lennie';
      }
      if (control.errors['pattern']) {
        return 'A jelszónak tartalmaznia kell kis- és nagybetűket, valamint számokat';
      }
    }
    return this.formFields.find(field => field.controlName === controlName)?.label || '';
  }

  isFieldInvalid(controlName: string): boolean {
    const control = this.registerForm.get(controlName);
    //return this.submitted && control?.invalid ? true : false;
    return this.submitted && (control?.invalid || (controlName === 'confirmPassword' && !this.isPasswordMatching()));
  }

  isPasswordMatching(): boolean {
    const password = this.registerForm.get('password')?.value;
    const confirmPassword = this.registerForm.get('confirmPassword')?.value;
    return password === confirmPassword;
  }
}
