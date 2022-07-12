import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { Page_Menu_Principal_Instituicao } from './page_Menu_Principal_Instituicao';
import { Page_Menu_Principal_InstituicaoRoutingModule } from './page_Menu_Principal_Instituicao.Routing.Module';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    Page_Menu_Principal_InstituicaoRoutingModule
  ],
  declarations: [
    Page_Menu_Principal_Instituicao,
  ]
})
export class Page_Menu_Principal_InstituicaoModule { }
