import { ModalCriarAtividadeImagensProfessor } from '../modalCriarAtividadeImagensProfessor/modal_Criar_Atividade_Imagens_Professor';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { Page_Editar_Atividade_Professor } from './page_Editar_Atividade_Professor';
import { Page_Editar_Atividade_ProfessorRoutingModule } from './page_Editar_Atividade_Professor.Routing.Module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalCriarAtividadeLetraProfessor } from '../modalCriarAtividadeLetraProfessor/modal_Criar_Atividade_Letra_Professor';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule,
    Page_Editar_Atividade_ProfessorRoutingModule
  ],
  declarations: [
    Page_Editar_Atividade_Professor
  ],
  entryComponents: [ModalCriarAtividadeLetraProfessor, ModalCriarAtividadeImagensProfessor]
})
export class Page_Editar_Atividade_ProfessorModule { }
