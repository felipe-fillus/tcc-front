import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { Page_Menu_Minha_Atividades_Professor } from './page_Menu_Minha_Atividades_Professor';
import { Page_Menu_Minha_Atividades_ProfessorRoutingModule } from './page_Menu_Minha_Atividades_Professor.Routing.Module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule,
    Page_Menu_Minha_Atividades_ProfessorRoutingModule
  ],
  declarations: [
    Page_Menu_Minha_Atividades_Professor,
  ]
})
export class Page_Menu_Minha_Atividades_ProfessorModule { }
