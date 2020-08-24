import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { AboutMeListComponent } from './about-me-list/about-me-list.component';
import { AboutMeEducationComponent } from './about-me-education/about-me-education.component';
import { AboutMeExperienceComponent } from './about-me-experience/about-me-experience.component';
import { AboutMeSkillsComponent } from './about-me-skills/about-me-skills.component';
import { ExperienceEditComponent } from './about-me-experience/experience-edit/experience-edit.component';
import { EducationEditComponent } from './about-me-education/education-edit/education-edit.component';

const routes: Routes = [
  {path:'aboutme', component: AboutMeListComponent, children: [
    {path: '', redirectTo: '/aboutme/experience', pathMatch: 'full'},
    {path: 'experience/:id', component: ExperienceEditComponent},
    {path: 'experience', component: AboutMeExperienceComponent},
    {path: 'education/:id', component: EducationEditComponent},
    {path: 'education', component: AboutMeEducationComponent},
    {path: 'skills', component: AboutMeSkillsComponent},
  ]},
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    ReactiveFormsModule
  ],
  exports: [RouterModule]
})
export class AboutMeRoutingModule { }
