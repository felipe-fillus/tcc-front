import { AlterarAlunoprofessorRoutingModule } from './Alterar_Aluno_professor-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { AlterarAlunoprofessor } from './Alterar_Aluno_professor'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    AlterarAlunoprofessorRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    AlterarAlunoprofessor,
  ]
})
export class Alterar_Aluno_professorModule { }
