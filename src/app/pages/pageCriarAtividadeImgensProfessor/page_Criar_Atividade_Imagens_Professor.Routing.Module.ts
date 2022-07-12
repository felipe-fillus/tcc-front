import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { Page_Criar_Atividade_Imagens_Professor } from './page_Criar_Atividade_Imagens_Professor';

const routes: Routes = [
  {
    path: '',
    component: Page_Criar_Atividade_Imagens_Professor
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Page_Criar_Atividade_Imagens_ProfessorRoutingModule { }
