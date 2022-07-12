import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { PageCadastrarNovoAluno } from './pageCadastrarNovoAluno';
import { PageCadastrarNovoAlunoRouter } from './pageCadastrarNovoAluno.routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    PageCadastrarNovoAlunoRouter,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    PageCadastrarNovoAluno,
  ]
})
export class PageCadastrarNovoAlunoModule { }
