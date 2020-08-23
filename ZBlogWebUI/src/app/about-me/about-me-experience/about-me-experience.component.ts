import { Component, OnInit } from '@angular/core';
import { Experience } from '../about-me-sections.interface';
import { ExperienceService } from './experience-services/experience.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'zblog-about-me-experience',
  templateUrl: './about-me-experience.component.html',
  styleUrls: ['./about-me-experience.component.css']
})
export class AboutMeExperienceComponent implements OnInit {
  myExp$: Observable<Experience[]>;

  constructor(private expService: ExperienceService) { }

  ngOnInit(): void {
    this.myExp$ = this.expService.exps$;
  }
}
