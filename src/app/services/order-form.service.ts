import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {OrderFormModel} from '../model/order-form.model';
import {ToastrService} from 'ngx-toastr';
import {BidModel} from '../model/bid.model';
import {Constants} from './constants';

@Injectable()
export class OrderFormService {
  private path: string;

  constructor(private httpClient: HttpClient,
              private toast: ToastrService) {
  }

  public addOrderForm(orderFormModel: OrderFormModel): void {
    this.httpClient.post(Constants.API + '/order/addPurchaseOrder', orderFormModel).subscribe(
      (response: any) => {
        this.toast.success(`Dodata nova narudzbenica!`);
      },
      (error => {
        this.toast.error(`Doslo je do greske`);
      })
    );
  }

  public deleteOrder(orderFormModel: OrderFormModel): void {
    this.httpClient.post(Constants.API + '/order/deleteOrder', orderFormModel).subscribe(
      (response: any) => {
        this.toast.success(`Porudzbenica je obrisana!`);
      },
      (error => {
        this.toast.error(`Doslo je do greske`);
      })
    );
  }

  public getAllActive(): Observable<Array<OrderFormModel>> {
    return this.httpClient.get<Array<OrderFormModel>>(Constants.API + '/order/getAllActive');
  }

  public getOrder(id: number): Observable<OrderFormModel> {
    this.path = Constants.API + '/order/getOrder/' + String(id);
    return this.httpClient.get<OrderFormModel>(this.path);
  }


  public getBids(id: number): Observable<Array<BidModel>> {
    this.path = Constants.API + '/order/getBidsForOrder/' + String(id);
    return this.httpClient.get<Array<BidModel>>(this.path);
  }

  public confirmBid(bid: BidModel, orderID: number): void {
    this.path = Constants.API + '/order/confirmBid/' + String(orderID);
    this.httpClient.post(this.path, bid).subscribe(
      (response: any) => {
        this.toast.success(`Porudzbenica je potvrdjena!`);
      },
      (error => {
        this.toast.error(`Doslo je do greske!`);
      })
    );
  }

  public update(order: OrderFormModel): void {
    this.httpClient.post(Constants.API + '/order/updateOrder/', order).subscribe(
      (response: any) => {
        this.toast.success(`Porudzbenica je azurirana!`);
      },
      (error => {
        this.toast.error(`Doslo je do greske!`);
      })
    );
  }
}
