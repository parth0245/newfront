import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MyDatePickerModule } from 'mydatepicker';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TopHeaderComponent } from './top-header/top-header.component';
import { BottomHeaderComponent } from './bottom-header/bottom-header.component';
import { PropertyListComponent } from './property-list/property-list.component';
import { RegisterComponent } from './register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { AgentsComponent } from './agents/agents.component';
import { AllPropertiesComponent } from './all-properties/all-properties.component';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';
import { ProjectsComponent } from './projects/projects.component';
import { SubmitPropertyComponent } from './submit-property/submit-property.component';
import { PackageDetailsComponent } from './package-details/package-details.component';
import { OwenerPropertySubmitComponent } from './owener-property-submit/owener-property-submit.component';
import { AllServiceService } from './services/all-service.service';
import { AuthInterceptor } from './services/auth.interceptor';
import { LoaderService } from './services/loader.service';
import { BootstrapModalModule } from 'ng2-bootstrap-modal';
import { MessageModalComponent } from './modals/message-modal/message-modal.component';
import { PropertyServices } from './services/property.service';
import { PropertyBuyComponent } from './property-buy/property-buy.component';
import { PropertyRentComponent } from './property-rent/property-rent.component';
import { PropertyPgComponent } from './property-pg/property-pg.component';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { SalePropertyDetailsComponent } from './sale-property-details/sale-property-details.component';
import { NoDataFoundComponent } from './no-data-found/no-data-found.component';
import { LoginModalComponent } from './modals/login-modal/login-modal.component';
import { ContactOwnerComponent } from './modals/contact-owner/contact-owner.component';


@NgModule({
  declarations: [
    AppComponent,
    TopHeaderComponent,
    BottomHeaderComponent,
    PropertyListComponent,
    RegisterComponent,
    DashboardComponent,
    LoginComponent,
    AgentsComponent,
    AllPropertiesComponent,
    HomeComponent,
    FooterComponent,
    ProjectsComponent,
    SubmitPropertyComponent,
    PackageDetailsComponent,
    OwenerPropertySubmitComponent,
    MessageModalComponent,
    PropertyBuyComponent,
    PropertyRentComponent,
    PropertyPgComponent,
    MyProfileComponent,
    SalePropertyDetailsComponent,
    NoDataFoundComponent,
    LoginModalComponent,
    ContactOwnerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BootstrapModalModule.forRoot({container:document.body}),
    ReactiveFormsModule,
    MyDatePickerModule 
   ],
  providers: [AllServiceService ,PropertyServices , {
    provide:HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi:true
  } , LoaderService],
  entryComponents: [
    MessageModalComponent,LoginModalComponent,ContactOwnerComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
