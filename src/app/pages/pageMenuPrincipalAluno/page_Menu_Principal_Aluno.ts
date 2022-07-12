import { Component, ElementRef, Inject, ViewChild, AfterViewInit } from '@angular/core';
import { ConferenceData } from '../../providers/conference-data';
import { Platform } from '@ionic/angular';
import { DOCUMENT} from '@angular/common';
import { Router } from '@angular/router';
import { Versao } from '../../enum/versao.enum';
import { AuthBaseService } from '../../providers/service/auth/auth-base.service';

@Component({
  selector: 'page_Menu_Principal_Aluno',
  templateUrl: 'page_Menu_Principal_Aluno.html',
  styleUrls: ['./page_Menu_Principal_Aluno.scss']
})
export class Page_Menu_Principal_Aluno implements AfterViewInit {
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
  }
  irAtividadesDoProfessor() {
    this.router.navigateByUrl('/pageMenuMinhaAtividadesAluno');
  }
  logout() {
    this.authBaseService.logout();
  }
}
