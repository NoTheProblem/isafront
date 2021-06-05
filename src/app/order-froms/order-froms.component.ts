import { Component, OnInit } from '@angular/core';
import {OrderFormModel} from '../model/order-form.model';
import {OrderFormService} from '../services/order-form.service';
import {MedicineModel} from '../model/medicine.model';
import {MedicineService} from '../services/medicine.service';
import {MedicineQuantityModel} from '../model/medicineQuantity.model';
import {MedicineQuantityHelpModel} from '../model/medicineQuantityHelpModel';
import {TokenStorageService} from '../_services/token-storage.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-order-froms',
  templateUrl: './order-froms.component.html',
  styleUrls: ['./order-froms.component.css']
})
export class OrderFromsComponent implements OnInit {
  public orders: Array<OrderFormModel>;
  public medicines: Array<MedicineModel>;
  public ordersBackup: Array<OrderFormModel>;
  public order: OrderFormModel;
  public medQuantity: MedicineQuantityModel;
  public medHelp: Array<MedicineQuantityHelpModel> = new Array<MedicineQuantityHelpModel>();
  public medH: MedicineQuantityHelpModel;
  public ids: Array<number>;
  public quan: Array<number>;

  helpID: number;
  isQuanShown = false;
  isShown = true ;
  isSuccessful = false;
  form: any = {};
  isSubmitFailed = false;
  errorMessage = '';
  name = '';
  dummy = '';
  newquan: number;

  constructor(
    private medicineService: MedicineService,
    private orderFormService: OrderFormService,
    private tokenStorageService: TokenStorageService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    if (this.tokenStorageService.permissionForPage('ROLE_ADMIN'))
    {
      this.router.navigate(['/error']);
    }
    this.initMedicines();
  }

  public toggle(): void {
    this.isShown = ! this.isShown;
  }

  public search(): void {
    if (this.name === '') {
      this.medicines = null;
    } else {
      this.medicines = this.medicines.filter(res => {
        return res.name.toLocaleLowerCase().match(this.name.toLocaleLowerCase()) ||
        res.code.toLocaleLowerCase().match(this.name.toLocaleLowerCase());
      });

    }
  }

  private initMedicines(): void {
    this.orderFormService.getAllActive()
      .subscribe((orders: Array<OrderFormModel>) => {
        this.orders = orders;
        this.ordersBackup = orders;
      });
    this.medicineService.getAll()
      .subscribe((medicineList: Array<MedicineModel>) => {
        this.medicines = medicineList;
      });
  }


  public addToOrderForm(medicine: MedicineModel): void {
    this.medicines = this.medicines.filter(item => item !== medicine);
    this.medH = new MedicineQuantityHelpModel(medicine.id, 1, medicine.code, medicine.name);
    this.medHelp.push(this.medH);
  }

  public Izbrisi(med: MedicineQuantityHelpModel): void {
    this.medHelp = this.medHelp.filter(item => item !== med);
    this.medicines.push(new MedicineModel(med.medicineID, med.medicineName, med.medicineCode, '', '', '', '', '', '', '', ''));
  }


  public createOrder(): void {
    this.isSubmitFailed = false;
    if (!this.form.startDate || this.medHelp.length === 0){
      this.isSubmitFailed = true;
      return;
    }
    this.ids = new Array<number>();
    this.quan = new Array<number>();
    for (const medHelpItem of this.medHelp){
      this.ids.push(medHelpItem.medicineID);
      this.quan.push(medHelpItem.quantity);
    }
    this.medQuantity = new MedicineQuantityModel(1, this.ids, this.quan);
    this.order = new OrderFormModel(null,  null, null, null, null, this.form.startDate, null, this.medQuantity);
    this.orderFormService.addOrderForm(this.order);
    window.location.reload();
  }


  Dodaj(med: MedicineQuantityHelpModel): void {
      med.quantity = med.quantity + 1;
  }

  Smanji(med: MedicineQuantityHelpModel): void {
    if ( med.quantity - 1 < 1){
      return;
    }
    med.quantity = med.quantity - 1;
  }

  ShowQuanEnter(med: MedicineQuantityHelpModel): void {
    this.isQuanShown = true;
    this.medH = med;
    this.newquan = med.quantity;
  }

  changeQuan(): void {
    this.medH.quantity = this.newquan;
    this.isQuanShown = false;
  }

  showAll(): void {
    this.orders = this.ordersBackup;
  }

  showCreated(): void {
    this.orders = this.ordersBackup;
    this.orders = this.orders.filter(item => item.status === 'created');

  }

  showProcessed(): void {
    this.orders = this.ordersBackup;
    this.orders = this.orders.filter(item => item.status === 'obradjen');
  }
}

