import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { Page_Menu_Atividades_Recomendadas } from './page_Menu_Atividades_Recomendadas';

const routes: Routes = [
  {
    path: '',
    component: Page_Menu_Atividades_Recomendadas
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Page_Menu_Atividades_RecomendadasRoutingModule { }
