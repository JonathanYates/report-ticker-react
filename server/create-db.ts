import * as mongoose from 'mongoose';
import * as utils from './common/utils';
import {ReportSchema} from './config/db';

mongoose.connect('mongodb://localhost/report-ticker');

const db = mongoose.connection;
const schema = new ReportSchema();

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function callback() {
    console.log('connected');

    for (let i = 1; i <= 30; i++) {

      const Report = mongoose.model('reports', schema.schema);

      const report = new Report({
        name: 'Report ' + i,
        value: 0,
        change: 0,
        cells: []
      });

      const rowCount = utils.getRandom(10, 25);
      const colCount = utils.getRandom(8, 12);

      for (let rowIndex = 0; rowIndex < rowCount; rowIndex++) {
        const row = [];

        for (let colIndex = 1; colIndex < colCount; colIndex++) {
          const cell = {
            value: utils.getRandom(-10000, 10000),
            change: utils.getRandom(-100, 100)
          };

          row.push(cell);

          report.value += cell.value;
          report.change += cell.change;
        }

        report.cells.push(row);
      }

      report.save();
    }

    console.log('Created db successfully');
    // process.exit(0);
  }
);