import { Atividade } from './../../model/atividade.model';
import { Component, ElementRef, Inject, ViewChild, AfterViewInit } from '@angular/core';
import { ConferenceData } from '../../providers/conference-data';
import { Platform } from '@ionic/angular';
import { DOCUMENT} from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Versao } from '../../enum/versao.enum';
import { AuthBaseService } from '../../providers/service/auth/auth-base.service';
import { AtividadeAluno } from '../../model/atividade-aluno.model';
import { FormBuilder, Validators } from '@angular/forms';
import { AtividadeService } from '../../providers/service/ativdade.service';
import { AlunoService } from '../../providers/service/aluno.service';

@Component({
  selector: 'page_Menu_Minha_Atividades_Aluno',
  templateUrl: 'page_Menu_Minha_Atividades_Aluno.html',
  styleUrls: ['./page_Menu_Minha_Atividades_Aluno.scss'],
})
export class Page_Menu_Minha_Atividades_Aluno implements AfterViewInit {
  versao = Versao.numero;
  user: any;
  idAluno: any;
  atividadesAluno: AtividadeAluno[] = []
  aluno:any;
  atividadesPendentes: number;

  formFilter = this.fb.group({
    nomeAtividade: [''],
    tipoConcluido: ['TODOS', Validators.required],
    idAluno: [null]
  });



  constructor(
    public confData: ConferenceData,
    public router: Router,
    private activeRoute : ActivatedRoute,
    public platform: Platform,
    public authBaseService: AuthBaseService,
    private alunoService: AlunoService,
    private fb: FormBuilder,
    private atividadeService: AtividadeService) {
    }

  async ngAfterViewInit() {
    this.authBaseService.watchLoggedUser().subscribe((res) => {

      if (res.user) {
        this.user = res.user;
        this.idAluno = this.user.id;
      }

      if(this.idAluno != null) {
        this.formFilter.get('idAluno').setValue(this.idAluno);
  
        this.filtrarAtividade();
      }


    });
  }


  filtrarAtividade() {
    this.atividadeService.getByIdAluno(this.idAluno).subscribe((res : AtividadeAluno[]) => {
      if(res != null) {
        this.atividadesAluno = res;
        this.atividadesPendentes = this.atividadesAluno.filter(x => x.concluido == false).length;

      }
    });
  }

  statusChange(e) {
    this.formFilter.get('tipoConcluido').setValue(e);
    if(this.formFilter.valid) {
      this.atividadeService.filtrar(this.formFilter.value).subscribe((res : AtividadeAluno[]) => {
        if(res != null) {
          this.atividadesAluno = res;
        }
      });
    }
  }

  filtrarAtividadeLista(e) {
    this.formFilter.get('idAluno').setValue(this.idAluno);


    if(e != null && e != undefined) {
      this.formFilter.get('nomeAtividade').setValue(e);
    }
    
    if(this.formFilter.get('nomeAtividade').value != null) {
      this.atividadeService.filtrar(this.formFilter.value).subscribe((res : AtividadeAluno[]) => {
        if(res != null) {
          this.atividadesAluno = res;
        }
      });
    }
  }

  irAtividade(atividadeAluno : AtividadeAluno) {
    this.router.navigate(['/pageFazerAtividadeAluno']);
  }

  irVoltar() {
    this.router.navigateByUrl('/pageMenuPrincipalAluno');
  }
}
