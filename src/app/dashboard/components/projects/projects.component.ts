import { Component, OnInit } from '@angular/core';

import { ProjectService } from 'src/app/services/project.service';

import { Project } from 'src/app/shared/models/project.model';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {
  projects: Project[];

  constructor(private projectService: ProjectService) { }

  ngOnInit() {
    this.projectService.getAll().subscribe(projects => this.projects = projects);
  }

  onDelete(project: Project) {
    // Copying the array forces a change detection
    this.projects = this.projects.filter(value => value.id !== project.id);
  }
}
