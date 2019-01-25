import { Component, OnInit } from '@angular/core';

import { ProjectService } from 'src/app/services/project.service';
import { ToastService } from 'src/app/services/toast.service';

import { NotFoundError } from 'src/app/shared/errors/not-found.error';

import { Project } from 'src/app/shared/models/project.model';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {
  projects: Project[];

  constructor(private projectService: ProjectService,
              private toastService: ToastService) { }

  ngOnInit() {
    this.projectService.getAll().subscribe(projects => this.projects = projects);
  }

  delete(project: Project) {
    // TODO: use and implement a modal system instead
    // TODO: find a way to make sure the request is not made several time
    if (!confirm(`Are you sure you want to delete the '${project.name}' project?`)) {
      return;
    }
    this.projectService.delete(project).subscribe(
      () => {
        this.removeProject(project);
        this.toastService.success('Project successfully deleted.');
      },
      error => {
        if (error instanceof NotFoundError) {
          this.removeProject(project);
        } else {
          this.toastService.warning(`Project could not be deleted (status ${error.status}).`);
        }
    });
  }

  removeProject(project: Project) {
    // Copying the array forces a change detection
    this.projects = this.projects.filter(value => value.id !== project.id);
  }
}
