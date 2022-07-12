import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PageCadastrarProfessor } from './pageCadastrarProfessor';

const routes: Routes = [
  {
    path: '',
    component: PageCadastrarProfessor
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PageCadastrarProfessorRouter { }
