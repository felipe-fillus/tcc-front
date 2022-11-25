import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { Page_Menu_Principal_Instituicao } from './page_Menu_Principal_Instituicao';
import { Page_Menu_Principal_InstituicaoRoutingModule } from './page_Menu_Principal_Instituicao.Routing.Module';
import { ModalNovaInstituicao } from '../modalNovaInstituicao/modal_nova_instituicao';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    Page_Menu_Principal_InstituicaoRoutingModule,
    CommonModule,
    CommonModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    Page_Menu_Principal_Instituicao,
  ]
})
export class Page_Menu_Principal_InstituicaoModule { }
