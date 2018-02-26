import * as React from 'react';
import './report-summary.component.css';
import {changeDirection, ReportSummary} from '../../models/report.models';
import styled from 'styled-components';
import {Link} from 'react-router-dom';
import {directionArrow, directionClass} from '../utils';
import NumberFormatOptions = Intl.NumberFormatOptions;


export interface ReportSummaryProps {
  report: ReportSummary;
}

const Tile = styled.div`
  margin: 5px;
  padding: 5px;
  background-color: #bee6ff;
  text-align: left;
`;

const TileLink = styled(Link)`
  text-decoration: none;
  color: black;
  display: block;
`;

export class ReportSummaryComponent extends React.Component<ReportSummaryProps> {
  render() {
    const {report} = this.props;
    const direction = changeDirection(report);
    const tileClass = `col-sm-2 ${directionClass(direction)}`;
    const tileArrow = directionArrow(direction, 'fa-lg');
    const link = `/report/${report._id}`;

    const currencyStyle: NumberFormatOptions = {
      style: 'currency',
      currency: 'GBP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    };
    const currencyFormat = new Intl.NumberFormat('en-GB', currencyStyle);
    const value = currencyFormat.format(report.value);
    const change = currencyFormat.format(report.change);

    return (
      <Tile key={report.value} className={tileClass} style={{paddingRight: '5px'}}>
        <TileLink to={link}>
          <div>
            <div className="float-left">
              <div><b>{report.name}</b></div>
              <div>Value: {value}</div>
              <div><i>Change: {change}</i></div>
            </div>
            <div className="float-right align-bottom">
              <i className={tileArrow}/>
            </div>
          </div>
        </TileLink>
      </Tile>
    );
  }
}