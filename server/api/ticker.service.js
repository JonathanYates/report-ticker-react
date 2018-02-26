"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const socketIO = require("socket.io");
const utils_1 = require("../common/utils");
class TickerService {
    constructor(server, reportsRepository) {
        this.reportsRepository = reportsRepository;
        this.lowerTick = 500;
        this.upperTick = 1000;
        this.reports = null;
        this.ticking = false;
        this.io = socketIO(server);
    }
    listen() {
        const self = this;
        this.io.sockets.on('connection', (socket) => {
            console.log('User connected');
            socket.on('disconnect', () => {
                console.log('User disconnected');
            });
            if (!self.ticking) {
                self.tick();
            }
        });
    }
    tick() {
        this.ticking = true;
        setTimeout(() => {
            if (!this.reports) {
                this.reportsRepository.getReports((error, data) => {
                    this.reports = data;
                    this.update(this.reports);
                });
            }
            else {
                this.update(this.reports);
            }
        }, utils_1.getRandom(this.lowerTick, this.upperTick));
    }
    update(reports) {
        const reportsUpdateCount = utils_1.getRandom(0, reports.length - 1);
        for (let index = 0; index < reportsUpdateCount; index++) {
            const cells = [];
            const report = reports[utils_1.getRandom(0, reports.length - 1)];
            const rowUpdates = utils_1.getRandom(1, report.cells.length - 1);
            for (let r = 0; r < rowUpdates; r++) {
                const rowIndex = utils_1.getRandom(0, report.cells.length - 1);
                const row = report.cells[rowIndex];
                const columnCount = utils_1.getRandom(1, row.length - 1);
                for (let c = 0; c < columnCount; c++) {
                    const cellIndex = utils_1.getRandom(0, row.length - 1);
                    const cell = row[cellIndex];
                    const multiple = utils_1.getRandom(-1, 1);
                    let percentage = Math.random() * 0.02;
                    if (multiple === -1) {
                        percentage = percentage * -1;
                    }
                    const change = Math.round(cell.value * percentage);
                    if (change === 0) {
                        continue;
                    }
                    cell.value += change;
                    cell.change = change;
                    cells.push({
                        change: cell.change,
                        columnIndex: cellIndex,
                        rowIndex,
                        value: cell.value
                    });
                }
            }
            const name = 'report/' + report._id;
            this.io.sockets.emit(name, {
                _id: report._id,
                cells
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
        }
        else {
            this.ticking = false;
        }
    }
    static getSummary(report) {
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
            value,
            change: 0
        };
        if (change !== 0) {
            summary.change = change;
        }
        return summary;
    }
}
exports.TickerService = TickerService;
//# sourceMappingURL=ticker.service.js.map