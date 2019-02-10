import { Component, OnInit } from '@angular/core';

import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { StatService } from 'src/app/services/stat.service';
import { ProjectStat } from 'src/app/shared/models/project-stat.model';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})
export class SummaryComponent implements OnInit {
  last7DaysData$: Observable<any[]>;

  constructor(private statService: StatService) { }

  ngOnInit() {
    const endDay = new Date();
    const startDay = new Date(new Date().setDate(endDay.getDate() - 6));
    this.last7DaysData$ = this.statService.getForAllProjects(startDay, endDay).pipe(
      switchMap((globalStats: ProjectStat) => {
        const single = [];
        for (const day of globalStats.days) {
          const value = (day.timeCount / 3600);
          single.push({ name: new Date(day.day).toLocaleDateString(), value: value });
        }
        return of(single);
    }));
  }

  formatYAxisTick(hour: number) {
    return `${hour}h`;
  }
}
