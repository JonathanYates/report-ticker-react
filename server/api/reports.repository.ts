import * as mongoose from 'mongoose';
import {ReportSchema} from '../config/db';
import {Model, Document} from 'mongoose';

export class ReportsRepository {

    reportsSchema:Model<Document>;
    
    constructor() {

        const schema = new ReportSchema();

        mongoose.connect(schema.url);

        console.log('Creating MongoDb Model Schema..');

        this.reportsSchema = mongoose.model('reports', schema.schema);

        console.log('Schema created.');
        }

    getReports(callback) {
        this.reportsSchema.find(callback);
    };

    getReport(id, callback) {
        this.reportsSchema.findOne({ _id: id }, callback);
    };
}


