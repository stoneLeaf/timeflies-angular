import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { Activity } from '../shared/models/activity.model';
import { Project } from '../shared/models/project.model';

@Injectable({
  providedIn: 'root'
})
export class ActivityService {
  private _current$: BehaviorSubject<Activity>;

  constructor(private http: HttpClient) {
    this._current$ = new BehaviorSubject(undefined);
    this.getRunningActivity().subscribe(activity => {
      if (activity) {
        this._current$.next(activity);
      }
    });
  }

  get current$() {
    return this._current$.asObservable();
  }

  createInProject(activity: Activity, project: Project): Observable<Activity> {
    return this.http.post(`${environment.apiUrl}/projects/${project.id}/activities`, activity)
                    .pipe(map(response => {
                      const createdActivity = response['activity'] as Activity;
                      this._current$.next(createdActivity);
                      return createdActivity;
                    }));
  }

  getFromProject(project: Project): Observable<Activity[]> {
    return this.http.get(`${environment.apiUrl}/projects/${project.id}/activities`)
                    .pipe(map(response => {
                      return response['activities'] as Activity[];
                    }));
  }

  getRunningActivity(): Observable<Activity> {
    return this.getAll(1).pipe(
      map((activity: Activity[]) => {
        if (activity[0] && activity[0].endDate) {
          return undefined;
        } else {
          return activity[0];
        }
      }));
  }

  getAll(limit?: number, offset?: number): Observable<Activity[]> {
    const params = { 'limit': (limit || 5).toString(), 'offset': (offset || 0).toString() };
    return this.http.get(`${environment.apiUrl}/activities`, { params: params })
                    .pipe(map(response => {
                      return response['activities'] as Activity[];
                    }));
  }

  getById(id: string): Observable<Activity> {
    return this.http.get(`${environment.apiUrl}/activities/${id}`)
                    .pipe(map(response => {
                      return response['activity'] as Activity;
                    }));
  }

  update(activity: Activity): Observable<Activity> {
    const currentActivity = this._current$.getValue();
    if (currentActivity && currentActivity.id === activity.id && activity.endDate) {
      this._current$.next(undefined);
    }
    return this.http.patch(`${environment.apiUrl}/activities/${activity.id}`, activity)
                    .pipe(map(response => {
                      return response['activity'] as Activity;
                    }));
  }

  delete(activity: Activity): Observable<any> {
    if (this._current$.getValue() && this._current$.getValue().id === activity.id) {
      this._current$.next(undefined);
    }
    return this.http.delete(`${environment.apiUrl}/activities/${activity.id}`);
  }

  getLastFor(project: Project): Observable<Activity> {
    const params = { 'limit': '1', 'offset': '0' };
    return this.http.get(`${environment.apiUrl}/projects/${project.id}/activities`, { params: params })
                    .pipe(map(response => {
                      if (response['activities'].length > 0) {
                        return response['activities'][0] as Activity;
                      }
                      return undefined;
                    }));
  }
}
