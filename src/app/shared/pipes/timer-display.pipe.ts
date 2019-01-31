import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timerDisplay'
})
export class TimerDisplayPipe implements PipeTransform {

  transform(value: any): any {
    if (typeof value !== 'number') {
      value = 0;
    }
    const h = Math.floor(value / 3600);
    const m = Math.floor((value - (h * 3600)) / 60);
    const s = value % 60;
    return (h ? h.toString().padStart(2, '0') + ':' : '')
            + m.toString().padStart(2, '0') + ':'
            + s.toString().padStart(2, '0');
  }
}
