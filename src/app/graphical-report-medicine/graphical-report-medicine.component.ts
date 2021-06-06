import {Component, Input, OnInit} from '@angular/core';
import * as Highcharts from 'highcharts';
import {PharmacyMedicineReportModel} from '../model/pharmacyMedicineReport.model';
import {TokenStorageService} from '../_services/token-storage.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-graphical-report-medicine',
  templateUrl: './graphical-report-medicine.component.html',
  styleUrls: ['./graphical-report-medicine.component.css']
})
export class GraphicalReportMedicineComponent implements OnInit {
  @Input() tip: string;
  @Input() data: PharmacyMedicineReportModel;
  chartOptions: {};
  Highcharts = Highcharts;
  serije = [];
  showEmpty = false;

  constructor(
    private tokenStorageService: TokenStorageService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    if (this.tokenStorageService.permissionForPage('ROLE_ADMIN'))
    {
      this.router.navigate(['/error']);
    }
    if (this.data.data.length === 0){
      this.showEmpty = true;
    }

    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.data.data.length; i++){
      this.serije.push({name: this.data.data[i].medName, data: this.data.data[i].medQuan});
    }
    console.log(this.serije);

    this.chartOptions = {title: {
        text: 'Izvestaj potrosnje lekova'
      },

      subtitle: {
        text: this.tip
      },

      yAxis: {
        title: {
          text: 'Broj lekova'
        }
      },

      xAxis: {
        accessibility: {
          rangeDescription: 'Range: 1 to 31'
        }
      },
      // `Range: ${this.data.categories[0]} to ${this.data.categories[this.data.categories.length - 1]}`
      legend: {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'middle'
      },

      plotOptions: {
        series: {
          label: {
            connectorAllowed: false
          },
          pointStart: Number(this.data.categories[0])
        }
      },
      series: this.serije,

      responsive: {
        rules: [{
          condition: {
            maxWidth: 500
          },
          chartOptions: {
            legend: {
              layout: 'horizontal',
              align: 'center',
              verticalAlign: 'bottom'
            }
          }
        }]
      }

    };
  }

}

