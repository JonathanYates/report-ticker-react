import {getRandom} from '../common/utils';
import {ReportsRepository} from './reports.repository';
import * as socketIO from 'socket.io';
import {Server} from 'http';

export class TickerService {

  private io: any;
  private lowerTick = 500;
  private upperTick = 1000;
  private reports = null;
  private ticking = false;

  constructor(server: Server, private reportsRepository: ReportsRepository) {
    this.io = socketIO(server);
  }

  public listen() {

    const self = this;

    this.io.sockets.on('connection', (socket: any) => {
      console.log('User connected');

      socket.on('disconnect', function () {
        console.log('User disconnected');
      });

      if (!self.ticking) {
        self.tick();
      }
    });
  }

  public tick() {
    this.ticking = true;

    setTimeout(() => {

      if (!this.reports) {
        this.reportsRepository.getReports((error: Error, data: any) => {
          this.reports = data;
          this.update(this.reports);
        });
      } else {
        this.update(this.reports);
      }

    }, getRandom(this.lowerTick, this.upperTick));
  }

  update(reports) {
    const reportsUpdateCount = getRandom(0, reports.length - 1);

    for (let index = 0; index < reportsUpdateCount; index++) {

      const cells = [];
      const report = reports[getRandom(0, reports.length - 1)];

      const rowUpdates = getRandom(1, report.cells.length - 1);

      for (let r = 0; r < rowUpdates; r++) {
        const rowIndex = getRandom(0, report.cells.length - 1);
        const row = report.cells[rowIndex];

        const columnCount = getRandom(1, row.length - 1);

        for (let c = 0; c < columnCount; c++) {
          const cellIndex = getRandom(0, row.length - 1);

          const cell = row[cellIndex];

          const multiple = getRandom(-1, 1);
          let percentage = Math.random() * 0.02;

          if (multiple === -1) {
            percentage = percentage * -1;
          }

          const change = Math.round(cell.value * percentage);

          if (change === 0) continue;

          cell.value += change;
          cell.change = change;

          cells.push({
            value: cell.value,
            change: cell.change,
            rowIndex: rowIndex,
            columnIndex: cellIndex
          });
        }
      }

      const name = 'report/' + report._id;
      this.io.sockets.emit(name, {
        _id: report._id,
        cells: cells
      });

      const summary = TickerService.getSummary(report);
      report.value = summary.value;
      report.change = summary.change;
      report.save();
      this.io.sockets.emit('reports/update', summary);
    }

    const clients = this.io.engine.clientsCount;

    if (clients > 0) {
      this.tick();
    } else {
      this.ticking = false;
    }
  }

  static getSummary(report): any {
    let value = 0;

    for (let i = 0; i < report.cells.length; i++) {
      const row = report.cells[i];
      for (let j = 0; j < row.length; j++) {
        const cell = row[j];
        value += cell.value;
      }
    }

    const change = value - report.value;

    const summary = {
      _id: report._id,
      name: report.name,
      value: value,
      change: 0
    };

    if (change !== 0) {
      summary.change = change;
    }

    return summary;
  }
}
