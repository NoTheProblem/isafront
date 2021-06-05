import { Component, OnInit } from '@angular/core';
import {MedicineService} from '../services/medicine.service';
import {MedicineModel} from '../model/medicine.model';
import {PriceMedicineModel} from '../model/priceMedicine.model';

@Component({
  selector: 'app-price-list',
  templateUrl: './price-list.component.html',
  styleUrls: ['./price-list.component.css']
})
export class PriceListComponent implements OnInit {

  public medicines: Array<MedicineModel>;
  public medPrice: PriceMedicineModel;
  public newMedPrice: PriceMedicineModel;
  public medicine: MedicineModel;
  public newPrice: number;
  public startDate: Date;
  public isSubmitFailed = false;
  public endDate: Date;
  public isSuccessful = false;
  private examinationDateInput: Date;
  name = '';
  public show = false;
  form: any = {};


  constructor(private medicineService: MedicineService
  ) { }

  ngOnInit(): void {
    this.initMedicines();
  }

  public search(): void {
    if (this.name === '') {
      this.initMedicines();
    } else {
      this.medicines = this.medicines.filter(res => {
        return (
          res.name.toLocaleLowerCase().match(this.name.toLocaleLowerCase()) ||
          res.code.toLocaleLowerCase().match(this.name.toLocaleLowerCase())
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

  getMedicine(med: MedicineModel, id: number): void {
    this.medicine = med;
    this.show = true;
    this.medicineService.getMedPriceForPhaAdmin(id)
      .subscribe((priceMedicineModel: PriceMedicineModel) => {
        this.medPrice = priceMedicineModel;
      });

  }

  updateMedicinePrice(form: any): void {
    this.isSubmitFailed = false;
    if (!form.price || !form.startDate || form.price <= 0){
      this.isSubmitFailed = true;
      return;
    }
    this.newMedPrice = new PriceMedicineModel(null, form.startDate, null, form.price, null, this.medicine);
    this.medicineService.addNewMedPrice(this.newMedPrice);
    window.location.reload();
  }
}
