export class MedicineModel {
  constructor(
    public id: number = 0,
    public name: string = '',
    public code: string = '',
    public type: string = '',
    public shape: string = '',
    public composition: string = '',
    public manufacturer: string = '',
    public additionalNotes: string = '',
    public evaluationGrade: string = '',
    public loyaltyScore: string = '',
    public contraidications: string = ''
  ) {
  }
}
