import { Component, ElementRef, Inject, ViewChild, AfterViewInit } from '@angular/core';
import { ConferenceData } from '../../providers/conference-data';
import { Platform } from '@ionic/angular';
import { DOCUMENT} from '@angular/common';
import { Router } from '@angular/router';
import { Versao } from '../../enum/versao.enum';
import { UsuarioEventService } from '../../providers/service/usuarioEvent.service';
import { AlunoService } from '../../providers/service/aluno.service';
import { Aluno } from '../../model/aluno.model';
import { FormBuilder } from '@angular/forms';
import { AuthBaseService } from '../../providers/service/auth/auth-base.service';

@Component({
  selector: 'page_Meus_Professores_Instituicao',
  templateUrl: 'page_Meus_Professores_Instituicao.html',
  styleUrls: ['./page_Meus_Professores_Instituicao.scss']
})
export class Page_Meus_Professores_Instituicao implements AfterViewInit {
  versao = Versao.numero;
  Instituicao: any;
  alunos: Aluno[] = [];
  user: any;

  filterForm = this.fb.group({
    idProfessor: [null],
  });
  
  constructor(
    public router: Router,
    private userEvent: UsuarioEventService,
    private authBaseService: AuthBaseService,
    private alunoService: AlunoService,
    private fb: FormBuilder) {}

  async ngAfterViewInit() {
    this.authBaseService.watchLoggedUser().subscribe((res) => {
      if(res.user) {
        this.Instituicao = res.user;
        this.filterForm.get('idInstituicao').setValue(this.Instituicao.id)
      }
    });
    this.getAluno();
  }

  getAluno() { // Metodo pega base no Professor, Alterar!!!
    this.alunoService.filter(this.filterForm.value,'lista-alunos').subscribe((res: Aluno[]) => {
      if(res != null && res.length > 0){
        this.alunos = res;
      }
    })
  }

  irVoltar() {
    this.router.navigateByUrl('/pageMenuPrincipalInstituicao');
  }


}
