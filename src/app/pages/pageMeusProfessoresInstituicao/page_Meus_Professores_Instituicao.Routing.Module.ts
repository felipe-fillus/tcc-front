import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { Page_Meus_Professores_Instituicao } from './page_Meus_Professores_Instituicao';

const routes: Routes = [
  {
    path: '',
    component: Page_Meus_Professores_Instituicao
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Page_Meus_Professor_ProfessorRoutingModule { }
