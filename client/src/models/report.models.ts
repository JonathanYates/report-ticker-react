
export enum Direction {
  None, Up, Down
}

export class ReportValue {
  constructor(public value: number, public change: number) {
  }
}

export function percentageChange(value: ReportValue): number {
  if (!value.change || !value.value) {
    return 0;
  }
  return Math.abs(value.change / value.value) * 100;

}

export function changeDirection(value: ReportValue): Direction {
  return value.change && percentageChange(value) >= 0 ?
    value.change > 0
      ? Direction.Up
      : value.change < 0
      ? Direction.Down
      : Direction.None
    : Direction.None;
}

export class ReportSummary extends  ReportValue {

  public _id: string;
  public name: string;

  constructor(id: string, name: string, value: number, change: number) {
    super(value, change);
    this._id = id;
    this.name = name;
  }
}

export class Cell extends ReportValue {
  public rowIndex: number;
  public columnIndex: number;
}

export class Report extends ReportValue {
  public _id: string;
  public name: string;
  public cells: Cell[][];
}

export class ReportUpdate extends ReportValue {
  public _id: string;
  public name: string;
  public cells: Cell[];
}