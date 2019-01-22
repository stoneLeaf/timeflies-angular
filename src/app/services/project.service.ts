import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Project } from '../shared/models/project.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private http: HttpClient) { }

  create(project: Project): Observable<Project> {
    return this.http.post(`${environment.apiUrl}/projects`, project)
                    .pipe(map(response => {
                      return response['project'] as Project;
                    }));
  }

  getAll(): Observable<Project[]> {
    return this.http.get(`${environment.apiUrl}/projects`)
                    .pipe(map(response => {
                      return response['projects'] as Project[];
                    }));
  }
}
