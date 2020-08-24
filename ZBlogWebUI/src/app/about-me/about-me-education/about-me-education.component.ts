import { Component, OnInit } from '@angular/core';
import { Education } from '../about-me-sections.interface';
import { EducationService } from './education-services/education.service';
import { Observable } from 'rxjs';

@Component({
  templateUrl: './about-me-education.component.html',
  styleUrls: ['./about-me-education.component.css']
})
export class AboutMeEducationComponent implements OnInit {
  myEdu$: Observable<Education[]>
  constructor(private eduService: EducationService) { }

  ngOnInit(): void {
    this.myEdu$ = this.eduService.edus$;
  }
}
