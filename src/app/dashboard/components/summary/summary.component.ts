import { Component, OnInit } from '@angular/core';

import { Observable, of } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';

import { StatService } from 'src/app/services/stat.service';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from 'src/app/services/auth.service';
import { ProjectService } from 'src/app/services/project.service';

import { ProjectStat } from 'src/app/shared/models/project-stat.model';
import { Project } from 'src/app/shared/models/project.model';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})
export class SummaryComponent implements OnInit {
  showNotice: boolean;

  last7DaysData$: Observable<any[]>;

  topProjects$: Observable<Project[]>;
  topProjectsStubs: any[];

  constructor(private authService: AuthService,
              private userService: UserService,
              private projectService: ProjectService,
              private statService: StatService) { }

  ngOnInit() {
    this.showNotice = !this.authService.loggedInUser.profile.preferences.seenDashboardNotice;

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

    this.topProjects$ = this.projectService.getAll({ limit: 3, sort: 'totalTime', order: 'desc' })
                          .pipe(tap(projects => {
                            this.topProjectsStubs = Array(3 - projects.length);
                          }));
  }

  closeNotice() {
    this.showNotice = false;
    this.authService.loggedInUser.profile.preferences.seenDashboardNotice = true;
    this.userService.update(this.authService.loggedInUser).subscribe();
  }

  formatYAxisTick(hour: number) {
    return `${hour}h`;
  }
}
