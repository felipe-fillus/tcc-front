import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { Page_Menu_Meus_Alunos_Professor } from './page_Menu_Meus_Alunos_Professor';
import { Page_Menu_Meus_Alunos_ProfessorRoutingModule } from './page_Menu_Meus_Alunos_Professor.Routing.Module';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    Page_Menu_Meus_Alunos_ProfessorRoutingModule
  ],
  declarations: [
    Page_Menu_Meus_Alunos_Professor,
  ]
})
export class Page_Menu_Meus_Alunos_ProfessorModule { }
