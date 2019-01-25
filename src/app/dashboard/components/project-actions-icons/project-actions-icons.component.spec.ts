import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectActionsIconsComponent } from './project-actions-icons.component';

describe('ProjectActionsIconsComponent', () => {
  let component: ProjectActionsIconsComponent;
  let fixture: ComponentFixture<ProjectActionsIconsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectActionsIconsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectActionsIconsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
