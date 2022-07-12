import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { Page_Meus_Alunos_Professor } from './page_Meus_Alunos_Professor';

const routes: Routes = [
  {
    path: '',
    component: Page_Meus_Alunos_Professor
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Page_Meus_Alunos_ProfessorRoutingModule { }
