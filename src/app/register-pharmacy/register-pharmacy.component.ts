import { Component, OnInit } from '@angular/core';
import {PharmacyService} from '../services/pharmacy.service';
import {PharmacyModel} from '../model/pharmacy.model';

@Component({
  selector: 'app-register-pharmacy',
  templateUrl: './register-pharmacy.component.html',
  styleUrls: ['./register-pharmacy.component.css']
})
export class RegisterPharmacyComponent implements OnInit {
  public pharmacy: Array<PharmacyModel>;
  isShown = true ;
  isSuccessful = false;
  form: any = {};
  isSignUpFailed = false;
  errorMessage = '';

  constructor(private pharmacyService: PharmacyService) { }

  ngOnInit(): void {
    this.getAll();
  }

  public toggle(): void {
    this.isShown = ! this.isShown;
  }

  onSubmit(): void {
    this.pharmacyService.addPharmacy(this.form);
    window.location.reload();
  }

  private getAll(): void {
    this.pharmacyService.getAll()
      .subscribe((pharmacyList: Array<PharmacyModel>) => {
        this.pharmacy = pharmacyList;
      });
  }

}








