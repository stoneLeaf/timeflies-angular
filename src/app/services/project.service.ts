import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { Project } from '../shared/models/project.model';
import { environment } from 'src/environments/environment';
import { NotFoundError } from '../shared/errors/not-found.error';

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

  update(project: Project): Observable<Project> {
    return this.http.patch(`${environment.apiUrl}/projects/${project.id}`, project)
                    .pipe(map(response => {
                      return response['project'] as Project;
                    }));
  }

  getById(id: string): Observable<Project> {
    return this.http.get(`${environment.apiUrl}/projects/${id}`)
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
