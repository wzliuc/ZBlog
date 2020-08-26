import { Component, OnInit } from '@angular/core';
import { ExperienceService } from '../about-me-experience/experience-services/experience.service';
import { EducationService } from '../about-me-education/education-services/education.service';
import { SkillService } from '../about-me-skill/skill-services/skill.service';

@Component({
  templateUrl: './about-me-list.component.html',
  styleUrls: ['./about-me-list.component.css']
})
export class AboutMeListComponent implements OnInit {

  constructor(private expService: ExperienceService,
              private eduService: EducationService,
              private skillService: SkillService) { }

  ngOnInit(): void {
    this.expService.GetAll();
    this.eduService.GetAll();
    this.skillService.GetAll();
  }

}
