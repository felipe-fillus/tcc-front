import { ModalNovaInstituicao } from './../modalNovaInstituicao/modal_nova_instituicao';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { Page_Login } from './page_Login';
import { Page_LoginRoutingModule } from './page_Login.Routing.Module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    Page_LoginRoutingModule,
    CommonModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    Page_Login, ModalNovaInstituicao
  ],
  entryComponents: [ModalNovaInstituicao]
})
export class Page_LoginModule { }
