import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule, NgbDateAdapter, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { AboutMeListComponent } from './about-me-list/about-me-list.component';
import { AboutMeEducationComponent } from './about-me-education/about-me-education.component';
import { AboutMeRoutingModule } from './about-me-routing.module';
import { AboutMeExperienceComponent } from './about-me-experience/about-me-experience.component';
import { AboutMeSkillsComponent } from './about-me-skills/about-me-skills.component';
import { ExperienceEditComponent } from './about-me-experience/experience-edit/experience-edit.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CustomAdapter, CustomDateParserFormatter } from './about-me-experience/experience-services/datepicker.adapter';

@NgModule({
  declarations: [
    AboutMeListComponent, 
    AboutMeEducationComponent, 
    AboutMeExperienceComponent, 
    AboutMeSkillsComponent,
    ExperienceEditComponent
  ],
  imports: [
    CommonModule,
    AboutMeRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule
  ],
  providers: [
    {provide: NgbDateAdapter, useClass: CustomAdapter},
    {provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter}
  ]
})
export class AboutMeModule { }
