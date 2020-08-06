import { Component, OnInit } from '@angular/core';
import { ProjectGroup } from '../project.interface';

@Component({
  selector: 'zblog-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent implements OnInit {
  myProjects: ProjectGroup[] = [
    {
      id: 1,
      organisationName: "Imperial College",
      projects: [
        {
          name: 'Dissertation',
          pdfName: 'MSc_MIRP_WENZE.pdf'
        },
        {
          name: 'CFD A',
          pdfName: 'CFD_Coursework1_Wenze_Liu.pdf'
        },
        {
          name: 'CFD B',
          pdfName: 'CFD_Part_B_Wenqi_W_Wenze_Liu.pdf'
        }
      ]
    },
    {
      id: 2,
      organisationName: "University of Bristol",
      projects: [
      ]
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
