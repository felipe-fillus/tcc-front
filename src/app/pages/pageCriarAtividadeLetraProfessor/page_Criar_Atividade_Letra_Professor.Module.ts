import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { Page_Criar_Atividade_Letra_Professor } from './page_Criar_Atividade_Letra_Professor';
import { Page_Criar_Atividade_Letra_ProfessorRoutingModule } from './page_Criar_Atividade_Letra_Professor.Routing.module';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    Page_Criar_Atividade_Letra_ProfessorRoutingModule
  ],
  declarations: [
    Page_Criar_Atividade_Letra_Professor,
  ]
})
export class Page_Criar_Atividade_Letra_ProfessorModule { }
