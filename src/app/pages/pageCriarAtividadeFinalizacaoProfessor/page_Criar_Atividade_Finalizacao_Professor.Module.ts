import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { Page_Criar_Atividade_Finalizacao_Professor } from './page_Criar_Atividade_Finalizacao_Professor';
import { Page_Criar_Atividade_Finalizacao_ProfessorRoutingModule } from './page_Criar_Atividade_Finalizacao_Professor.Routing.module';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    Page_Criar_Atividade_Finalizacao_ProfessorRoutingModule
  ],
  declarations: [
    Page_Criar_Atividade_Finalizacao_Professor,
  ]
})
export class page_Criar_Atividade_Finalizacao_ProfessorModule { }
