import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { Page_Parabenizacao_Professor } from './page_Parabenizacao_Professor';
import { Page_Parabenizacao_ProfessorRoutingModule } from './page_Parabenizacao_Professor.Routing.Module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule,
    Page_Parabenizacao_ProfessorRoutingModule
  ],
  declarations: [
    Page_Parabenizacao_Professor,
  ]
})
export class Page_Parabenizacao_ProfessorModule { }
