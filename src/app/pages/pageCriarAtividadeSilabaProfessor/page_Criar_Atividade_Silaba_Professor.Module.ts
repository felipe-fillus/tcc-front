import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { Page_Criar_Atividade_Silaba_Professor } from './page_Criar_Atividade_Silaba_Professor';
import { Page_Criar_Atividade_Silaba_ProfessorRoutingModule } from './page_Criar_Atividade_Silaba_Professor.Routing.Module';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    Page_Criar_Atividade_Silaba_ProfessorRoutingModule
  ],
  declarations: [
    Page_Criar_Atividade_Silaba_Professor,
  ]
})
export class Page_Criar_Atividade_Silaba_ProfessorModule { }
