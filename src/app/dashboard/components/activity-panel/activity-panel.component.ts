import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';

import { Observable, timer } from 'rxjs';
import { tap, map } from 'rxjs/operators';

import { ActivityService } from 'src/app/services/activity.service';
import { Activity } from 'src/app/shared/models/activity.model';
import { ProjectService } from 'src/app/services/project.service';
import { Project } from 'src/app/shared/models/project.model';

@Component({
  selector: 'app-activity-panel',
  templateUrl: './activity-panel.component.html',
  styleUrls: ['./activity-panel.component.scss']
})
export class ActivityPanelComponent implements OnInit {
  runningActivity$: Observable<Activity>;
  timer$: Observable<number>;
  projects$: Observable<Project[]>;

  dropdownVisible = false;
  ignoreClick = false;

  waiting = false;

  constructor(private activityService: ActivityService,
              private projectService: ProjectService) { }

  ngOnInit() {
    this.runningActivity$ = this.activityService.current$.pipe(
      tap(activity => {
        if (!activity) {
          return;
        }
        const initialTimerValue = Math.floor(((new Date()).getTime() - new Date(activity.startDate).getTime()) / 1000);
        this.timer$ = timer(0, 1000).pipe(
          map(value => {
            return value + initialTimerValue;
          }));
        }));
    this.projects$ = this.projectService.getAll();
  }

  showDropdown() {
    this.dropdownVisible = true;
  }

  recordIn(project: Project) {
    this.waiting = true;
    const activity = new Activity();
    activity.startDate = new Date();
    this.activityService.createInProject(activity, project)
                        .subscribe(_ => {
                            this.waiting = false;
                          });
  }

  stop(activity: Activity) {
    this.waiting = true;
    activity.endDate = new Date();
    this.activityService.update(activity)
                        .subscribe(_ => {
                          this.waiting = false;
                        });
  }

  @HostListener('click', ['$event.target'])
  onClickInside(target) {
    // Only ignore click if not on an anchor tag
    if (target.tagName.toLowerCase() !== 'a') {
      this.ignoreClick = true;
    }
  }

  @HostListener('document:click')
  onDocumentClick() {
    if (this.ignoreClick) {
    // Click on the dropdown menu, so we ignore it and don't hide it
      this.ignoreClick = false;
      return;
    }
    // Click outside the dropdown or on a link, so we hide the dropdown
    this.dropdownVisible = false;
  }
}
