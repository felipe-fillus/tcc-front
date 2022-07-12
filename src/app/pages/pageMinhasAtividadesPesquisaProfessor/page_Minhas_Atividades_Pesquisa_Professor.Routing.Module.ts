import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { Page_Minhas_Atividades_Pesquisa_Professor } from './page_Minhas_Atividades_Pesquisa_Professor';

const routes: Routes = [
  {
    path: '',
    component: Page_Minhas_Atividades_Pesquisa_Professor
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Page_Minhas_Atividades_Pesquisa_ProfessorRoutingModule { }
