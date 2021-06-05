import { Component, OnInit } from '@angular/core';
import {MedicineService} from '../services/medicine.service';
import {ExaminationService} from '../services/examination.service';
import {MedicineModel} from '../model/medicine.model';
import {ExaminationModel} from '../model/examination.model';
import {DermatologistService} from '../services/dermatologist.service';
import {DermatologistModel} from '../model/dermatologist.model';

@Component({
  selector: 'app-examination',
  templateUrl: './examination.component.html',
  styleUrls: ['./examination.component.css']
})
export class ExaminationComponent implements OnInit {

  public examinations: Array<ExaminationModel>;

  public name: string;
  public key: any;
  public reverse: boolean;
  public examine: any;

  constructor( private examinationService: ExaminationService
  ) {
  }

  ngOnInit(): void {
      this.examinationService.getAllFree().subscribe((examinationList: Array<ExaminationModel>) => {
        this.examinations = examinationList;
    });
  }

  sort(key): void {
    this.key = key;
    this.reverse = !this.reverse;
  }

  change(medicine): any {
      let date = medicine;
      date = Number(date);
      const d = new Date(date);
      const ds = d.toLocaleDateString();
      console.log(ds);
      return ds;
  }





}
