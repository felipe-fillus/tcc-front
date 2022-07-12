import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { Page_Criar_Atividade_Imagens_Professor } from './page_Criar_Atividade_Imagens_Professor';
import { Page_Criar_Atividade_Imagens_ProfessorRoutingModule } from './page_Criar_Atividade_Imagens_Professor.Routing.Module';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    Page_Criar_Atividade_Imagens_ProfessorRoutingModule
  ],
  declarations: [
    Page_Criar_Atividade_Imagens_Professor,
  ]
})
export class Page_Criar_Atividade_Imagens_ProfessorModule { }
