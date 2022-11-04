import { Atividade } from './../../model/atividade.model';
import { Component, ElementRef, Inject, ViewChild, AfterViewInit } from '@angular/core';
import { ConferenceData } from '../../providers/conference-data';
import { Platform } from '@ionic/angular';
import { DOCUMENT} from '@angular/common';
import { Router } from '@angular/router';
import { Versao } from '../../enum/versao.enum';
import { AuthBaseService } from '../../providers/service/auth/auth-base.service';
import { FormBuilder, Validators } from '@angular/forms';
import { AtividadeService } from '../../providers/service/ativdade.service';

@Component({
  selector: 'page_Menu_Minha_Atividades_Professor',
  templateUrl: 'page_Menu_Minha_Atividades_Professor.html',
  styleUrls: ['./page_Menu_Minha_Atividades_Professor.scss']
})
export class Page_Menu_Minha_Atividades_Professor implements AfterViewInit {
  @ViewChild('mapCanvas', { static: true }) mapElement: ElementRef;
  versao = Versao.numero;
  user: any;
  atividades: Atividade[];

  constructor(
    @Inject(DOCUMENT) private doc: Document,
    public confData: ConferenceData,
    public router: Router,
    public platform: Platform,
    public authBaseService: AuthBaseService,
    private fb: FormBuilder,
    private atividadeService: AtividadeService) {}

    formFilter = this.fb.group({
      nomeAtividade: [''],
      tipoLetra: [true],
      tipoSilaba: [true],
      tipoImagem: [true],
      idProfessor: [null, Validators.required]
    });

  async ngAfterViewInit() {
    this.authBaseService.watchLoggedUser().subscribe((res) => {
			
			if (res.user) {
				this.user = res.user;
				this.formFilter.get('idProfessor').setValue(this.user.id);
        this.filtrarAtividade();
        console.log('Teste')
			}

		});
  }

  filtrarAtividade() {
    this.atividadeService.add(this.formFilter.value, 'buscar').subscribe((res : Atividade[]) => {
      if(res != null) {
        this.atividades = res;
      }
    });
  }

  irMinhasAtividades() {
    this.router.navigateByUrl('/pageMinhasAtividadesPesquisaProfessor');
  }
  irVoltar() {
    this.router.navigateByUrl('/pageMenuAtividadesProfessor');
  }
}
