import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { AgentsComponent } from './agents/agents.component';
import { AllPropertiesComponent } from './all-properties/all-properties.component';
import { HomeComponent } from './home/home.component';
import { ProjectsComponent } from './projects/projects.component';
import { SubmitPropertyComponent } from './submit-property/submit-property.component';
import { PackageDetailsComponent } from './package-details/package-details.component';
import { PropertyBuyComponent } from './property-buy/property-buy.component';
import { PropertyRentComponent } from './property-rent/property-rent.component';
import { PropertyPgComponent } from './property-pg/property-pg.component';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { SalePropertyDetailsComponent } from './sale-property-details/sale-property-details.component';
import { NoDataFoundComponent } from './no-data-found/no-data-found.component';

const routes: Routes = [
  {
    path: 'dashboard', component: DashboardComponent ,
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'agents', component: AgentsComponent },
      { path: 'property', component: AllPropertiesComponent },
      { path: 'projects', component: ProjectsComponent },
      { path: 'submit', component: SubmitPropertyComponent },
      { path: 'packages', component: PackageDetailsComponent },
      { path: 'property-buy', component: PropertyBuyComponent },
      { path: 'property-rent', component: PropertyRentComponent },
      { path: 'property-pg', component: PropertyPgComponent },
      { path: 'my-profile', component: MyProfileComponent },
      { path: 'sale-property-details', component: SalePropertyDetailsComponent },
      { path: 'no-data-found', component: NoDataFoundComponent }     
    ]
  },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: '/dashboard/home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
