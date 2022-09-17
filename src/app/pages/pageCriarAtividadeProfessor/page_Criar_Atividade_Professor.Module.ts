import { Page_Criar_Atividade_Letra_Professor } from './../pageCriarAtividadeLetraProfessor/page_Criar_Atividade_Letra_Professor';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { Page_Criar_Atividade_Professor } from './page_Criar_Atividade_Professor';
import { Page_Criar_Atividade_ProfessorRoutingModule } from './page_Criar_Atividade_Professor.Routing.Module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalCriarAtividadeLetraProfessor } from '../modalCriarAtividadeLetraProfessor/modal_Criar_Atividade_Letra_Professor';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule,
    Page_Criar_Atividade_ProfessorRoutingModule
  ],
  declarations: [
    Page_Criar_Atividade_Professor, ModalCriarAtividadeLetraProfessor
  ],
  entryComponents: [ModalCriarAtividadeLetraProfessor]
})
export class Page_Criar_Atividade_ProfessorModule { }
