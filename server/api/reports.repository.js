"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const db_1 = require("../config/db");
class ReportsRepository {
    constructor() {
        const schema = new db_1.ReportSchema();
        mongoose.connect(schema.url);
        console.log('Creating MongoDb Model Schema..');
        this.reportsSchema = mongoose.model('reports', schema.schema);
        console.log('Schema created.');
    }
    getReports(callback) {
        this.reportsSchema.find(callback);
    }
    getReport(id, callback) {
        this.reportsSchema.findOne({ _id: id }, callback);
    }
}
exports.ReportsRepository = ReportsRepository;
//# sourceMappingURL=reports.repository.js.map