import * as mongoose from 'mongoose';

export interface ReportSchema {
    url: string;
    schema: mongoose.Schema;
}

export class ReportSchema implements ReportSchema {

    public url = 'mongodb://localhost/report-ticker';
    
    public schema:mongoose.Schema;

    constructor() {
        this.schema = new mongoose.Schema({
            name: String,
            value: Number,
            change: Number,
            cells: []
        });
    }

}



