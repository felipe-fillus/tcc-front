import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PageCadastrarNovoAluno } from './pageCadastrarNovoAluno';

const routes: Routes = [
  {
    path: '',
    component: PageCadastrarNovoAluno
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PageCadastrarNovoAlunoRouter { }
