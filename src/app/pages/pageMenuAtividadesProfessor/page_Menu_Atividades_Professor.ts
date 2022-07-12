import { Versao } from './../../enum/versao.enum';
import { Component, ElementRef, Inject, ViewChild, AfterViewInit } from '@angular/core';
import { ConferenceData } from '../../providers/conference-data';
import { Platform } from '@ionic/angular';
import { DOCUMENT} from '@angular/common';
import { Router } from '@angular/router';
import { AuthBaseService } from '../../providers/service/auth/auth-base.service';

@Component({
  selector: 'page_Menu_Atividades_Professor',
  templateUrl: 'page_Menu_Atividades_Professor.html',
  styleUrls: ['./page_Menu_Atividades_Professor.scss']
})
export class Page_Menu_Atividades_Professor implements AfterViewInit {
  @ViewChild('mapCanvas', { static: true }) mapElement: ElementRef;
  versao = Versao.numero;
  user: any;
  constructor(
    @Inject(DOCUMENT) private doc: Document,
    public confData: ConferenceData,
    public router: Router,
    public platform: Platform,
    public authBaseService: AuthBaseService) {}

  async ngAfterViewInit() {
    this.authBaseService.watchLoggedUser().subscribe((res) => {

      if (res.user) {
        this.user = res.user;
      }

    });
    const appEl = this.doc.querySelector('ion-app');
  }
  irComoFunciona() {
    this.router.navigateByUrl('/pageComoFuncionaProfessor');
  }
  irMinhaAtividade() {
    this.router.navigateByUrl('/pageMenuMinhaAtividadesProfessor');
  }
  irCriarAtividade() {
    this.router.navigateByUrl('/pageCriarAtividadeProfessor');
  }
  irVoltar() {
    this.router.navigateByUrl('/pageMenuPrincipalProfessor');
  }
}
