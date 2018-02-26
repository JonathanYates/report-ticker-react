import * as mongoose from 'mongoose';

export interface IReportSchema {
    url: string;
    schema: mongoose.Schema;
}

export class ReportSchema implements IReportSchema {

    url = 'mongodb://localhost/report-ticker';
    
    schema:mongoose.Schema;

    constructor() {
        this.schema = new mongoose.Schema({
            name: String,
            value: Number,
            change: Number,
            cells: []
        });
    }

}



