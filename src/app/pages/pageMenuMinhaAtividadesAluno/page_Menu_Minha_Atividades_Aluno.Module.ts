import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { Page_Menu_Minha_Atividades_Aluno } from './page_Menu_Minha_Atividades_Aluno';
import { Page_Menu_Minha_Atividades_AlunoRoutingModule } from './page_Menu_Minha_Atividades_Aluno.Routing.Module';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    Page_Menu_Minha_Atividades_AlunoRoutingModule
  ],
  declarations: [
    Page_Menu_Minha_Atividades_Aluno,
  ]
})
export class Page_Menu_Minha_Atividades_AlunoModule { }
