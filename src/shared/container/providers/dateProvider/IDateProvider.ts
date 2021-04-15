interface IDateProvider {
  dateNow(): Date;
  addHours(hours: number): Date;
  addDays(days: number): Date;
  convertToUTC(date: Date): string;
  compareInHours(start_date: Date, end_date: Date): number;
  compareInDays(start_date: Date, end_date: Date): number;
  compareIfBefore(start_date: Date, end_date: Date): boolean;
}

export { IDateProvider };
