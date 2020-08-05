import { Component, OnInit } from '@angular/core';
import { Education } from '../about-me-sections.interface';

@Component({
  templateUrl: './about-me-education.component.html',
  styleUrls: ['./about-me-education.component.css']
})
export class AboutMeEducationComponent implements OnInit {
  myEdu: Education[] = [
    {
      uniName: 'Imperial College London',
      location: 'London UK',
      degree: 'MSc',
      courseName: 'Advanced Computational Methods for Aeronautics',
      award: 'Distinction',
      startDate: new Date('Oct 2018'),
      endDate: new Date('Oct 2019'),
      subjects: [
        'Computational Fluid Dynamics', 'High Performance Computing', 'Finite Element Method',
        'NS Equations and Turbulence Modelling', 'Separated Flows and Fluid-Structure Interaction'
      ],
      imgUrl: '../../../assets/img/IC.jpg',
      flag: 'Highest Dregree',
      imgCaption:'Imperial College main entrance'
    },
    {
      uniName: 'University of Bristol',
      location: 'Bristol UK',
      degree: 'BEng',
      courseName: 'Aerospace Engineering',
      award: 'First Class with Honour',
      startDate: new Date('Sep 2015'),
      endDate: new Date('Jun 2018'),
      subjects: [
        'Aerodynamic', 'Sensor, Signals and Control', 'Structure and Material', 'System Engineering',
        'Aircraft Vehicle Design', 'Computing and Design', 'Computational Aerodynamic'
      ],
      imgUrl: '../../../assets/img/UoB.jpg',
      flag: null,
      imgCaption:'University of Bristol park street'
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
