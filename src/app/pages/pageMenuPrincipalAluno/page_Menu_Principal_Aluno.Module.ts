import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { Page_Menu_Principal_Aluno } from './page_Menu_Principal_Aluno';
import { Page_Menu_Principal_AlunoRoutingModule } from './page_Menu_Principal_Aluno.Routing.Module';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    Page_Menu_Principal_AlunoRoutingModule
  ],
  declarations: [
    Page_Menu_Principal_Aluno,
  ]
})
export class Page_Menu_Principal_AlunoModule { }
