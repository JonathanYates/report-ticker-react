import {Report, ReportSummary} from '../models/report.models';
import {applyMiddleware, combineReducers, createStore} from 'redux';
import {appReducer} from './reducer';
import {ReportTickerMiddleware} from './middleware';
import {ReportsService} from '../services/reports.service';
import {SocketService} from '../services/socket.service';

export interface AppState {
  reports: ReportSummary[];
  selected?: Report;
}

export interface State {
  app: AppState;
}

const reducers = combineReducers({
  app: appReducer
});

let socketService =new SocketService();
let reportService = new ReportsService(socketService);
let reportTickerMiddleware = new ReportTickerMiddleware(reportService);

const store = createStore(reducers, applyMiddleware(...reportTickerMiddleware.middleware));

export default store;
