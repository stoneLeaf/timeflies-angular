import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Observable, throwError, of } from 'rxjs';
import { switchMap, catchError, tap } from 'rxjs/operators';

import { ProjectService } from 'src/app/services/project.service';
import { ActivityService } from 'src/app/services/activity.service';
import { ToastService } from 'src/app/services/toast.service';
import { StatService } from 'src/app/services/stat.service';

import { NotFoundError } from 'src/app/shared/errors/not-found.error';

import { Project } from 'src/app/shared/models/project.model';
import { Activity } from 'src/app/shared/models/activity.model';
import { ProjectStat } from 'src/app/shared/models/project-stat.model';

@Component({
  selector: 'app-project-view',
  templateUrl: './project-view.component.html',
  styleUrls: ['./project-view.component.scss']
})
export class ProjectViewComponent implements OnInit {
  project$: Observable<Project>;
  activities: Activity[];

  last30DaysData$: Observable<any[]>;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private toastService: ToastService,
              private projectService: ProjectService,
              private activitiesService: ActivityService,
              private statService: StatService) { }

  ngOnInit() {
    this.project$ = this.route.paramMap.pipe(switchMap(params => {
      return this.projectService.getById(params.get('id')).pipe(
        tap(project => {
          // TODO: unsubscribe
          this.activitiesService.getFromProject(project).subscribe(activities => {
            this.activities = activities;
          });

          // Retrieving project stats
          const endDay = new Date();
          const startDay = new Date(new Date().setDate(endDay.getDate() - 29));
          this.last30DaysData$ = this.statService.getForProject(project, startDay, endDay).pipe(
            switchMap((globalStats: ProjectStat) => {
              const single = [];
              for (const day of globalStats.days) {
                single.push({ name: new Date(day.day).toLocaleDateString(), value: (day.timeCount / 3600) });
              }
              return of(single);
          }));
        }),
        // TODO: not DRY, same pattern in ProjectEditComponent
        catchError(error => {
          if (error instanceof NotFoundError) {
            // TODO: kinda hacky to navigate to wildcard route
            this.router.navigate(['/not_found'], { skipLocationChange: true });
            this.toastService.warning('Project not found.');
          }
          return throwError(error);
        }));
    }));
  }

  onProjectDelete() {
    this.router.navigate(['/projects']);
  }

  onActivityDelete(activityToDelete: Activity) {
    this.activitiesService.delete(activityToDelete).subscribe(_ => {
      this.activities = this.activities.filter(activity => activity.id !== activityToDelete.id);
      this.toastService.success('Activity successfully deleted.');
    });
  }
}
