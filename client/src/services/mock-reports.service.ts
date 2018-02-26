// import {Cell, Report, ReportSummary} from '../models/report.models';
// import {Observable} from 'rxjs/Observable';
// import 'rxjs/add/observable/interval';
//
// export function getRandom(min: number, max: number) {
//   return Math.floor(Math.random() * (max - min + 1)) + min;
// }
//
// export class MockReportsService {
//
//   tick(): Observable<Report[]> {
//     let reports = this.getReports();
//     return Observable.interval(500)
//       .map(i => {
//         reports = this.updateReports(reports);
//         return reports;
//       })
//       .startWith(reports);
//   }
//
//   private getReports(): Report[] {
//     let reports = [];
//
//     for (let i = 1; i <= 30; i++) {
//
//       let report = new Report(0, 0);
//       report._id = i.toString();
//       report.name = 'Report ' + i;
//       report.cells = [];
//
//       const rowCount = getRandom(20, 40);
//       const colCount = getRandom(8, 16);
//
//       for (let rowIndex = 0; rowIndex < rowCount; rowIndex++) {
//         const row = [];
//
//         for (let colIndex = 1; colIndex < colCount; colIndex++) {
//           const cell = new Cell(getRandom(-10000, 10000), getRandom(-100, 100));
//           row.push(cell);
//
//           report.value += cell.value;
//           report.change += cell.change;
//         }
//
//         report.cells.push(row);
//       }
//
//       reports.push(report);
//     }
//
//     return reports;
//   }
//
//   private getSummary(report: Report):ReportSummary {
//     let value = 0;
//
//     for (let i = 0; i < report.cells.length; i++) {
//       const row = report.cells[i];
//       for (let j = 0; j < row.length; j++) {
//         const cell = row[j];
//         value += cell.value;
//       }
//     }
//
//     const change = value - report.value;
//
//     const summary = new ReportSummary(report._id, report.name, value, 0);
//
//     if (change !== 0) {
//       summary.change = change;
//     }
//
//     return summary;
//   }
//
//   private updateReports(reports: Report[]): Report[] {
//
//     let updatedReports = reports.map(report => {
//       let updatedReport = new Report(report.value, report.change);
//       updatedReport._id = report._id;
//       updatedReport.name = report.name;
//       updatedReport.cells = report.cells;
//       return updatedReport;
//     });
//
//     const reportsUpdateCount = getRandom(updatedReports.length / 2, updatedReports.length - 1);
//
//     for (let index = 0; index < reportsUpdateCount; index++) {
//
//       const cells = [];
//       const report = updatedReports[getRandom(0, updatedReports.length - 1)];
//
//       const rowUpdates = getRandom(report.cells.length / 2, report.cells.length - 1);
//
//       for (let r = 0; r < rowUpdates; r++) {
//         const rowIndex = getRandom(0, report.cells.length - 1);
//         const row = report.cells[rowIndex];
//
//         const columnCount = getRandom(1, row.length - 1);
//
//         for (let c = 0; c < columnCount; c++) {
//           const cellIndex = getRandom(0, row.length - 1);
//
//           const cell = row[cellIndex];
//
//           const multiple = getRandom(-1, 1);
//           let percentage = Math.random() * 0.02;
//
//           if (multiple === -1) {
//             percentage = percentage * -1;
//           }
//
//           const change = Math.round(cell.value * percentage);
//
//           if (change === 0) {
//             continue;
//           }
//
//           cell.value += change;
//           cell.change = change;
//
//           cells.push({
//             value: cell.value,
//             change: cell.change,
//             rowIndex: rowIndex,
//             columnIndex: cellIndex
//           });
//         }
//       }
//
//       const summary = this.getSummary(report);
//       report.value = summary.value;
//       report.change = summary.change;
//
//     }
//
//     return updatedReports;
//   }
// }
//
//
//
