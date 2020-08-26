import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutMeEducationComponent } from './about-me-education.component';

describe('AboutMeEducationComponent', () => {
  let component: AboutMeEducationComponent;
  let fixture: ComponentFixture<AboutMeEducationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AboutMeEducationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutMeEducationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
