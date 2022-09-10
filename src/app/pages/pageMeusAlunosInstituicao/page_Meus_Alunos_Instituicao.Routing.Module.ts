import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { Page_Meus_Alunos_Instituicao } from './page_Meus_Alunos_Instituicao';

const routes: Routes = [
  {
    path: '',
    component: Page_Meus_Alunos_Instituicao
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Page_Meus_Alunos_ProfessorRoutingModule { }
