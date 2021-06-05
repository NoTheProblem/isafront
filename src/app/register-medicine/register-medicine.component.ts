import { Component, OnInit } from '@angular/core';
import {MedicineService} from '../services/medicine.service';
import {MedicineRegisterModel} from '../model/medicineRegister.model';


@Component({
  selector: 'app-register-medicine',
  templateUrl: './register-medicine.component.html',
  styleUrls: ['./register-medicine.component.css']
})

export class RegisterMedicineComponent implements OnInit {
  public medicine: Array<MedicineRegisterModel>;
  public med: MedicineRegisterModel;
  isShown = true ;
  isSuccessful = false;
  form: any = {};
  isSignUpFailed = false;
  errorMessage = '';

  constructor(private medicineService: MedicineService) { }

  ngOnInit(): void {
    this.getAllReg();
  }

  public toggle(): void {
    this.isShown = ! this.isShown;
  }

  onSubmit(): void {
    this.medicineService.addMedicine(this.form);
    window.location.reload();
  }

  private getAllReg(): void {
    this.medicineService.getAllReg()
      .subscribe((medicineRegisterList: Array<MedicineRegisterModel>) => {
        this.medicine = medicineRegisterList;
      });
  }

}
