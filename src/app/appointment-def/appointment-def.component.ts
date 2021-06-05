import { Component, OnInit } from '@angular/core';
import {DermatologistModel} from '../model/dermatologist.model';
import {AppointmentService} from '../services/appointment.service';
import {ExaminationModel} from '../model/examination.model';
import {WorkingHoursModel} from '../model/workingHours.model';
import {TokenStorageService} from '../_services/token-storage.service';
import {ExaminationService} from '../services/examination.service';
import {AbsenceModel} from '../model/absence.model';
import {AbsenceService} from '../services/absence.service';


@Component({
  selector: 'app-appointment-def',
  templateUrl: './appointment-def.component.html',
  styleUrls: ['./appointment-def.component.css']
})
export class AppointmentDefComponent implements OnInit {
  private dermatoligists: Array<DermatologistModel>;
  private derma: DermatologistModel;
  private workingHours: WorkingHoursModel;
  private examinations: Array<ExaminationModel> = new Array<ExaminationModel>();
  private examinationsBackUp: Array<ExaminationModel> = new Array<ExaminationModel>();
  private examination: ExaminationModel;
  private examinationDateInput: Date;
  private wd = '';
  public absences: Array<AbsenceModel>;


  showWorkDayError = false;
  show = true;
  showAppointments = false;
  showMake = false;
  form: any = {};
  private x: Date;
  private y: Date;
  showNoAbsence = false;
  showAbsence = false;


  constructor(private appointmentService: AppointmentService,
              private tokenStorageService: TokenStorageService,
              private absenceService: AbsenceService,
              private examinationService: ExaminationService
  ) { }

  ngOnInit(): void {
    this.appointmentService.getDermaForPhaAdmin().subscribe((dermatoligists: Array<DermatologistModel>) => {
      this.dermatoligists = dermatoligists;
    });
  }

  openDerma(der: DermatologistModel): void {
    this.showNoAbsence = false;
    this.showAbsence = false;
    this.show = false;
    this.derma = der;
    this.workingHours = this.getMyWorkingHours(der.workingHours);
    this.absenceService.getAbsenceByEmpID(this.derma.id).subscribe((absences: Array<AbsenceModel>) => {
      this.absences = absences;
      if (absences.length !== 0 ){
        this.showAbsence = true;
      }
      else {
        this.showNoAbsence = true;
      }
    });
    return;
  }

  getMyWorkingHours(workingHoursModels: Array<WorkingHoursModel>): WorkingHoursModel{
    return workingHoursModels.pop();
  }

  showExaminations(form): void {
    this.showAppointments = false;
    this.showWorkDayError = false;
    this.y = new Date(form.examinationDateInput);
    if (!this.checkIfWorkingDay(this.y.getDay())){
      this.showWorkDayError = true;
      return;
    }
    // tslint:disable-next-line:max-line-length
    this.examinationService.getExaminationsForDermatologistByDateForPhaAdmin(this.derma, this.form.examinationDateInput).subscribe((examinations: Array<ExaminationModel>) => {
      this.examinations = examinations;
    });
    this.showAppointments = true;

  }

  checkIfWorkingDay(day: number): boolean{
    this.wd = this.workingHours.workDay;
    switch (this.wd) {
      case 'Svaki dan':
        return true;
      case 'Vikend':
        return day === 0 || day === 6;
      case 'Ponedeljak':
        return day === 1;
      case 'Utorak':
        return day === 2;
      case 'Sreda':
        return day === 3;
      case 'Cetvrtak':
        return day === 4;
      case 'Petak':
        return day === 5;
      case 'Subota':
        return day === 6;
      case 'Nedelja':
        return day === 0;
      case 'Radni dan':
        return day !== 0 && day !== 6;
      default:
        return false;
    }
  }

   createAppointment(form: any): void {
    this.examination = new ExaminationModel(0, false, false, '', 0, undefined, undefined, 0, 0, 0, 0, '', '', '', undefined, undefined);
    this.examination.date = new Date();
    this.examination.date = form.examinationDateInput;
    this.examination.durationMinutes = form.duration;
    this.examination.price = form.price;
    this.examination.time = form.startTime;
    this.examination.dermatologistId = this.derma.id;
    this.examinationService.addExamination(this.examination);

  }

}

