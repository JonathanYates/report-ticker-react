import {ReportsServer} from './api/reports.server';

function start() {
    let reportsServer = new ReportsServer();
    reportsServer.start();
}

start();

