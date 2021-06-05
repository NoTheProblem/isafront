import { Component, OnInit } from '@angular/core';
import {PromotionModel} from '../model/promotion.model';
import {PromotionService} from '../services/promotion.service';

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

  constructor(private promotionService: PromotionService
  ) {
  }

  ngOnInit(): void {
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

  private getAll(): void {
    this.promotionService.getAll()
      .subscribe((promotionsList: Array<PromotionModel>) => {
        this.promotions = promotionsList;
      });
  }


}
