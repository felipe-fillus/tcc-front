import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { Page_QuestionarioAlunoProfessor } from './pageQuestionarioAlunoProfessor';
import { Page_Meu_Aluno_ProfessorRoutingModule } from './pageQuestionarioAlunoProfessor.Routing.Module';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    Page_Meu_Aluno_ProfessorRoutingModule
  ],
  declarations: [
    Page_QuestionarioAlunoProfessor,
  ]
})
export class Page_QuestionarioAlunoProfessorModule { }
