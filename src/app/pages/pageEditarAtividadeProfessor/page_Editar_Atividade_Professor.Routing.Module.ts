import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { Page_Editar_Atividade_Professor } from './page_Editar_Atividade_Professor';

const routes: Routes = [
  {
    path: ':id',
    component: Page_Editar_Atividade_Professor
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Page_Editar_Atividade_ProfessorRoutingModule { }
