export class PharmacyAdminModel {
  constructor(
    public id: number = 0,
    public pharmacyId: number = 0,
    public firstName: string = '',
    public lastName: string= '',
    public country: string= '',
    public city: string = '',
    public address: string = '',
    public email: string = '',
    public phoneNumber: string = '',
    public birthDate: Date = new Date(),
  ) {
  }
}
