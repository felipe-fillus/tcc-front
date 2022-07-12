import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { Page_Atividade_Pendentes_Aluno_Professor } from './page_Atividade_Pendentes_Aluno_Professor';

const routes: Routes = [
  {
    path: '',
    component: Page_Atividade_Pendentes_Aluno_Professor
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Page_Atividade_Pendentes_Aluno_ProfessorModule { }
