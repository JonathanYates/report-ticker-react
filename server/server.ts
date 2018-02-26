import {ReportsServer} from './api/reports.server';

function start() {
    const reportsServer = new ReportsServer();
    reportsServer.start();
}

start();

