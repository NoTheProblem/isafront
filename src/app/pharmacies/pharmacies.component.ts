import {Component, OnInit} from '@angular/core';
import {PharmacyService} from '../services/pharmacy.service';
import {PharmacyModel} from '../model/pharmacy.model';

@Component({
  selector: 'app-pharmacies',
  templateUrl: './pharmacies.component.html',
  styleUrls: ['./pharmacies.component.css']
})
export class PharmaciesComponent implements OnInit {
  public pharmacies: Array<PharmacyModel>;
  term: string;
  order: string;
  reverse = false;
  key = '';
  name: any;
  city: any;
  lowerGrade = 0;

  constructor(
    private pharmacyService: PharmacyService
  ) {
  }



  ngOnInit(): void {
    this.pharmacyService.getAll().subscribe((pharmacyList: Array<PharmacyModel>) => {
      this.pharmacies = pharmacyList;
    });
  }

  sort(key): void {
    this.key = key;
    this.reverse = !this.reverse;
  }

  search(): void {
    if (this.name === '') {
      this.ngOnInit();
    } else {
      this.pharmacies = this.pharmacies.filter(res => {
        return (
          res.name.toLocaleLowerCase().match(this.name.toLocaleLowerCase()) ||
          res.city.toLocaleLowerCase().match(this.name.toLocaleLowerCase()) ||
          res.pharmacyDescription.toLocaleLowerCase().match(this.name.toLocaleLowerCase()) ||
          res.country.toLocaleLowerCase().match(this.name.toLocaleLowerCase()) ||
          res.address.toLocaleLowerCase().match(this.name.toLocaleLowerCase())
        );

        });

    }
  }

  filterEvaluationGrade(): void {
    if (this.lowerGrade === 0) {
      this.ngOnInit();
    } else {
      this.pharmacies = this.pharmacies.filter(res => {
        return (
          res.evaluationGrade >= Number(this.lowerGrade)
        );

      });
    }
  }
}
