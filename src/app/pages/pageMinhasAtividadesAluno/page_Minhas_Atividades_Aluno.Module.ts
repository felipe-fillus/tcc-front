import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { Page_Minhas_Atividades_Aluno } from './page_Minhas_Atividades_Aluno';
import { Page_Minhas_Atividades_AlunoRoutingModule } from './page_Minhas_Atividades_Aluno.Routing.Module';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    Page_Minhas_Atividades_AlunoRoutingModule
  ],
  declarations: [
    Page_Minhas_Atividades_Aluno,
  ]
})
export class Page_Minhas_Atividades_AlunoModule { }
