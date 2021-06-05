import {Component, OnInit} from '@angular/core';
import {MedicineService} from '../services/medicine.service';
import {MedicineModel} from '../model/medicine.model';
import {PatientService} from '../services/patient.service';
import {TokenStorageService} from '../_services/token-storage.service';

@Component({
  selector: 'app-medicines',
  templateUrl: './medicines.component.html',
  styleUrls: ['./medicines.component.css']
})
export class MedicinesComponent implements OnInit {

  public medicines: Array<MedicineModel>;
  searchTerm: string;
  term: string;
  reverse = false;
  name = '';
  key = '';


  constructor(
    private medicineService: MedicineService,
    private tokenStorageService: TokenStorageService,
    private patientService: PatientService
  ) {
  }

  ngOnInit(): void {
    this.initMedicines();
  }

  public addAllergy(medicine: MedicineModel): void {
    this.patientService.addAllergy(medicine);
  }

  public sort(key): void {
    this.key = key;
    this.reverse = !this.reverse;
  }

  public search(): void {
    if (this.name === '') {
      this.initMedicines();
    } else {
      this.medicines = this.medicines.filter(res => {
        return (
          res.name.toLocaleLowerCase().match(this.name.toLocaleLowerCase()) ||
          res.code.toLocaleLowerCase().match(this.name.toLocaleLowerCase()) ||
          res.type.toLocaleLowerCase().match(this.name.toLocaleLowerCase()) ||
          res.shape.toLocaleLowerCase().match(this.name.toLocaleLowerCase()) ||
          res.manufacturer.toLocaleLowerCase().match(this.name.toLocaleLowerCase()) ||
          res.composition.toLocaleLowerCase().match(this.name.toLocaleLowerCase())
        );

      });

    }
  }

  private initMedicines(): void {
    this.medicineService.getAll()
      .subscribe((medicineList: Array<MedicineModel>) => {
        this.medicines = medicineList;
      });
  }

}



