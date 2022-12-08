import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { Page_QuestionarioAlunoProfessor } from './pageQuestionarioAlunoProfessor';
import { Page_Meu_Aluno_ProfessorRoutingModule } from './pageQuestionarioAlunoProfessor.Routing.Module';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule,
    Page_Meu_Aluno_ProfessorRoutingModule
  ],
  declarations: [
    Page_QuestionarioAlunoProfessor,
  ]
})
export class Page_QuestionarioAlunoProfessorModule { }
