import * as React from 'react';
import {RouteComponentProps} from 'react-router';
import {Report} from '../../models/report.models';
import {TableComponent} from '../table/table.component';
import './report.component';

export interface ReportProps extends RouteComponentProps<{ reportId: string }> {
  report: Report;
  onMount: (id: string) => void;
  onUnmount: (is: string) => void;
}

export class ReportComponent extends React.Component<ReportProps> {

  constructor(props: ReportProps) {
    super(props);
  }

  componentDidMount() {
    this.props.onMount(this.props.match.params.reportId);
  }

  componentWillUnmount() {
    this.props.onUnmount(this.props.match.params.reportId);
  }

  render() {
    const {report} = this.props;

    return report ? (
      <div>
        <h2>{report.name}</h2>
        <div className="row justify-content-center">
          <TableComponent rows={report.cells} />
        </div>
      </div>
    ) : <div>No Report</div>;
  }
}