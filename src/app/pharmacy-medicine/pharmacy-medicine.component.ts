import { Component, OnInit } from '@angular/core';
import {MedicineModel} from '../model/medicine.model';
import {MedicineService} from '../services/medicine.service';

@Component({
  selector: 'app-pharmacy-medicine',
  templateUrl: './pharmacy-medicine.component.html',
  styleUrls: ['./pharmacy-medicine.component.css']
})
export class PharmacyMedicineComponent implements OnInit {
  public medicines: Array<MedicineModel>;
  public missingMedicines: Array<MedicineModel>;
  showMissing = false;
  searchTerm: string;
  term: string;
  reverse = false;
  name = '';
  key = '';

  constructor(
    private medicineService: MedicineService) {
  }

  ngOnInit(): void {
    this.initMedicines();
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
    this.medicineService.getMedicinesForPhaAdmin()
      .subscribe((medicineList: Array<MedicineModel>) => {
        this.medicines = medicineList;
      });
  }

  removeMedicine(medicine: MedicineModel): void {
    this.medicineService.removeMedicineFromPhamracy(medicine);
  }

  showMissingMedicines(): void {
    this.showMissing = !this.showMissing;
    if (!this.showMissing){
      return;
    }

    this.medicineService.getMissingMedicines()
      .subscribe((medicineList: Array<MedicineModel>) => {
        this.missingMedicines = medicineList;
      });

  }
}
