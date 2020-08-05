import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutMeSkillsComponent } from './about-me-skills.component';

describe('AboutMeSkillsComponent', () => {
  let component: AboutMeSkillsComponent;
  let fixture: ComponentFixture<AboutMeSkillsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AboutMeSkillsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutMeSkillsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
