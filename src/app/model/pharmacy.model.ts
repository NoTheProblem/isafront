export class PharmacyModel {
  constructor(
    public id: number = 0,
    public name: string = '',
    public country: string = '',
    public city: string = '',
    public address: string = '',
    public pharmacyDescription: string = '',
    public evaluationGrade: number = 0.0,
    public counselingPrice: number = 0.0
  ) {
  }
}
