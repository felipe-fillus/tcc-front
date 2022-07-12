import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { Page_Meu_Aluno_Professor } from './page_Meu_Aluno_Professor';
import { Page_Meu_Aluno_ProfessorRoutingModule } from './page_Meu_Aluno_Professor.Routing.Module';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    Page_Meu_Aluno_ProfessorRoutingModule
  ],
  declarations: [
    Page_Meu_Aluno_Professor,
  ]
})
export class Page_Meu_Aluno_ProfessorModule { }
