"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
class ReportsRouter {
    constructor(reportsController) {
        this.reportsController = reportsController;
        this.routes = express.Router();
        this.configure();
    }
    configure() {
        this.routes.get('/', this.reportsController.getReports);
        this.routes.get('/:id', this.reportsController.getReport);
    }
}
exports.ReportsRouter = ReportsRouter;
//# sourceMappingURL=reports.router.js.map