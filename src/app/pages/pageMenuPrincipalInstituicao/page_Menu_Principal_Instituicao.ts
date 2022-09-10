import { Component, ElementRef, Inject, ViewChild, AfterViewInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { DOCUMENT} from '@angular/common';
import { Router } from '@angular/router';
import { Versao } from '../../enum/versao.enum';
import { AuthBaseService } from '../../providers/service/auth/auth-base.service';

@Component({
  selector: 'page_Menu_Principal_Instituicao',
  templateUrl: 'page_Menu_Principal_Instituicao.html',
  styleUrls: ['./page_Menu_Principal_Instituicao.scss']
})
export class Page_Menu_Principal_Instituicao implements AfterViewInit {
  @ViewChild('mapCanvas', { static: true }) mapElement: ElementRef;
  versao = Versao.numero;
  user: any;
  constructor(
    @Inject(DOCUMENT) private doc: Document,
    public router: Router,
    public platform: Platform,
    public authBaseService: AuthBaseService) {
      
    }

    async ngAfterViewInit() {
      this.authBaseService.watchLoggedUser().subscribe((res) => {
  
        if (res.user) {
          this.user = res.user;
        }
  
      });
      const appEl = this.doc.querySelector('ion-app');
    }

  irCadastrarProfessor() {
    this.router.navigateByUrl('/pageCadastrarProfessor');
  }
  irMeusAlunos() {
    this.router.navigateByUrl('/pageMeusAlunosInstituicao');
  }

  irmeusProfessores() {
    this.router.navigateByUrl('/pageMeusProfessoresInstituicao');
  }
  logout() {
    this.authBaseService.logout();
  }
}
