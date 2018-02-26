"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
class ReportSchema {
    constructor() {
        this.url = 'mongodb://localhost/report-ticker';
        this.schema = new mongoose.Schema({
            name: String,
            value: Number,
            change: Number,
            cells: []
        });
    }
}
exports.ReportSchema = ReportSchema;
//# sourceMappingURL=db.js.map