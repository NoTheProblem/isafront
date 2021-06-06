import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AbsenceModel} from '../model/absence.model';
import {AbsenceService} from '../services/absence.service';
import {TokenStorageService} from '../_services/token-storage.service';

@Component({
  selector: 'app-absence',
  templateUrl: './absence.component.html',
  styleUrls: ['./absence.component.css']
})
export class AbsenceComponent implements OnInit {
  private absenceID: number;
  public absence: AbsenceModel;
  isDeclined = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private absenceService: AbsenceService,
    private tokenStorageService: TokenStorageService
  ) { }

  ngOnInit(): void {
    this.tokenStorageService.getUserType();
    if (this.tokenStorageService.getUserType() !== 'ROLE_ADMIN' || this.tokenStorageService.getUserType() !== 'ROLE_SYSADMIN') {
      this.router.navigate(['/error']);
    }
    const routeParam = this.route.snapshot.paramMap;
    this.absenceID = Number(routeParam.get('id'));
    this.absenceService.getAbsenceByID(this.absenceID).subscribe((ab: AbsenceModel) => {
      this.absence = ab;
    });
  }

  public decline(): void {
    this.absence.status = 'Odbijeno';
    this.isDeclined = true;
  }

  public accept(): void{
    this.absence.status = 'Odobreno';
    this.absenceService.sendAnswer(this.absence);
    this.router.navigate(['/login']);
  }

  public confDecline(): void{
    this.absence.answerText = (document.getElementById('answer') as HTMLInputElement).value;
    this.absenceService.sendAnswer(this.absence);
    this.router.navigate(['/login']);
  }

}
