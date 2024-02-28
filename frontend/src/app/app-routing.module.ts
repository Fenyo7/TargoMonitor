import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './components/front/landing/landing.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AddDataComponent } from './components/add/add-data/add-data.component';

const routes: Routes = [
  { path: '', component: LandingComponent},
  { path: 'dashboard', component: DashboardComponent},
  { path: 'add-data', component: AddDataComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
