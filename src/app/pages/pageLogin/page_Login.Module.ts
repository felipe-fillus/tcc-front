import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { Page_Login } from './page_Login';
import { Page_LoginRoutingModule } from './page_Login.Routing.Module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    Page_LoginRoutingModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule
  ],
  declarations: [
    Page_Login,
  ]
})
export class Page_LoginModule { }
