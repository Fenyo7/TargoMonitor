import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';

import { LoginComponent } from './components/front/login/login.component';
import { RegisterComponent } from './components/front/register/register.component';
import { LandingComponent } from './components/front/landing/landing.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { ClientTableComponent } from './components/data-display/client-table/client-table.component';
import { MachineTableComponent } from './components/data-display/machine-table/machine-table.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AddDataComponent } from './components/data-add/add-data/add-data.component';
import { AddClientComponent } from './components/data-add/add-client/add-client.component';
import { AddMachineComponent } from './components/data-add/add-machine/add-machine.component';

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
    MachineTableComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatCardModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
