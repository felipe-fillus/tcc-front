import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { Page_Menu_Principal_Professor } from './page_Menu_Principal_Professor';
import { Page_Menu_Principal_ProfessorRoutingModule } from './page_Menu_Principal_Professor.Routing.Module';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    Page_Menu_Principal_ProfessorRoutingModule
  ],
  declarations: [
    Page_Menu_Principal_Professor,
  ]
})
export class MapModule { }
