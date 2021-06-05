export class PromotionModel {
  constructor(
    public id: number = 0,
    public title: string = '',
    public text: string = '',
    public startDate: Date = new Date(),
    public endDate: Date = new Date(),
    public type: string = '',
    public pharmacyID: number = 0,
  ) {
  }
}
