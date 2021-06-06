import { Component, OnInit } from '@angular/core';
import {ExaminationService} from '../services/examination.service';
import {ExaminationModel} from '../model/examination.model';

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
