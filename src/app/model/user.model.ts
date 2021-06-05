export class UserModel {
  constructor(
    public id: number = 0,
    public firstName: string,
    public lastName: string,
    public username: string,
    public email: string,
    public country: string,
    public city: string,
    public address: string,
    public phoneNumber: string,
    public birthDate: string
  ) {
  }
}

