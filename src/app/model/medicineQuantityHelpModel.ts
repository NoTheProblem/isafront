export class MedicineQuantityHelpModel {
  constructor(
    public medicineID: number,
    public quantity: number,
    public medicineCode: string,
    public medicineName: string
  ) {
  }
}
