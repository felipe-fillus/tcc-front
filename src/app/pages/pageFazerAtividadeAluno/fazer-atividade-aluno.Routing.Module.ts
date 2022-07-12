import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FazerAtividadeAluno } from './fazer-atividade-aluno';

const routes: Routes = [
  {
    path: '',
    component: FazerAtividadeAluno
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FazerAtividadeAlunoRoutingModule { }

