"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bodyParser = require("body-parser");
const express = require("express");
const reports_controller_1 = require("./reports.controller");
const reports_repository_1 = require("./reports.repository");
const reports_router_1 = require("./reports.router");
const ticker_service_1 = require("./ticker.service");
class ReportsServer {
    start() {
        const app = express();
        const http = require('http');
        const server = http.Server(app);
        this.configure(app, server);
        this.listen(server);
    }
    configure(app, server) {
        app.use((req, res, next) => {
            res.header('Access-Control-Allow-Origin', '*');
            res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
            next();
        });
        app.use(bodyParser.json());
        app.use(express.static('public'));
        const repository = new reports_repository_1.ReportsRepository();
        const controller = new reports_controller_1.ReportsController(repository);
        const router = new reports_router_1.ReportsRouter(controller);
        app.use('/api/reports', router.routes);
        app.get('/*', (req, res) => {
            res.sendFile('./public/index.html');
        });
        const tickerService = new ticker_service_1.TickerService(server, repository);
        tickerService.listen();
    }
    listen(server) {
        const port = process.env.PORT || 3200;
        server.listen(port, () => {
            console.log('report ticker server listening on port' + port);
        });
    }
}
exports.ReportsServer = ReportsServer;
//# sourceMappingURL=reports.server.js.map