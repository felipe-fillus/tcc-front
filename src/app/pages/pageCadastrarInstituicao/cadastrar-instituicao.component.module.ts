import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { CadastrarInstituicao } from './cadastrar-instituicao.component';
import { MapPageRoutingModule } from './cadastrar-instituicao.routing.module';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    MapPageRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    CadastrarInstituicao,
  ]
})
export class CadastrarInstituicaoModule { }
