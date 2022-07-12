import { DOCUMENT } from '@angular/common';
import { AfterViewInit, Component, ElementRef, Inject, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { ConferenceData } from '../../providers/conference-data';
import { AuthBaseService } from '../../providers/service/auth/auth-base.service';
import { Versao } from './../../enum/versao.enum';

@Component({
  selector: 'page_Menu_Meus_Alunos_Professor',
  templateUrl: 'page_Menu_Meus_Alunos_Professor.html',
  styleUrls: ['./page_Menu_Meus_Alunos_Professor.scss']
})
export class Page_Menu_Meus_Alunos_Professor implements AfterViewInit {
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
  irMeusAlunos() {
    this.router.navigateByUrl('/pageMeusAlunosProfessor');
  }
  irCadastrarNovoAluno() {
    this.router.navigateByUrl('/pageCadastrarNovoAluno');
  }
  irVoltar() {
    this.router.navigateByUrl('/pageMenuPrincipalProfessor');
  }
}
