import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { Page_Meu_Aluno_Professor } from './page_Meu_Aluno_Professor';

const routes: Routes = [
  {
    path: ':id',
    component: Page_Meu_Aluno_Professor
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Page_Meu_Aluno_ProfessorRoutingModule { }
