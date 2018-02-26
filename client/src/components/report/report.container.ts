import {connect} from 'react-redux';
import {ReportComponent} from './report.component';
import {withRouter} from 'react-router';
import {Dispatch} from 'redux';
import {State} from '../../store';
import {endReportUpdatesAction, getReportRequestAction, ReportsAction} from '../../store/actions';

const mapStateToProps = (state: State) => {
  return {
    report: state.app.selected
  };
};

const mapDispatchToProps = (dispatch: Dispatch<ReportsAction>) => {
  return {
    onMount: (id: string) => {
      dispatch(getReportRequestAction(id));
    },
    onUnmount: (id: string) => {
      dispatch(endReportUpdatesAction(id));
    }
  };
};

export const ReportContainer =
  withRouter(connect(mapStateToProps, mapDispatchToProps)(ReportComponent));