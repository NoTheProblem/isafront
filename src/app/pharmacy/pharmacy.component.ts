import { Component, OnInit} from '@angular/core';
import {PharmacyModel} from '../model/pharmacy.model';
import {PharmacyService} from '../services/pharmacy.service';
import {ActivatedRoute, Router} from '@angular/router';
import {TokenStorageService} from '../_services/token-storage.service';


@Component({
  selector: 'app-pharmacy',
  templateUrl: './pharmacy.component.html',
  styleUrls: ['./pharmacy.component.css']
})
export class PharmacyComponent implements OnInit {

  public pharmacy: PharmacyModel;

  role: string;

  isSuccessful = false;
  form: any = {};
  public showMap = false;
  public adresa: string;
  public formConf = false;
  public update = false;
  public showErr = false;

  constructor(
    private route: ActivatedRoute,
    private pharmacyService: PharmacyService,
    private tokenStorageService: TokenStorageService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    if (this.tokenStorageService.permissionForPage('ROLE_ADMIN'))
    {
      this.router.navigate(['/error']);
    }
    this.pharmacyService.getPharmacyByAdmin().subscribe((pharmacy: PharmacyModel) => {
        this.pharmacy = pharmacy;
        this.adresa = pharmacy.city + ' ' + pharmacy.address +  ' ' + pharmacy.city;
      });
  }


  azuriraj(form: any): void {
    this.showErr = false;
    this.formConf = false;
    if (form.name){
      this.pharmacy.name = form.name;
      this.formConf = true;
    }
    if (form.pharmacyDescription){
      this.pharmacy.pharmacyDescription = form.pharmacyDescription;
      this.formConf = true;
    }
    if (form.address){
      this.pharmacy.address = form.address;
      this.formConf = true;
    }
    if (form.counselingPrice){
      this.pharmacy.counselingPrice = form.counselingPrice;
      this.formConf = true;
    }
    if (this.formConf){
      this.pharmacyService.updatePharmacyInfo(this.pharmacy);
    }
    else {
      this.showErr = true;
    }
  }


}
