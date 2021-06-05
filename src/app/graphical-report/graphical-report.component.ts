import {Component, Input, OnInit} from '@angular/core';
import * as Highcharts from 'highcharts';
import {PharmacyExaminationReportModel} from '../model/pharmacyExaminationReport.model';

@Component({
  selector: 'app-graphical-report',
  templateUrl: './graphical-report.component.html',
  styleUrls: ['./graphical-report.component.css']
})
export class GraphicalReportComponent implements OnInit {
  @Input() textInput: string;
  @Input() tip: string;
  @Input() data: PharmacyExaminationReportModel;
  chartOptions: {};
  Highcharts = Highcharts;

  constructor(
  ) { }

  ngOnInit(): void {
    this.chartOptions = {
      chart: {
        type: 'line'
      },
      title: {
        text: this.textInput
      },
      subtitle: {
        text: this.tip
      },
      xAxis: {
        categories: this.data.categories
      },
      yAxis: {
        title: {
          text: 'Broj pregleda'
        }
      },
      plotOptions: {
        line: {
          dataLabels: {
            enabled: true
          },
          enableMouseTracking: false
        }
      },
      series: [{
        name: '',
        data: this.data.data
      }]
    };
  }
}
