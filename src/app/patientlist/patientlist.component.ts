import { Component, OnInit } from '@angular/core';
import {PatientModel} from '../model/patient.model';
import {PatientService} from '../services/patient.service';

@Component({
  selector: 'app-patientlist',
  templateUrl: './patientlist.component.html',
  styleUrls: ['./patientlist.component.css']
})
export class PatientlistComponent implements OnInit {
  public patientList: Array<PatientModel>;
  public name = '';
  constructor(
    private patientService: PatientService
  ) { }

  ngOnInit(): void {
    this.patientService.getAll().subscribe((patientList: Array<PatientModel>) => {
      this.patientList = patientList;
    });
  }

  search(): void {
    if (this.name === '') {
      this.ngOnInit();
    } else {
      this.patientList = this.patientList.filter(res => {
        return (
          res.firstName.toLocaleLowerCase().match(this.name.toLocaleLowerCase()) ||
          res.lastName.toLocaleLowerCase().match(this.name.toLocaleLowerCase())
        );

      });

    }
  }

}
