import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { pageAlterarProfessor} from './pageAlterarProfessor';
import { PageAlterarProfessorRouter } from './pageAlterarProfessor.Routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    PageAlterarProfessorRouter,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [
    pageAlterarProfessor,
  ]
})
export class PageAlterarProfessorModule { }
