import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { Page_Como_Funciona_Professor } from './page_Como_Funciona_Professor';
import { Page_Como_Funciona_ProfessorRoutingModule } from './page_Como_Funciona_Professor.Routing.module';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    Page_Como_Funciona_ProfessorRoutingModule
  ],
  declarations: [
    Page_Como_Funciona_Professor,
  ]
})
export class Page_Como_Funciona_ProfessorModule { }
