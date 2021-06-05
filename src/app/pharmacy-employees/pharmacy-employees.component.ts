import { Component, OnInit } from '@angular/core';
import {EmployeeModel} from '../model/employee.model';
import {EmployeeService} from '../services/employee.service';
import {PharmacyModel} from '../model/pharmacy.model';
import {PharmacyService} from '../services/pharmacy.service';
import {DermatologistModel} from '../model/dermatologist.model';
import {PharmacistModel} from '../model/pharmacist.model';
import {WorkingHoursModel} from '../model/workingHours.model';
import {WorkingHoursPharmacist} from '../model/workingHoursPharmacist';
import {newArray} from '@angular/compiler/src/util';

@Component({
  selector: 'app-pharmacy-employees',
  templateUrl: './pharmacy-employees.component.html',
  styleUrls: ['./pharmacy-employees.component.css']
})
export class PharmacyEmployeesComponent implements OnInit {
  private employees: Array<EmployeeModel>;
  public employeesBackUp: Array<EmployeeModel>;
  public pharmacy: PharmacyModel;
  public dermatologists: Array<DermatologistModel>;
  public dermatologist: DermatologistModel;
  public pharmacists: Array<PharmacistModel>;
  public pharmacist: PharmacistModel;
  public workingHoursDer: WorkingHoursModel;
  public workingHoursPha: WorkingHoursPharmacist;
  public workingHoursDermatologist: Array<WorkingHoursModel>;
  showMessageNoDerma = false;
  showRegisterNewPharma = false;
  showMessageNoPharma = false;
  showAddDerma = false;
  defineWO = false;
  showAddPharma = false;
  buttonPress = false;
  showDermaAddingWO = false;
  naziv: string;
  reverse = false;
  key = '';
  searchTerm: string;
  term: string;
  lowerGrade = 0;
  name = '';
  form: any = {};
  selectedDay: '';
  workingHoursEmpty = false;


  constructor(
    private employeeService: EmployeeService,
    private pharmacyService: PharmacyService) { }

  ngOnInit(): void {
    this.pharmacyService.getPharmacyByAdmin().subscribe((pharmacy: PharmacyModel) => {
      this.pharmacy = pharmacy;
    });
    this.employees = new Array<EmployeeModel>();
  }


  phaList(): void {
    if (this.buttonPress === true && this.naziv === 'Farmaceuti'){
      this.buttonPress = false;
      return;
    }
    this.naziv = 'Farmaceuti';
    this.buttonPress = true;
    this.employeeService.getAllPharmacistsByPharmacyID(this.pharmacy.id).subscribe((pharmacistList: Array<EmployeeModel>) => {
      this.employees = pharmacistList;
    });
    this.employeesBackUp = this.employees;
  }

  dermaList(): void{
    if (this.buttonPress === true && this.naziv === 'Dermatolozi'){
      this.buttonPress = false;
      return;
    }
    this.naziv = 'Dermatolozi';
    this.buttonPress = true;
    this.employeeService.getAllDermaByPharmacyID(this.pharmacy.id).subscribe((dermaList: Array<EmployeeModel>) => {
      this.employees = dermaList;
    });
    this.employeesBackUp = this.employees;

  }

  public sort(key): void {
    this.key = key;
    this.reverse = !this.reverse;
  }

  public search(): void {
    if (this.name === '') {
      this.employees = this.employeesBackUp;
    } else {
      this.employees = this.employees.filter(res => {
        return (
          res.firstName.toLocaleLowerCase().match(this.name.toLocaleLowerCase()) ||
          res.lastName.toLocaleLowerCase().match(this.name.toLocaleLowerCase()) ||
          (res.firstName + ' ' + res.lastName).toLocaleLowerCase().match(this.name.toLocaleLowerCase()) ||
          (res.lastName + ' ' + res.firstName).toLocaleLowerCase().match(this.name.toLocaleLowerCase())
        );
      });

    }
  }

  public filterEvaluationGrade(): void {
    if (this.lowerGrade === 0) {
      this.ngOnInit();
    } else {
      this.employees = this.employees.filter(res => {
        return (
          res.evaluationGrade >= Number(this.lowerGrade)
        );
      });
    }
  }

  addPharmacist(): void{
    this.showMessageNoPharma = false;
    this.showAddPharma = !this.showAddPharma;
    if (!this.showAddPharma){
      return;
    }
    this.employeeService.getAllFreePharmacists().subscribe((models: Array<PharmacistModel>) => {
      if (models.length === 0){
        this.showMessageNoPharma = true;
        return;
      }
      this.pharmacists = models;
    });
  }


  addDermatologist(): void {
    this.showMessageNoDerma = false;
    this.showAddDerma = !this.showAddDerma;
    if (!this.showAddDerma){
      return;
    }
    this.employeeService.getAllDermatologistsCandidates().subscribe((dermas: Array<DermatologistModel>) => {
      if (dermas.length === 0){
        this.showMessageNoDerma = true;
        return;
      }
      this.dermatologists = dermas;
    });
  }

  deleteEmp(emp: EmployeeModel): void {
    console.log(emp.type);
    this.employeeService.deleteEmployee(emp);
  }


  addToPharmacyDermatologist(dermatologist: DermatologistModel, form: any): void {
    var pocetak = new Date('2021-06-25');
    var res = form.startTime.split(':');
    pocetak.setHours(parseInt(res[0]));
    pocetak.setMinutes(parseInt(res[1]));
    var kraj = new Date('2021-06-25');
    var res = form.endTime.split(':');
    kraj.setHours(parseInt(res[0]));
    kraj.setMinutes(parseInt(res[1]));
    this.workingHoursDer = new WorkingHoursModel(null, pocetak, kraj, null, null , this.selectedDay);
    this.workingHoursDermatologist = new Array<WorkingHoursModel>();
    this.workingHoursDermatologist.push(this.workingHoursDer);
    this.dermatologist.workingHours = this.workingHoursDermatologist;
    this.employeeService.addDermatologistToPharmacy(this.dermatologist);
    console.log(this.dermatologist);

  }

  addToPharmacyPharmacist(pharmacist: PharmacistModel, form: any): void   {
    this.workingHoursPha = new WorkingHoursPharmacist(null, form.startTime, form.endTime, null, null, form.selectedDay);
    pharmacist.workingHours = this.workingHoursPha;
    this.employeeService.addPharmacistToPharmacy(pharmacist);
    window.location.reload();
  }

  defineWorkingHours(pharmacist: PharmacistModel): void{
    this.defineWO = true;
    this.pharmacist = pharmacist;
  }

  defineWorkingHoursDerma(dermatologist: DermatologistModel): void {
    this.workingHoursEmpty = false;
    this.showDermaAddingWO = true;
    this.workingHoursDermatologist = dermatologist.workingHours;
    console.log(dermatologist.workingHours);
    if (dermatologist.workingHours.length === 0){
      this.workingHoursEmpty = true;
    }
    this.dermatologist = dermatologist;
  }

  registerNewPharmacist(form: any): void {
    this.workingHoursPha = new WorkingHoursPharmacist(null, form.startTime, form.endTime, null, null, form.selectedDay);
    // tslint:disable-next-line:max-line-length
    this.pharmacist = new PharmacistModel(null, 0, form.firstName, form.lastName, form.username, form.email, null, null, null, null, null, this.workingHoursPha , null);
    this.employeeService.registerNewPharmacistForPharmacy(this.pharmacist);
    window.location.reload();

  }
}
