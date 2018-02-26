import {Direction} from '../models/report.models';

export const directionClass = (direction: Direction) => {
  switch (direction) {
    case Direction.Up :
      return 'tile-up';
    case Direction.Down :
      return 'tile-down';
    default:
      return '';
  }
};

export const directionArrow = (direction: Direction, size?: string) => {
  switch (direction) {
    case Direction.Up :
      return `fa fa-arrow-up change-arrow-up ${size}`;
    case Direction.Down :
      return `fa fa-arrow-down change-arrow-down ${size}`;
    default:
      return '';
  }
};
