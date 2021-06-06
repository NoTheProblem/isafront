import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {PromotionModel} from '../model/promotion.model';
import {ToastrService} from 'ngx-toastr';
import {Constants} from './constants';

@Injectable()
export class PromotionService {

  constructor(private httpClient: HttpClient,
              private toast: ToastrService) {
  }

  public getAllActive(): Observable<Array<PromotionModel>> {
    return this.httpClient.get<Array<PromotionModel>>(Constants.API + '/promotion/getAllActiveForPharmacyAdmin');
  }

  public getAll(): Observable<Array<PromotionModel>> {
    return this.httpClient.get<Array<PromotionModel>>(Constants.API + '/promotion/getAllForPharmacyAdmin');
  }

  public addPromotion(promotion: PromotionModel): void {
    this.httpClient.post(Constants.API + '/promotion/addPromotion', promotion).subscribe(
      (response: any) => {
        this.toast.success(`${promotion.type} je dodata.` );
      },
      (error => {
        this.toast.error(`${promotion.type} nije dodata. `);
      })
    );
  }

}
