import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {FooterComponent} from './footer/footer.component';
import {HeaderComponent} from './header/header.component';
import {AppRoutingModule} from './app-routing.module';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {HomeComponent} from './home/home.component';
import {PharmaciesComponent} from './pharmacies/pharmacies.component';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {ServicesModule} from './services/services.module';
import {MedicinesComponent} from './medicines/medicines.component';
import {Ng2SearchPipeModule} from 'ng2-search-filter';
import {UserProfileComponent} from './user-profile/user-profile.component';
import {Ng2OrderModule} from 'ng2-order-pipe';
import { ExaminationComponent } from './examination/examination.component';
import { CounselingComponent } from './counseling/counseling.component';
import {DlDateTimeDateModule, DlDateTimePickerModule} from 'angular-bootstrap-datetimepicker';
import {AuthInterceptor} from './_helpers/auth.interceptor';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ToastrModule} from 'ngx-toastr';
import {PharmacyComponent} from './pharmacy/pharmacy.component';
import { PromotionsComponent } from './promotions/promotions.component';
import { OrderFromsComponent } from './order-froms/order-froms.component';
import { PriceListComponent } from './price-list/price-list.component';
import { AbsencesComponent } from './absences/absences.component';
import { AppointmentDefComponent } from './appointment-def/appointment-def.component';
import { PharmacyMedicineComponent } from './pharmacy-medicine/pharmacy-medicine.component';
import { PharmacyEmployeesComponent } from './pharmacy-employees/pharmacy-employees.component';
import { PharmacyReportComponent } from './pharmacy-report/pharmacy-report.component';
import { PharmacyProfileComponent } from './pharmacy-profile/pharmacy-profile.component';
import { PharmacyDetailsComponent } from './pharmacy-details/pharmacy-details.component';
import { OrderdetailsComponent } from './orderdetails/orderdetails.component';
import { RegisterMedicineComponent } from './register-medicine/register-medicine.component';
import { RegisterPharmacyComponent } from './register-pharmacy/register-pharmacy.component';
import { MapComponent } from './map/map.component';
import { AngularYandexMapsModule , YaConfig} from 'angular8-yandex-maps';
import { DermatologistListComponent } from './dermatologist-list/dermatologist-list.component';
import { PharmacistListComponent } from './pharmacist-list/pharmacist-list.component';
import { PatientlistComponent } from './patientlist/patientlist.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import {MatDividerModule} from '@angular/material/divider';
import { HighchartsChartModule } from 'highcharts-angular';
import { GraphicalReportComponent } from './graphical-report/graphical-report.component';
import { GraphicalReportMedicineComponent } from './graphical-report-medicine/graphical-report-medicine.component';
import {RegisterEmployeeComponent} from './register-employee/register-employee.component';
import { AbsenceComponent } from './absence/absence.component';
import { ViewComplaintsComponent} from './view-complaints/view-complaints.component';
import { LoyaltyProgramComponent} from './loyalty-program/loyalty-program.component';
import {PreviousOffersComponent} from './previous-offers/previous-offers.component';
import {PurchaseOrderComponent} from './purchase-order/purchase-order.component';
import {SupplierUpdateComponent} from './supplier-update/supplier-update.component';

const mapConfig: YaConfig = {
  apikey: '3c15c704-3d48-482f-8f18-5aacd24c1975',
  lang: 'en_US',
};



@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    HomeComponent,
    PharmaciesComponent,
    LoginComponent,
    RegisterComponent,
    MedicinesComponent,
    SupplierUpdateComponent,
    UserProfileComponent,
    ExaminationComponent,
    CounselingComponent,
    UserProfileComponent,
    PharmacyComponent,
    PromotionsComponent,
    OrderFromsComponent,
    PriceListComponent,
    AbsencesComponent,
    AppointmentDefComponent,
    PharmacyMedicineComponent,
    PharmacyEmployeesComponent,
    PharmacyReportComponent,
    PharmacyProfileComponent,
    PharmacyDetailsComponent,
    OrderdetailsComponent,
    MapComponent,
    RegisterMedicineComponent,
    RegisterPharmacyComponent,
    RegisterEmployeeComponent,
    DermatologistListComponent,
    PharmacistListComponent,
    ErrorPageComponent,
    GraphicalReportComponent,
    GraphicalReportMedicineComponent,
    PharmacistListComponent,
    PatientlistComponent,
    AbsenceComponent,
    ViewComplaintsComponent,
    LoyaltyProgramComponent,
    PreviousOffersComponent,
    PurchaseOrderComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ServicesModule,
    FormsModule,
    Ng2SearchPipeModule,
    MatDividerModule,
    HighchartsChartModule,
    Ng2OrderModule,
    DlDateTimeDateModule,  // <--- Determines the data type of the model
    DlDateTimePickerModule,
    BrowserAnimationsModule,
    AngularYandexMapsModule.forRoot(mapConfig),
    ToastrModule.forRoot()
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
