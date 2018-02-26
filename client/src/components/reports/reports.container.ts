import {connect} from 'react-redux';
import {ReportsComponent} from './reports.component';
import {State} from '../../store';
import {Action, Dispatch} from 'redux';
import {endReportsUpdateAction, getReportsRequestAction} from '../../store/actions';

const mapStateToProps = (state: State) => {
  return {
    reports: state.app.reports
  };
};
const mapDispatchToProps = (dispatch: Dispatch<Action>) => {
  return {
    onMount: () => {
      dispatch(getReportsRequestAction());
    },
    onUnmount: () => {
      dispatch(endReportsUpdateAction());
    }
  };
};

export const ReportsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ReportsComponent);
