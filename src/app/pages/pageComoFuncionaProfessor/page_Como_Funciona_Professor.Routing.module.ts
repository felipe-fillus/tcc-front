import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { Page_Como_Funciona_Professor } from './page_Como_Funciona_Professor';

const routes: Routes = [
  {
    path: '',
    component: Page_Como_Funciona_Professor
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Page_Como_Funciona_ProfessorRoutingModule { }
