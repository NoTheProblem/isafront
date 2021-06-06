import { Component, OnInit } from '@angular/core';
import {PromotionModel} from '../model/promotion.model';
import {PromotionService} from '../services/promotion.service';
import {TokenStorageService} from '../_services/token-storage.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-promotions',
  templateUrl: './promotions.component.html',
  styleUrls: ['./promotions.component.css']
})
export class PromotionsComponent implements OnInit {

  public promotions: Array<PromotionModel>;
  isShown = true ;
  isSuccessful = false;
  form: any = {};
  isSignUpFailed = false;
  errorMessage = '';
  showError = false;

  constructor(private promotionService: PromotionService,
              private tokenStorageService: TokenStorageService,
              private router: Router
  ) {
  }

  ngOnInit(): void {
    if (this.tokenStorageService.permissionForPage('ROLE_ADMIN'))
    {
      this.router.navigate(['/error']);
    }
    this.getAllActivePromotions();
  }

  public toggle(): void {
    this.isShown = ! this.isShown;
  }

  onSubmit(): void {
    this.showError = false;
    if (!this.form.type){
      this.showError  = true;
      return;
    }
    this.promotionService.addPromotion(this.form);
    window.location.reload();
  }

  private getAllActivePromotions(): void {
    this.promotionService.getAllActive()
      .subscribe((promotionsList: Array<PromotionModel>) => {
        this.promotions = promotionsList;
      });
  }
  
}
