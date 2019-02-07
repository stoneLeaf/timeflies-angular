import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { Project } from '../shared/models/project.model';
import { ProjectStat } from '../shared/models/project-stat.model';

@Injectable({
  providedIn: 'root'
})
export class StatService {
  constructor(private http: HttpClient) { }

  getForAllProjects(firstDay?: Date, lastDay?: Date): Observable<ProjectStat> {
    return this.getForProject(null, firstDay, lastDay);
  }

  getForProject(project: Project, firstDay?: Date, lastDay?: Date): Observable<ProjectStat> {
    const params = {};
    if (firstDay && lastDay) {
      params['firstDay'] = firstDay.getTime();
      params['lastDay'] = lastDay.getTime();
    }
    let endpoint = `${environment.apiUrl}/stats/projects`;
    if (project !== null) {
      endpoint += `/${project.id}`;
    }
    return this.http.get(endpoint, { params: params })
                    .pipe(map(response => {
                      return response as ProjectStat;
                    }));
  }
}
