import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { Page_Minhas_Atividades_Pesquisa_Professor } from './page_Minhas_Atividades_Pesquisa_Professor';
import { Page_Minhas_Atividades_Pesquisa_ProfessorRoutingModule } from './page_Minhas_Atividades_Pesquisa_Professor.Routing.Module';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    Page_Minhas_Atividades_Pesquisa_ProfessorRoutingModule
  ],
  declarations: [
    Page_Minhas_Atividades_Pesquisa_Professor,
  ]
})
export class Page_Minhas_Atividades_Pesquisa_ProfessorModule { }
