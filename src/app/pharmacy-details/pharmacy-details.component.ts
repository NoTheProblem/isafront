import { Component, OnInit } from '@angular/core';
import {PharmacyModel} from '../model/pharmacy.model';
import {ActivatedRoute} from '@angular/router';
import {PharmacyService} from '../services/pharmacy.service';
import {TokenStorageService} from '../_services/token-storage.service';
import {MedicineModel} from '../model/medicine.model';
import {ExaminationModel} from '../model/examination.model';

@Component({
  selector: 'app-pharmacy-details',
  templateUrl: './pharmacy-details.component.html',
  styleUrls: ['./pharmacy-details.component.css']
})
export class PharmacyDetailsComponent implements OnInit {
  public pharmacy: PharmacyModel;
  public medicines: Array<MedicineModel>;
  public examinations: Array<ExaminationModel>;
  isLoggedIn = false;
  showMedicines = false;
  showExaminations = false;
  public showMap = false;
  public adresa: string;
  private pharmacyID: number;

  constructor(
    private route: ActivatedRoute,
    private tokenStorageService: TokenStorageService,
    private pharmacyService: PharmacyService
  ) {
  }

  ngOnInit(): void {
    const routeParam = this.route.snapshot.paramMap;
    this.pharmacyID = Number(routeParam.get('id'));
    this.pharmacyService.getPharmacyByID(this.pharmacyID).subscribe((pharmacy: PharmacyModel) => {
      this.pharmacy = pharmacy;
      this.adresa = this.pharmacy.city + ' ' + this.pharmacy.address + ' ' + this.pharmacy.city;
    });
    this.isLoggedIn = this.tokenStorageService.isLoggedIn();
  }

  subscribeToPromotions(): void{
    this.pharmacyService.subscribeToPromotions(this.pharmacy.id);
  }

  checkEPerscription(): void {
    return;
  }

  showAvailableMedicines(): void {
    this.showMedicines = !this.showMedicines;
    if (!this.showMedicines){
      return;
    }
    this.pharmacyService.getAvailableMedicines(this.pharmacyID).subscribe((medicines: Array<MedicineModel>) => {
      this.medicines = medicines;
    });

  }

  showAvailableExaminations(): void {
    this.showExaminations = !this.showExaminations;
    if (!this.showExaminations){
      return;
    }
    this.pharmacyService.getAvailableExaminations(this.pharmacyID).subscribe((examinations: Array<ExaminationModel>) => {
      this.examinations = examinations;
    });
  }
}

