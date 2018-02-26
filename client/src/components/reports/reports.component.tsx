import * as React from 'react';
import {ReportSummary} from '../../models/report.models';
import {ReportSummaryComponent} from '../report-summary/report-summary.component';
import {RouteProps} from 'react-router';

export interface ReportsProps extends RouteProps {
  reports: ReportSummary[];
  error?: string;
  onMount: () => void;
  onUnmount: () => void;
}

export class ReportsComponent extends React.Component<ReportsProps> {

  constructor(props: ReportsProps) {
    super(props);
  }

  componentDidMount() {
    this.props.onMount();
  }

  componentWillUnmount() {
    this.props.onUnmount();
  }

  render() {
    const { reports } = this.props;
    return (
      <div className="row justify-content-center">
        {reports && reports.map(report =>
          <ReportSummaryComponent key={report._id} report={report} />)}
      </div>
    );
  }
}