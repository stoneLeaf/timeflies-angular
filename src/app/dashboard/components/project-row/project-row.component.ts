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

  lastActivityDate$: Observable<Date>;

  // Had to use these booleans to be able to discriminate between loading,
  // no last activity and last activity found. The ngIf & async pipe were not
  // enough as it does not differentiate between null and undefined for instance.
  loadingActivity = true;
  noActivity = false;

  constructor(private activityService: ActivityService) { }

  ngOnInit() {
    this.lastActivityDate$ = this.activityService.getLastFor(this.project).pipe(
      switchMap(activity => {
        this.loadingActivity = false;
        if (activity) {
          return of(new Date(activity.startDate));
        }
        this.noActivity = true;
        return of();
      }
    ));
  }
}
