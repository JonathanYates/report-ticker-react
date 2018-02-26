"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const reports_server_1 = require("./api/reports.server");
function start() {
    const reportsServer = new reports_server_1.ReportsServer();
    reportsServer.start();
}
start();
//# sourceMappingURL=server.js.map