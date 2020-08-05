import { Component, OnInit } from '@angular/core';
import { Experience } from '../about-me-sections.interface';

@Component({
  selector: 'zblog-about-me-experience',
  templateUrl: './about-me-experience.component.html',
  styleUrls: ['./about-me-experience.component.css']
})
export class AboutMeExperienceComponent implements OnInit {
  myExp: Experience[] = [
    {
      companyName: "Willis Towers Watson",
      role: "Software Developer",
      location: "Reigate UK",
      startDate: new Date('Oct 2019'),
      endDate: 'Present',
      description: [
        {
          intro: `Development and maintenance of in-house ASP.NET MVC web application SMART, mainly 
                used by the client service team to manage contracts and invoicing.`,
          bulletPoints: [
            `Deliver new features in an efficient way and do demo to the product manager 
            to ensure the new feature is as per required.`,
            `Took part in quality control activities such as code review, perform manual 
            tests for front-end and create/update unit tests for new features.`
          ]
        },
        {
          intro: `Development of web application (Angular + ASP.NET Core) Entitlement Manager form 
                  zero, a brand-new system aimed to integrate and simplify the existing process 
                  of managing software licences.`,
          bulletPoints: [
            `Participated in early stage design of the application architecture, made 
            investigation and made decision on selecting the appropriate technology to 
            build the application.`,
            `Involved in building different parts of the system, mainly on front-end 
            web UI and back-end service design and development, including unit tests 
            and system tests. Also did some complementary work on the pipeline.`
          ]
        }
      ],
      flag: 'Most Recent',
      imgUrl: "../../../assets/img/wtw.jpg",
    }
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
