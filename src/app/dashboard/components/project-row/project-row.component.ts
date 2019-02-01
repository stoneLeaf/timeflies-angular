import { Component, Input } from '@angular/core';

import { Project } from 'src/app/shared/models/project.model';

@Component({
  selector: 'app-project-row',
  templateUrl: './project-row.component.html',
  styleUrls: ['./project-row.component.scss']
})
export class ProjectRowComponent {
  @Input() project: Project;
}
