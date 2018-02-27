import {Report, ReportSummary} from '../models/report.models';
import {applyMiddleware, combineReducers, createStore} from 'redux';
import {appReducer} from './reducer';
import {ReportTickerMiddleware} from './middleware';
import {ReportsService} from '../services/reports.service';
import {SocketService} from '../services/socket.service';
import {composeWithDevTools} from 'redux-devtools-extension';

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

// Google Chrome Redux Devtools

const store = createStore(reducers, composeWithDevTools(
  applyMiddleware(...reportTickerMiddleware.middleware)
));

export default store;
