import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { Page_Atividade_Aluno_Professor } from './page_Atividade_Aluno_Professor';
import { page_Atividade_Aluno_ProfessorRouting } from './page_Atividade_Aluno_Professor.Router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule,
    page_Atividade_Aluno_ProfessorRouting
  ],
  declarations: [
    Page_Atividade_Aluno_Professor,
  ]
})
export class page_Atividade_Aluno_ProfessorModule { }
