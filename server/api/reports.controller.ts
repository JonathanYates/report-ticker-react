import {ReportsRepository} from './reports.repository';

export class ReportsController {

  constructor(private repository: ReportsRepository) {}

  public getReports = (req, res) => {

    console.log('>Server: /api/reports');

    this.repository.getReports((err, reports) => {

      if (err) {
        console.log('>Server: /api/reports. Error occured: ' + err);
        res.send(err);
      } else {
        res.json(reports);
      }
    });
  }

  public getReport = (req, res) => {

    const id = req.params.id;
    console.log('>Server: /api/report/' + id);

    this.repository.getReport(id, (err, report) => {

      if (err) {
        console.log('>Server: /api/reports/:id. Error occured: ' + err);
        res.send(err);
      } else {
        res.json(report);
      }
    });
  }

}