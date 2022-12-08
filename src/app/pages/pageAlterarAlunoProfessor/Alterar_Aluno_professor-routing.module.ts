import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AlterarAlunoprofessor } from './Alterar_Aluno_professor';

const routes: Routes = [
  {
    path: ':id',
    component: AlterarAlunoprofessor
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AlterarAlunoprofessorRoutingModule { }
