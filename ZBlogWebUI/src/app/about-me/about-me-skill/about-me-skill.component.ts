import { Component, OnInit } from '@angular/core';
import { Skill } from '../about-me-sections.interface';
import { SkillService } from './skill-services/skill.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'zblog-about-me-skill',
  templateUrl: './about-me-skill.component.html',
  styleUrls: ['./about-me-skill.component.css']
})
export class AboutMeSkillComponent implements OnInit {
  mySkill$: Observable<Skill[]>;

  constructor(private skillService: SkillService) { }

  ngOnInit(): void {
    this.mySkill$ = this.skillService.skills$;
  }

}
