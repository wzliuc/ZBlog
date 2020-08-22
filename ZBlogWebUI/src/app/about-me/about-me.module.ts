import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AboutMeListComponent } from './about-me-list/about-me-list.component';
import { AboutMeEducationComponent } from './about-me-education/about-me-education.component';
import { AboutMeRoutingModule } from './about-me-routing.module';
import { AboutMeExperienceComponent } from './about-me-experience/about-me-experience.component';
import { AboutMeSkillsComponent } from './about-me-skills/about-me-skills.component';
import { ExperienceEditComponent } from './about-me-experience/experience-edit/experience-edit.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AboutMeListComponent, 
    AboutMeEducationComponent, 
    AboutMeExperienceComponent, 
    AboutMeSkillsComponent, ExperienceEditComponent
  ],
  imports: [
    CommonModule,
    AboutMeRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ]
})
export class AboutMeModule { }
