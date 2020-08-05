import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  templateUrl: './about-me-list.component.html',
  styleUrls: ['./about-me-list.component.css']
})
export class AboutMeListComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

}
