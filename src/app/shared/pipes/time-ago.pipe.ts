import { Pipe, PipeTransform } from '@angular/core';

class TimeFrame {
  constructor(readonly name: string,
              readonly duration: number,
              readonly threshold?: number) {}

  apply(seconds: number): string {
    const value = Math.floor(seconds / this.duration);
    return `${value} ${this.name}${value > 1 ? 's' : ''} ago`;
  }
}

const timeFrames = [
  new TimeFrame('second', 1, 60),
  new TimeFrame('minute', 60, 3600),
  new TimeFrame('hour', 3600, 24 * 3600),
  new TimeFrame('day', 24 * 3600, 30 * 24 * 3600),
  new TimeFrame('month', 30 * 24 * 3600, 365 * 24 * 3600),
  new TimeFrame('year', 365 * 24 * 3600)
];

@Pipe({
  name: 'timeAgo'
})
export class TimeAgoPipe implements PipeTransform {

  transform(date: any): string {
    if (!(date instanceof Date)) {
      return 'never';
    }

    const delta = Math.floor((new Date().getTime() - date.getTime()) / 1000);
    return timeFrames.filter(timeFrame => delta < (timeFrame.threshold || delta + 1))[0].apply(delta);
  }
}
