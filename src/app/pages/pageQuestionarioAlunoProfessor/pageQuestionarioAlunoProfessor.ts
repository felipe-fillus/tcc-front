import { AlunoService } from '../../providers/service/aluno.service';
import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { Versao } from '../../enum/versao.enum';
import { ConferenceData } from '../../providers/conference-data';
import { AuthBaseService } from '../../providers/service/auth/auth-base.service';
import { Aluno } from '../../model/aluno.model';

@Component({
  selector: 'pageQuestionarioAlunoProfessor',
  templateUrl: 'pageQuestionarioAlunoProfessor.html',
  styleUrls: ['./pageQuestionarioAlunoProfessor.scss']
})
export class Page_QuestionarioAlunoProfessor implements AfterViewInit {
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
    this.authBaseService.watchLoggedUser().subscribe((res) => {

      if (res.user) {
        this.user = res.user;
      }

    });
  }


  irVoltar() {
    this.router.navigateByUrl('/pageMeusAlunosProfessor');
  }
}

