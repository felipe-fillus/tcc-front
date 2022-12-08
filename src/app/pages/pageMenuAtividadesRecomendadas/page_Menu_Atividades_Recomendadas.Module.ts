import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { Page_Menu_Atividades_Recomendadas } from './page_Menu_Atividades_Recomendadas';
import { Page_Menu_Atividades_RecomendadasRoutingModule } from './page_Menu_Atividades_Recomendadas.Routing.Module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule,
    Page_Menu_Atividades_RecomendadasRoutingModule
  ],
  declarations: [
    Page_Menu_Atividades_Recomendadas,
  ]
})
export class Page_Menu_Atividades_RecomendadasModule { }
