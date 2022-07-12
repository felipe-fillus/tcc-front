import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { Page_Atividade_Pendentes_Aluno_Professor } from './page_Atividade_Pendentes_Aluno_Professor';
import { Page_Atividade_Pendentes_Aluno_ProfessorModule } from './page_Atividade_Pendentes_Aluno_Professor.module';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    Page_Atividade_Pendentes_Aluno_ProfessorModule
  ],
  declarations: [
    Page_Atividade_Pendentes_Aluno_Professor,
  ]
})
export class Page_Atividade_Pendentes_Aluno_ProfessorRouter { }
