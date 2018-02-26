import * as React from 'react';
import './table.component.css';
import {Cell, changeDirection} from '../../models/report.models';
import {directionArrow, directionClass} from '../utils';
import NumberFormatOptions = Intl.NumberFormatOptions;

export interface CellProps {
  cell: Cell;
}

export const CellComponent = (props: CellProps) => {
  const {cell} = props;
  const direction = changeDirection(cell);
  const cellClass = `cell ${directionClass(direction)}`;
  const tileArrow = directionArrow(direction);

  const currencyStyle: NumberFormatOptions = {
    style: 'currency',
    currency: 'GBP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  };
  const currencyFormat = new Intl.NumberFormat('en-GB', currencyStyle);
  const value = currencyFormat.format(cell.value);
  const change = currencyFormat.format(cell.change);


  return (
    <td key={cell.value} className={cellClass}>
      <div className="float-left">
        <div>{value}</div>
        <div><i>{change}</i></div>
      </div>
      <div className="float-right">
        <i className={tileArrow} />
      </div>
    </td>
  );
};

export interface RowProps {
  row: Cell[];
}

export const RowComponent = (props: RowProps) => {
  const { row } = props;
  const cells = row.map((cell, i) => <CellComponent key={i} cell={cell}/>);
  return <tr>{cells}</tr>;
};

export interface TableProps {
  rows: Cell[][];
}

export const TableComponent = (props: TableProps) => {
  const { rows } = props;
  return (
    <table>
      <tbody>{rows.map((row, i) => <RowComponent key={i} row={row}/>)}</tbody>
    </table>
  );
};


