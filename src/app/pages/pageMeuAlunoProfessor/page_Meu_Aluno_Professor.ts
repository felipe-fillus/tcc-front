import { AlunoService } from './../../providers/service/aluno.service';
import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { Versao } from '../../enum/versao.enum';
import { ConferenceData } from '../../providers/conference-data';
import { AuthBaseService } from '../../providers/service/auth/auth-base.service';
import { Aluno } from '../../model/aluno.model';

@Component({
  selector: 'page_Meu_Aluno_Professor',
  templateUrl: 'page_Meu_Aluno_Professor.html',
  styleUrls: ['./page_Meu_Aluno_Professor.scss']
})
export class Page_Meu_Aluno_Professor implements AfterViewInit {
  @ViewChild('mapCanvas', { static: true }) mapElement: ElementRef;
  versao = Versao.numero;
  user: any;
  idAluno: any;
  aluno: any;
  constructor(
    public confData: ConferenceData,
    public router: Router,
    private activeRoute : ActivatedRoute,
    public platform: Platform,
    public authBaseService: AuthBaseService,
    private alunoService: AlunoService) {
    
    }

  async ngAfterViewInit() {
    this.activeRoute.queryParams.subscribe((params) => {
      if(params) {
        this.idAluno = params.id;
        this.buscarAluno(this.idAluno);
      }
    });
    this.authBaseService.watchLoggedUser().subscribe((res) => {

      if (res.user) {
        this.user = res.user;
      }

    });
  }


  buscarAluno(id : number) {
    this.alunoService.getById(this.idAluno).subscribe(res => {
      if(res) {
        this.aluno = res;
      }
    });
  }

  irAleterarAluno() {
    this.router.navigate(['pageAlterarAlunoProfessor'], 
    {queryParams: 
      {       
        id : this.idAluno
      }
    });
  }
  irParabenizacao() {
    this.router.navigateByUrl('/pageParabenizacaoProfessor');
  }
  irAtividadeRealizada() {
    this.router.navigateByUrl('/pageAtividadeRealizadasAlunoProfessor');
  }
  irAtividadePendentes() {
    this.router.navigateByUrl('/pageAtividadePendentesAlunoProfessor');
  }
  irVoltar() {
    this.router.navigateByUrl('/pageMeusAlunosProfessor');
  }
}

