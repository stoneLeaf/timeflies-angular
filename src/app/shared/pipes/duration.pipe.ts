import { Pipe, PipeTransform } from '@angular/core';

const hourDuration = 3600;
const dayDuration = hourDuration * 24;
const monthDuration = dayDuration * 30;
const yearDuration = 365 * 3600 * 24;


@Pipe({
  name: 'duration'
})
export class DurationPipe implements PipeTransform {

  transform(duration: number): string {
    const years = Math.floor(duration / yearDuration);
    duration -= yearDuration * years;
    const months = Math.floor(duration / monthDuration);
    duration -= monthDuration * months;
    const days = Math.floor(duration / dayDuration);
    duration -= dayDuration * days;
    const hours = Math.floor(duration / hourDuration);
    duration -= hourDuration * hours;
    const minutes = Math.floor(duration / 60);
    const seconds = Math.floor(duration - (60 * minutes));
    return (years ? `${years}y ` : '')
            + (months ? `${months}m ` : '')
            + (days ? `${days}d ` : '')
            + `${hours.toString().padStart(2, '0')}h `
            + `${minutes.toString().padStart(2, '0')}mn `
            + `${seconds.toString().padStart(2, '0')}s `;
  }
}
