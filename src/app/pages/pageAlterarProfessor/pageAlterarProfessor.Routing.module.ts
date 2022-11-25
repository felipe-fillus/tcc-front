import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { pageAlterarProfessor } from './pageAlterarProfessor';

const routes: Routes = [
  {
    path: ':id',
    component: pageAlterarProfessor
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PageAlterarProfessorRouter { }
