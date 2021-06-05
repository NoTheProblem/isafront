import { Component, OnInit } from '@angular/core';
import {PharmacistModel} from '../model/pharmacist.model';
import {EmployeeService} from '../services/employee.service';

@Component({
  selector: 'app-pharmacist-list',
  templateUrl: './pharmacist-list.component.html',
  styleUrls: ['./pharmacist-list.component.css']
})
export class PharmacistListComponent implements OnInit {
  public pharmacists: Array<PharmacistModel>;
  term: string;
  order: string;
  reverse = false;
  key = '';
  name: any;
  city: any;
  lowerGrade = 0;
  constructor(
    private employeeService: EmployeeService
  ) { }

  ngOnInit(): void {
    this.employeeService.getAllPharmacists().subscribe((pharmacists: Array<PharmacistModel>) => {
      this.pharmacists = pharmacists;
    });
  }


  public sort(key): void {
    this.key = key;
    this.reverse = !this.reverse;
  }

  public search(): void {
    if (this.name === '') {
      this.ngOnInit();
    } else {
      this.pharmacists = this.pharmacists.filter(res => {
        return (
          res.firstName.toLocaleLowerCase().match(this.name.toLocaleLowerCase()) ||
          res.lastName.toLocaleLowerCase().match(this.name.toLocaleLowerCase()) ||
          res.pharmacy.name.toLocaleLowerCase().match(this.name.toLocaleLowerCase()) ||
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
      this.pharmacists = this.pharmacists.filter(res => {
        return (
          res.evaluationGrade >= Number(this.lowerGrade)
        );

      });
    }
  }

}
