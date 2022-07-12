import { Versao } from './../../enum/versao.enum';
import { Component, ElementRef, Inject, ViewChild, AfterViewInit } from '@angular/core';
import { ConferenceData } from '../../providers/conference-data';
import { Platform } from '@ionic/angular';
import { DOCUMENT} from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'page_Minhas_Atividades_Pesquisa_Professor',
  templateUrl: 'page_Minhas_Atividades_Pesquisa_Professor.html',
  styleUrls: ['./page_Minhas_Atividades_Pesquisa_Professor.scss']
})
export class Page_Minhas_Atividades_Pesquisa_Professor implements AfterViewInit {
  @ViewChild('mapCanvas', { static: true }) mapElement: ElementRef;
  speakers: any[] = [];
  versao = Versao.numero;
  constructor(
    @Inject(DOCUMENT) private doc: Document,
    public confData: ConferenceData,
    public router: Router,
    public platform: Platform) {}

  async ngAfterViewInit() {
    const appEl = this.doc.querySelector('ion-app');
  }
  irVoltar() {
    this.router.navigateByUrl('/pageMenuMinhaAtividadesProfessor');
  }
}
