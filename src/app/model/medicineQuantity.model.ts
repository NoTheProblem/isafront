export class MedicineQuantityModel {
  constructor(
    public id: number = 0,
    public medicineIDs: Array<number>,
    public quantity: Array<number>,
  ) {
  }
}
