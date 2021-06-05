export class EmployeeModel {
  constructor(
    public id: number = 0,
    public evaluationGrade: number = 0,
    public type: string,
    public firstName: string,
    public lastName: string
  ) {
  }
}
