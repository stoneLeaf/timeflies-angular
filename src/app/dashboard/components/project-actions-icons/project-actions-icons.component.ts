import { Component, Input, Output, EventEmitter } from '@angular/core';

import { ProjectService } from 'src/app/services/project.service';
import { ToastService } from 'src/app/services/toast.service';

import { Project } from 'src/app/shared/models/project.model';
import { NotFoundError } from 'src/app/shared/errors/not-found.error';

@Component({
  selector: 'app-project-actions-icons',
  templateUrl: './project-actions-icons.component.html',
  styleUrls: ['./project-actions-icons.component.scss']
})
export class ProjectActionsIconsComponent {
  @Input() project: Project;
  @Output() deletion = new EventEmitter<boolean>();

  constructor(private projectService: ProjectService,
              private toastService: ToastService) { }

  delete() {
    // TODO: use and implement a modal system instead
    // TODO: find a way to make sure the request is not made several time
    if (!confirm(`Are you sure you want to delete the '${this.project.name}' project?`)) {
      return;
    }
    this.projectService.delete(this.project).subscribe(
      () => {
        this.deletion.emit(true);
        this.toastService.success('Project successfully deleted.', true);
      },
      error => {
        if (error instanceof NotFoundError) {
          this.toastService.warning(`Project to be deleted was not found.`, true);
        } else {
          this.toastService.warning(`Project could not be deleted (status ${error.status}).`, true);
        }
    });
  }
}
