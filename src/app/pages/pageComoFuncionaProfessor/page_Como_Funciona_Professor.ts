import { Component, ElementRef, Inject, ViewChild, AfterViewInit } from '@angular/core';
import { ConferenceData } from '../../providers/conference-data';
import { Platform } from '@ionic/angular';
import { DOCUMENT} from '@angular/common';
import { Router } from '@angular/router';
import { Versao } from '../../enum/versao.enum';
import { AuthBaseService } from '../../providers/service/auth/auth-base.service';

@Component({
  selector: 'page_Como_Funciona_Professor',
  templateUrl: 'page_Como_Funciona_Professor.html',
  styleUrls: ['./page_Como_Funciona_Professor.scss']
})
export class Page_Como_Funciona_Professor implements AfterViewInit {
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
  
  irVoltar() {
    this.router.navigateByUrl('/pageMenuAtividadesProfessor');
  }
}
