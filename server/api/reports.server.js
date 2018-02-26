"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const bodyParser = require("body-parser");
const reports_router_1 = require("./reports.router");
const reports_repository_1 = require("./reports.repository");
const ticker_service_1 = require("./ticker.service");
const reports_controller_1 = require("./reports.controller");
class ReportsServer {
    start() {
        let app = express();
        let http = require('http');
        let server = http.Server(app);
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
        let repository = new reports_repository_1.ReportsRepository();
        const controller = new reports_controller_1.ReportsController(repository);
        let router = new reports_router_1.ReportsRouter(controller);
        app.use('/api/reports', router.routes);
        app.get('/*', (req, res) => {
            res.sendFile('./public/index.html');
        });
        let tickerService = new ticker_service_1.TickerService(server, repository);
        tickerService.listen();
    }
    listen(server) {
        let port = process.env.PORT || 3200;
        server.listen(port, function () {
            console.log('report ticker server listening on port' + port);
        });
    }
}
exports.ReportsServer = ReportsServer;
//# sourceMappingURL=reports.server.js.map