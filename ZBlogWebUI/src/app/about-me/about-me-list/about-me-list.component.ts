import { Component, OnInit } from '@angular/core';
import { ExperienceService } from '../about-me-experience/experience.service';

@Component({
  templateUrl: './about-me-list.component.html',
  styleUrls: ['./about-me-list.component.css']
})
export class AboutMeListComponent implements OnInit {

  constructor(private expService: ExperienceService) { }

  ngOnInit(): void {
    this.expService.GetAll();
  }

}
