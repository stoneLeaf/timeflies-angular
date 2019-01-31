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

  projectsVisible = false;
  clickInside = false;

  constructor(private router: Router,
              private activityService: ActivityService,
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

  showProjects() {
    this.projectsVisible = true;
  }

  newProject() {
    this.projectsVisible = false;
    this.router.navigateByUrl('/projects/new');
  }

  recordIn(project: Project) {
    const activity = new Activity();
    activity.startDate = new Date();
    this.activityService.createInProject(activity, project).subscribe();
    this.projectsVisible = false;
  }

  stop(activity: Activity) {
    activity.endDate = new Date();
    this.activityService.update(activity).subscribe();
  }

  @HostListener('click')
  onClickInside() {
    this.clickInside = true;
  }

  @HostListener('document:click')
  onDocumentClick() {
    if (this.clickInside) {
      this.clickInside = false;
      return;
    }
    this.projectsVisible = false;
  }
}
