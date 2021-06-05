import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AbsenceService} from './absence.service';
import {AppointmentService} from './appointment.service'
import {DermatologistService} from './dermatologist.service';
import {EmployeeService} from './employee.service';
import {ExaminationService} from './examination.service';
import {MedicineService} from './medicine.service';
import {OrderFormService} from './order-form.service';
import {PatientService} from './patient.service';
import {PromotionService} from './promotion.service';
import {PharmacyService} from './pharmacy.service';
import {CounselingComponent} from '../counseling/counseling.component';
import {MapService} from './map.service';
import {UserProfileService} from './userProfile.service';
import {GraphicReportService} from './graphicReport.service';


@NgModule({
  declarations: [],
  providers: [
    PharmacyService,
    MedicineService,
    DermatologistService,
    ExaminationService,
    CounselingComponent,
    MedicineService,
    PatientService,
    PromotionService,
    AbsenceService,
    EmployeeService,
    OrderFormService,
    AppointmentService,
    MapService,
    GraphicReportService,
    UserProfileService
  ],
  imports: [
    CommonModule
  ]
})
export class ServicesModule {
}
