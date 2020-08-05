import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectPdfComponent } from './project-pdf.component';

describe('ProjectPdfComponent', () => {
  let component: ProjectPdfComponent;
  let fixture: ComponentFixture<ProjectPdfComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectPdfComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectPdfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
