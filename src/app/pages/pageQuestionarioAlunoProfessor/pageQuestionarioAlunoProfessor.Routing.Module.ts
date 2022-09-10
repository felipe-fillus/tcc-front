import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { Page_QuestionarioAlunoProfessor } from './pageQuestionarioAlunoProfessor';

const routes: Routes = [
  {
    path: '',
    component: Page_QuestionarioAlunoProfessor
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Page_Meu_Aluno_ProfessorRoutingModule { }
