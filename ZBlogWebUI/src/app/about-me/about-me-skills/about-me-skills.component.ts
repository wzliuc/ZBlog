import { Component, OnInit } from '@angular/core';
import { Skill } from '../about-me-sections.interface';

@Component({
  selector: 'zblog-about-me-skills',
  templateUrl: './about-me-skills.component.html',
  styleUrls: ['./about-me-skills.component.css']
})
export class AboutMeSkillsComponent implements OnInit {
  mySkills: Skill[] = [
    {
      type: "Technology Stack",
      skillSets: [
        {
          name: "Back End",
          skills: ['C#', 'ASP.NET Core/MVC', 'Entity Framework', 'XUnit']
        },
        {
          name: "Front End",
          skills: ['Typescript', 'JavaScript/HTML5/CSS', 'Angular 2+', 'RxJS', 'jQuery', 'Bootstrap', 'Karma+Jasmine']
        },
        {
          name: "Database",
          skills: ['SQL', 'MS SQL Server']
        },
        {
          name: "Others",
          skills: ['Git', 'IIS', 'C/C++', 'GO']
        },
      ],
      imgUrl: '../../../assets/img/coding.jpeg'
    },
    {
      type: "Languages",
      skillSets: [
        {
          name: null,
          skills: ['English', 'Chinese', 'Spanish']
        }
      ],
      imgUrl: '../../../assets/img/lan.jpg'
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
