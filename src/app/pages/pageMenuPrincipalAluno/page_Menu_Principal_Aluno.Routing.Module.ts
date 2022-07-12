import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { Page_Menu_Principal_Aluno } from './page_Menu_Principal_Aluno';

const routes: Routes = [
  {
    path: '',
    component: Page_Menu_Principal_Aluno
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Page_Menu_Principal_AlunoRoutingModule { }
