import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Activity } from 'src/app/shared/models/activity.model';

@Component({
  selector: 'app-activity-row',
  templateUrl: './activity-row.component.html',
  styleUrls: ['./activity-row.component.scss']
})
export class ActivityRowComponent implements OnInit {
  @Input() activity: Activity;
  @Output() deletion = new EventEmitter<boolean>();

  duration: number;

  constructor() { }

  ngOnInit() {
    if (this.activity.endDate) {
      this.duration = (new Date(this.activity.endDate).getTime()
                      - new Date(this.activity.startDate).getTime()) / 1000;
    }
  }

  delete() {
    this.deletion.emit(true);
  }
}
