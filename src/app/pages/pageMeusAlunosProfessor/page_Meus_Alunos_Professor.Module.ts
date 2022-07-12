import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { Page_Meus_Alunos_Professor } from './page_Meus_Alunos_Professor';
import { Page_Meus_Alunos_ProfessorRoutingModule } from './page_Meus_Alunos_Professor.Routing.Module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    Page_Meus_Alunos_ProfessorRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    Page_Meus_Alunos_Professor,
  ]
})
export class Page_Meus_Alunos_ProfessorModule { }
