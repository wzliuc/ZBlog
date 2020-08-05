import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectListComponent } from './project-list/project-list.component';
import { ProjectRoutingModule } from './project-routing';
import { ProjectPdfComponent } from './project-pdf/project-pdf.component';

@NgModule({
  declarations: [
    ProjectListComponent,
    ProjectPdfComponent
  ],
  imports: [
    CommonModule,
    ProjectRoutingModule
  ]
})
export class ProjectModule { }
