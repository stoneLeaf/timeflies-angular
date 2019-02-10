import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { ToastService } from 'src/app/services/toast.service';
import { ProjectService } from 'src/app/services/project.service';

import { Project } from 'src/app/shared/models/project.model';
import { ValidationError } from 'src/app/shared/errors/validation.error';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-project-new',
  templateUrl: './project-new.component.html',
  styleUrls: ['./project-new.component.scss']
})
export class ProjectNewComponent {
  project = new Project();
  serverReturns$ = new Subject<string>();

  constructor(private router: Router,
              private toastService: ToastService,
              private projectService: ProjectService) { }

  onSubmit(project: Project) {
    this.projectService.create(project)
      .subscribe((serverProject: Project) => {
        this.router.navigate(['projects', serverProject.id]);
        this.toastService.success(`Project '${serverProject.name}' successfully created!`);
      },
      error => {
        if (error instanceof ValidationError) {
          this.serverReturns$.next(error.message);
        } else {
          this.serverReturns$.next('');
        }
      });
  }
}
