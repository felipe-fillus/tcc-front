import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { FazerAtividadeAluno } from './fazer-atividade-aluno';
import { FazerAtividadeAlunoRoutingModule} from './fazer-atividade-aluno.Routing.Module';

import {DragDropModule} from '@angular/cdk/drag-drop';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    FazerAtividadeAlunoRoutingModule,
    DragDropModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    FazerAtividadeAluno,
  ]
})
export class FazerAtividadeAlunoModule { }