import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';

import { LoginComponent } from './components/front/login/login.component';
import { RegisterComponent } from './components/front/register/register.component';
import { LandingComponent } from './components/front/landing/landing.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ClientTableComponent } from './components/data-display/client-table/client-table.component';
import { MachineTableComponent } from './components/data-display/machine-table/machine-table.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AddDataComponent } from './components/data-add/add-data/add-data.component';
import { AddClientComponent } from './components/data-add/add-client/add-client.component';
import { AddMachineComponent } from './components/data-add/add-machine/add-machine.component';
import { JwtInterceptor } from './interceptors/jwt.interceptor';
import { AddContactComponent } from './components/data-add/add-contact/add-contact.component';
import { ContactDisplayComponent } from './components/data-display/contact-display/contact-display.component';
import { FilterComponent } from './components/data-display/filter/filter.component';
import { ClickOutsideDirective } from './click-outside.directive';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    LandingComponent,
    ClientTableComponent,
    DashboardComponent,
    NavbarComponent,
    AddDataComponent,
    AddClientComponent,
    AddMachineComponent,
    MachineTableComponent,
    AddContactComponent,
    ContactDisplayComponent,
    FilterComponent,
    ClickOutsideDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatCardModule,
    HttpClientModule,
    MatAutocompleteModule,
    MatInputModule,
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },],
  bootstrap: [AppComponent]
})
export class AppModule { }
