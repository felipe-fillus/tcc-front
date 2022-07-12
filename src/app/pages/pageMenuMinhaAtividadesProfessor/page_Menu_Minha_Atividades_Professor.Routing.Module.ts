import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { Page_Menu_Minha_Atividades_Professor } from './page_Menu_Minha_Atividades_Professor';

const routes: Routes = [
  {
    path: '',
    component: Page_Menu_Minha_Atividades_Professor
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Page_Menu_Minha_Atividades_ProfessorRoutingModule { }
