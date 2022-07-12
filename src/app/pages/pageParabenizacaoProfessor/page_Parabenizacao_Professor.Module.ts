import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { Page_Parabenizacao_Professor } from './page_Parabenizacao_Professor';
import { Page_Parabenizacao_ProfessorRoutingModule } from './page_Parabenizacao_Professor.Routing.Module';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    Page_Parabenizacao_ProfessorRoutingModule
  ],
  declarations: [
    Page_Parabenizacao_Professor,
  ]
})
export class Page_Parabenizacao_ProfessorModule { }
