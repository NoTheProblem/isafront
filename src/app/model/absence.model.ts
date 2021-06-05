export class AbsenceModel {
  constructor(
    public id: number = 0,
    public adminId: number = 0,
    public employeeId: number = 0,
    public employeeName: string = '',
    public typeOfEmployee: string = '',
    public typeOfAbsence: string = '',
    public answerText: string = '',
    public status: string = '',
    public requestText: string = '',
    public startDate: Date = new Date(),
    public endDate: Date = new Date(),
  ) {
  }
}
