import { AtividadeService } from './../../providers/service/ativdade.service';
import { AtividadeAluno } from './../../model/atividade-aluno.model';
import { DOCUMENT } from '@angular/common';
import { AfterViewInit, Component, ElementRef, Inject, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { Versao } from '../../enum/versao.enum';
import { ConferenceData } from '../../providers/conference-data';
import { AuthBaseService } from '../../providers/service/auth/auth-base.service';
import { AlunoService } from '../../providers/service/aluno.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'page_Atividade_Aluno_Professor',
  templateUrl: 'page_Atividade_Aluno_Professor.html',
  styleUrls: ['./page_Atividade_Aluno_Professor.scss']
})
export class Page_Atividade_Aluno_Professor implements AfterViewInit {
  @ViewChild('mapCanvas', { static: true }) mapElement: ElementRef;
  versao = Versao.numero;
  user: any;
  idAluno: any;
  atividadesAluno: AtividadeAluno[] = []
  aluno:any;

  formFilter = this.fb.group({
    nomeAtividade: [''],
    tipoConcluido: ['TODOS', Validators.required],
    idAluno: [null]
  });
  

  constructor(
    @Inject(DOCUMENT) private doc: Document,
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
    this.idAluno = this.activeRoute.snapshot.params['id'];

    if(this.idAluno != null) {
      this.formFilter.get('idAluno').setValue(this.idAluno);

      this.buscarAluno(this.idAluno);
      this.filtrarAtividade();
    }

    this.authBaseService.watchLoggedUser().subscribe((res) => {

      if (res.user) {
        this.user = res.user;
      }

    });
  }

  filtrarAtividade() {
    this.atividadeService.getByIdAluno(this.idAluno).subscribe((res : AtividadeAluno[]) => {
      if(res != null) {
        this.atividadesAluno = res;
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
   
  irVoltar() {
    this.router.navigate(['/pageMeuAlunoProfessor/' + this.idAluno]);
  }

  buscarAluno(id : number) {
    this.alunoService.getById(this.idAluno).subscribe(res => {
      if(res) {
        this.aluno = res;
      }
    });
  }

  
}
