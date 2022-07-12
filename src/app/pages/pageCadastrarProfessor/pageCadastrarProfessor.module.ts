import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { PageCadastrarProfessor } from './pageCadastrarProfessor';
import { PageCadastrarProfessorRouter } from './pageCadastrarProfessor.Routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    PageCadastrarProfessorRouter,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [
    PageCadastrarProfessor,
  ]
})
export class PageCadastrarProfessorModule { }
