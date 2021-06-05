import { Component, OnInit } from '@angular/core';
import {EmployeeService} from '../services/employee.service';
import {DermatologistModel} from '../model/dermatologist.model';
import {PharmacyModel} from '../model/pharmacy.model';
import {PharmacyService} from '../services/pharmacy.service';

@Component({
  selector: 'app-dermatologist-list',
  templateUrl: './dermatologist-list.component.html',
  styleUrls: ['./dermatologist-list.component.css']
})
export class DermatologistListComponent implements OnInit {
  public dermatologists: Array<DermatologistModel>;
  public dermatologistsBackUp: Array<DermatologistModel>;
  public pharmacies: Array<PharmacyModel>;
  public pharmaciesByDerma: Array<PharmacyModel>;
  public pharmacy: PharmacyModel;
  term: string;
  order: string;
  reverse = false;
  key = '';
  name: any;
  city: any;
  lowerGrade = 0;
  selectedPharmacy: any;

  constructor(
    private employeeService: EmployeeService,
    private pharmacyService: PharmacyService
  ) {
  }

  ngOnInit(): void {
    this.employeeService.getAllDermatologists().subscribe((dermatologists: Array<DermatologistModel>) => {
      this.dermatologists = dermatologists;
      this.dermatologistsBackUp = new Array<DermatologistModel>();
      this.dermatologistsBackUp = dermatologists;
    });
    this.pharmacyService.getAll().subscribe((pharmacies: Array<PharmacyModel>) => {
      this.pharmacies = pharmacies;
    });
  }


  public sort(key): void {
    this.key = key;
    this.reverse = !this.reverse;
  }

  public search(): void {
    if (this.name === '') {
      this.dermatologists = this.dermatologistsBackUp;
    } else {
      this.dermatologists = this.dermatologists.filter(res => {
        return (
          res.firstName.toLocaleLowerCase().match(this.name.toLocaleLowerCase()) ||
          res.lastName.toLocaleLowerCase().match(this.name.toLocaleLowerCase())  ||
          (res.firstName + ' ' + res.lastName).toLocaleLowerCase().match(this.name.toLocaleLowerCase()) ||
          (res.lastName + ' ' + res.firstName).toLocaleLowerCase().match(this.name.toLocaleLowerCase())
        );
      });
    }
  }

  public filterEvaluationGrade(): void {
    if (this.lowerGrade === 0) {
      this.dermatologists = this.dermatologistsBackUp;
    } else {
      this.dermatologists = this.dermatologists.filter(res => {
        return (
          res.evaluationGrade >= Number(this.lowerGrade)
        );

      });
    }
  }

  public filterByPharmacy(): void {
    if (!this.selectedPharmacy) {
      this.dermatologists = this.dermatologistsBackUp;
      return;
    }
    this.pharmacy = this.pharmacies.find(res => res.name === this.selectedPharmacy);
    this.dermatologists = new Array<DermatologistModel>();
    // this.dermatologists = this.dermatologists.filter(res => res.pharmacys.includes(this.pharmacy));
    for (const d of this.dermatologistsBackUp){
      this.pharmaciesByDerma = d.pharmacys;
      for (const p of this.pharmaciesByDerma){
        if (p.id === this.pharmacy.id){
          this.dermatologists.push(d);
          break;
        }
      }
    }
  }
}
