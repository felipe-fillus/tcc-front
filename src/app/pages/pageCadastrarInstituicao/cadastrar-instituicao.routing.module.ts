import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CadastrarInstituicao } from './cadastrar-instituicao.component';

const routes: Routes = [
  {
    path: '',
    component: CadastrarInstituicao
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MapPageRoutingModule { }
