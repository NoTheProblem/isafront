import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {OrderFormService} from '../services/order-form.service';
import {OrderFormModel} from '../model/order-form.model';
import {BidModel} from '../model/bid.model';

@Component({
  selector: 'app-orderdetails',
  templateUrl: './orderdetails.component.html',
  styleUrls: ['./orderdetails.component.css']
})
export class OrderdetailsComponent implements OnInit {
  public order: OrderFormModel;
  public bids: Array<BidModel>;
  public singleBid = BidModel;
  public showBids = false;
  public decision = false;
  public status = false;
  public updatable = true;
  public showUpdate = false;
  form: any = {};

  constructor(private route: ActivatedRoute,
              private router: Router,
              private orderFormService: OrderFormService
  ) { }

  ngOnInit(): void {
    const routeParam = this.route.snapshot.paramMap;
    const orderID = Number(routeParam.get('id'));
    this.orderFormService.getOrder(orderID)
      .subscribe((orderFormModel: OrderFormModel) => {
        this.order = orderFormModel;
        this.status = 'obradjen' === this.order.status;
      });
    if (!this.status){
      this.orderFormService.getBids(orderID)
        .subscribe((bids: Array<BidModel>) => {
          this.bids = bids;
          if (this.bids.length !== 0){
            this.updatable = false;
          }
        });
    }
  }

  isValidForDecision(): void{
    const today = new Date();
    // TODO vratit kako treba na kraju
    if (today < this.order.endDate){
      this.decision = true;
    }
  }

  confirm(bid: BidModel): void {
    this.orderFormService.confirmBid(bid, this.order.id);
    this.showBids = false;
    this.router.navigate(['/login']);
  }

  deleteOrder(): void {
    this.orderFormService.deleteOrder(this.order);
    this.router.navigate(['/login']);
  }

  updateOrder(form: any): void {
    this.order.endDate = form.endDate;
    this.orderFormService.update(this.order);
    this.router.navigate(['/login']);
  }
}
