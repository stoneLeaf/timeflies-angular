export class ProjectStatDay {
  day: Date;
  timeCount: number;
}

export class ProjectStat {
  globalTimeCount: number;
  intervalTimeCount: number;
  days: Array<ProjectStatDay>;
}
