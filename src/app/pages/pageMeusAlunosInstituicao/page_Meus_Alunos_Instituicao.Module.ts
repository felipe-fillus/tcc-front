import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { Page_Meus_Alunos_Instituicao } from './page_Meus_Alunos_Instituicao';
import { Page_Meus_Alunos_ProfessorRoutingModule } from './page_Meus_Alunos_Instituicao.Routing.Module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    Page_Meus_Alunos_ProfessorRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    Page_Meus_Alunos_Instituicao,
  ]
})
export class Page_Meus_Alunos_ProfessorModule { }
