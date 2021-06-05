export class MedicineRegisterModel {
  constructor(
    public id: number = 0,
    public code: string = '',
    public name: string = '',
    public type: string = '',
    public contraindications: string = '',
    public composition: string = '',
    public rdiot: string = '',
    public loyaltyScore: number = 0
  ) {
  }
}
