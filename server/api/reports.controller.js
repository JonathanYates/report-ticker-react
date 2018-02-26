"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ReportsController {
    constructor(repository) {
        this.repository = repository;
        this.getReports = (req, res) => {
            console.log('>Server: /api/reports');
            this.repository.getReports((err, reports) => {
                if (err) {
                    console.log('>Server: /api/reports. Error occured: ' + err);
                    res.send(err);
                }
                else {
                    res.json(reports);
                }
            });
        };
        this.getReport = (req, res) => {
            const id = req.params.id;
            console.log('>Server: /api/report/' + id);
            this.repository.getReport(id, (err, report) => {
                if (err) {
                    console.log('>Server: /api/reports/:id. Error occured: ' + err);
                    res.send(err);
                }
                else {
                    res.json(report);
                }
            });
        };
    }
}
exports.ReportsController = ReportsController;
//# sourceMappingURL=reports.controller.js.map