import { Component, Input, OnInit } from '@angular/core';

import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { Project } from 'src/app/shared/models/project.model';
import { ActivityService } from 'src/app/services/activity.service';

@Component({
  selector: 'app-project-row',
  templateUrl: './project-row.component.html',
  styleUrls: ['./project-row.component.scss']
})
export class ProjectRowComponent implements OnInit  {
  @Input() project: Project;

  lastActivity: Date;
  lastActivityDate$: Observable<Date>;

  constructor(private activityService: ActivityService) { }

  ngOnInit() {
    this.lastActivityDate$ = this.activityService.getLastFor(this.project).pipe(
      switchMap(activity => {
        if (activity) {
          return of(new Date(activity.startDate));
        }
        return of();
      }
    ));
  }
}
