import * as mongoose from 'mongoose';
import {Document, Model} from 'mongoose';
import {ReportSchema} from '../config/db';

export class ReportsRepository {

    public reportsSchema:Model<Document>;
    
    constructor() {

        const schema = new ReportSchema();

        mongoose.connect(schema.url);

        console.log('Creating MongoDb Model Schema..');

        this.reportsSchema = mongoose.model('reports', schema.schema);

        console.log('Schema created.');
        }

    public getReports(callback: any) {
        this.reportsSchema.find(callback);
    }

    public getReport(id: string, callback: any) {
        this.reportsSchema.findOne({ _id: id }, callback);
    }
}


