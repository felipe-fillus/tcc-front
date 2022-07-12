import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { Page_Minhas_Atividades_Aluno } from './page_Minhas_Atividades_Aluno';

const routes: Routes = [
  {
    path: '',
    component: Page_Minhas_Atividades_Aluno
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Page_Minhas_Atividades_AlunoRoutingModule { }
