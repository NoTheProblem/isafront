import { Component, OnInit } from '@angular/core';
import {AbsenceModel} from '../model/absence.model';
import {AbsenceService} from '../services/absence.service';
import {TokenStorageService} from '../_services/token-storage.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-absences',
  templateUrl: './absences.component.html',
  styleUrls: ['./absences.component.css']
})
export class AbsencesComponent implements OnInit {

  public absences: Array<AbsenceModel>;
  public absence: AbsenceModel;
  role: string;

  constructor(
    private abscenceService: AbsenceService,
    private tokenStorageService: TokenStorageService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.role = this.tokenStorageService.getUserType();
    if (this.role === 'ROLE_ADMIN'){
        this.getPharmaRequests();
    }
    else if (this.role === 'ROLE_SYSADMIN'){
      this.getDermaRequests();
    }
    else {
      this.router.navigate(['/error']);
    }
  }

  public getDermaRequests(): void {
    this.abscenceService.getAllDermatologistRequests()
      .subscribe((absenceList: Array<AbsenceModel>) => {
        this.absences = absenceList;
      });
  }

  public getPharmaRequests(): void {
    this.abscenceService.getAllPharmacistRequests()
      .subscribe((absenceList: Array<AbsenceModel>) => {
        this.absences = absenceList;
      });
  }

}
