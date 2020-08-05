import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProjectListComponent } from './project-list/project-list.component';
import { ProjectPdfComponent } from './project-pdf/project-pdf.component';

const routes: Routes = [
  {path:'projects', component: ProjectListComponent, children: [
    {path: '', redirectTo: '', pathMatch: 'full'},
    {path: ':id', component:ProjectPdfComponent},
  ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectRoutingModule { }
