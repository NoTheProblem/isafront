import { Component, OnInit } from '@angular/core';
import {EmployeeService} from '../services/employee.service';
import {PharmacyService} from '../services/pharmacy.service';
import {PharmacyModel} from '../model/pharmacy.model';
import {TokenStorageService} from '../_services/token-storage.service';
import {Router} from '@angular/router';
import {EmployeeModel} from '../model/employee.model';
import {PharmacyExaminationReportModel} from '../model/pharmacyExaminationReport.model';
import {GraphicReportService} from '../services/graphicReport.service';
import {PharmacyMedicineReportModel} from '../model/pharmacyMedicineReport.model';

@Component({
  selector: 'app-pharmacy-report',
  templateUrl: './pharmacy-report.component.html',
  styleUrls: ['./pharmacy-report.component.css']
})
export class PharmacyReportComponent implements OnInit {
  public pharmacy: PharmacyModel;
  public employees: Array<EmployeeModel>;
  textInput = '';
  data: PharmacyExaminationReportModel;
  medicineDate: PharmacyMedicineReportModel;
  reportType = '-- izaberite opciju --';
  showGrades = false;
  empType = '';
  showExaminationReport = false;
  showMedicineReport = false;
  showExaminationReportOptions = false;
  showMedicineReportOptions = false;
  showIncomeReportOptions = false;
  selectedDay: any;
  form: any = {};
  quartal: '';

  constructor(
    private employeeService: EmployeeService,
    private pharmacyService: PharmacyService,
    private tokenStorageService: TokenStorageService,
    private graphicReportService: GraphicReportService,
    private router: Router) { }

  ngOnInit(): void {
    if (this.tokenStorageService.permissionForPage('ROLE_ADMIN'))
    {
      this.router.navigate(['/error']);
      return;
    }
    this.pharmacyService.getPharmacyByAdmin().subscribe((pharmacy: PharmacyModel) => {
      this.pharmacy = pharmacy;
    });
  }

  showPharmaGradesFnc(): void {
    if (this.showGrades === true && this.empType === 'farmaceuta'){
      this.showGrades = false;
      return;
    }
    this.showGrades = true;
    this.empType = 'farmaceuta';
    this.employeeService.getAllPharmacistsByPharmacyID(this.pharmacy.id).subscribe((pharmacistList: Array<EmployeeModel>) => {
      this.employees = pharmacistList;
    });
  }

  showDermaGradesFnc(): void {
    if (this.showGrades === true && this.empType === 'dermatologa'){
      this.showGrades = false;
      return;
    }
    this.showGrades = true;
    this.empType = 'dermatologa';
    this.employeeService.getAllDermaByPharmacyID(this.pharmacy.id).subscribe((pharmacistList: Array<EmployeeModel>) => {
      this.employees = pharmacistList;
    });
  }
  generateMonthlyReportExamination(): void {
    this.textInput = 'Odrzani pregledi';
    this.reportType = 'Mesecni izvestaj za: ' + this.form.startDate;
    console.log(this.form.startDate.replace('-', '/'));
    this.graphicReportService.getDataForExaminationReportMonthly(this.form.startDate.replace('-', '/'))
      .subscribe((data: PharmacyExaminationReportModel) => {
        this.data = data;
        this.showExaminationReport = true;
      });
    this.showExaminationReportOptions = false;
  }

  generateQuartalReportExamination(): void {
    this.textInput = 'Odrzani pregledi';
    this.reportType = 'Kvartalni izvestaj za: ' + this.form.startDate;
    this.graphicReportService.getDataForExaminationReportQuartaly(this.form.startDate + '/' + this.quartal)
      .subscribe((data: PharmacyExaminationReportModel) => {
        this.data = data;
        this.showExaminationReport = true;
      });
    this.showExaminationReportOptions = false;

  }

  generateYearlyReportExamination(): void {
    this.textInput = 'Odrzani pregledi';
    this.reportType = 'Godisnji izvestaj za: ' + this.form.startDate;
    this.graphicReportService.getDataForExaminationReportYearly(this.form.startDate)
      .subscribe((data: PharmacyExaminationReportModel) => {
        this.data = data;
        console.log(data);
        this.showExaminationReport = true;
      });
    this.showExaminationReportOptions = false;
  }

  generateQuartalReportMedicine(): void {
    this.textInput = 'Odrzani pregledi';
    this.reportType = 'Kvartalni izvestaj za: ' + this.form.startDate;
    this.graphicReportService.getDataForMedicineReportQuartal(this.form.startDate + '/' + this.quartal)
      .subscribe((data: PharmacyMedicineReportModel) => {
        this.medicineDate = data;
        console.log(data);
        this.showMedicineReport = true;
      });
    this.showMedicineReportOptions = false;
  }

  generateYearlyReportMedicine(): void {
    this.textInput = 'Odrzani pregledi';
    this.reportType = 'Mesecni izvestaj za: ' + this.form.startDate;
    this.graphicReportService.getDataForMedicineReportYearly(this.form.startDate)
      .subscribe((data: PharmacyMedicineReportModel) => {
        this.medicineDate = data;
        console.log(data);
        this.showMedicineReport = true;
      });
    this.showMedicineReportOptions = false;
  }

  generateMonthlyReportMedicine(): void {
    this.textInput = 'Odrzani pregledi';
    this.reportType = 'Mesecni izvestaj za: ' + this.form.startDate;
    console.log(this.form.startDate.replace('-', '/'));
    this.graphicReportService.getDataForMedicineReportMonthly(this.form.startDate.replace('-', '/'))
      .subscribe((data: PharmacyMedicineReportModel) => {
        this.medicineDate = data;
        console.log(data);
        this.showMedicineReport = true;
      });
    this.showMedicineReportOptions = false;
  }

  generateIncomeReport(): void {
    this.textInput = 'Prihodi apoteke';
    this.reportType = 'Od ' + this.form.startDate + ' do ' + this.form.endDate;
    this.graphicReportService.getDataForIncomeReport(this.form.startDate, this.form.endDate)
      .subscribe((data: PharmacyExaminationReportModel) => {
        this.data = data;
        this.showExaminationReport = true;
      });
    this.showIncomeReportOptions = true;
  }
}
