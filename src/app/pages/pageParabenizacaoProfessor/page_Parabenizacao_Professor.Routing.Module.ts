import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { Page_Parabenizacao_Professor } from './page_Parabenizacao_Professor';

const routes: Routes = [
  {
    path: ':id',
    component: Page_Parabenizacao_Professor
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Page_Parabenizacao_ProfessorRoutingModule { }
