import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { Page_Login } from './page_Login';

const routes: Routes = [
  {
    path: '',
    component: Page_Login
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Page_LoginRoutingModule { }
