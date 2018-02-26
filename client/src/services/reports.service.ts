import 'rxjs/Rx';
import {SocketService} from './socket.service';
import {ReportSummary, Report, ReportUpdate} from '../models/report.models';
import {Observable} from 'rxjs/Observable';

export class ReportsService {

  private baseAddress = 'http://localhost:3200';
  // private baseAddress = '';

  constructor(private socketService: SocketService) {
  }

  public getReports(): Observable<ReportSummary[]> {
    console.log('>ReportsService.list');
    return Observable.ajax.get(this.baseAddress + '/api/reports')
      .map(result => result.response);
  }

  public getReport(id: string): Observable<Report> {
    return Observable.ajax.get(this.baseAddress + '/api/reports/' + id)
      .map(result => result.response);
  }

  public OnUpdates(): Observable<ReportSummary> {

    const socket = this.socketService.getSocket();

    return Observable.create(observer => {
      socket.on('reports/update', report =>
        observer.next(new ReportSummary(report._id, report.name, report.value, report.change)));
      return {dispose: socket.close};
    });
  }

  public OnUpdate(id: string): Observable<ReportUpdate> {

    const socket = this.socketService.getSocket();

    return Observable.create(observer => {
      socket.on('report/' + id, report =>
        observer.next(<ReportUpdate>report));
      return {dispose: socket.close};
    });
  }
}

export default new ReportsService(new SocketService());