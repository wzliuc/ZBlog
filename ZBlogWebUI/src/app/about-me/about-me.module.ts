import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutMeListComponent } from './about-me-list/about-me-list.component';
import { AboutMeEducationComponent } from './about-me-education/about-me-education.component';
import { AboutMeRoutingModule } from './about-me-routing.module';
import { AboutMeExperienceComponent } from './about-me-experience/about-me-experience.component';
import { AboutMeSkillsComponent } from './about-me-skills/about-me-skills.component';

@NgModule({
  declarations: [
    AboutMeListComponent, 
    AboutMeEducationComponent, 
    AboutMeExperienceComponent, 
    AboutMeSkillsComponent
  ],
  imports: [
    CommonModule,
    AboutMeRoutingModule
  ]
})
export class AboutMeModule { }
