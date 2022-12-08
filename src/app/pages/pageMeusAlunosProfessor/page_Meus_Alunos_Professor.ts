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
  selector: 'page_Meus_Alunos_Professor',
  templateUrl: 'page_Meus_Alunos_Professor.html',
  styleUrls: ['./page_Meus_Alunos_Professor.scss']
})
export class Page_Meus_Alunos_Professor implements AfterViewInit {
  versao = Versao.numero;
  professor: any;
  alunos: Aluno[] = [];
  user: any;

  formFilter = this.fb.group({
    nome: [''],
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
        this.professor = res.user;
        this.formFilter.get('idProfessor').setValue(this.professor.id)
      }
    });
    this.getAluno();
  }

  getAluno() {
    this.alunoService.filtrar(this.formFilter.value).subscribe((res: Aluno[]) => {
      if(res != null && res.length > 0){
        this.alunos = res;
      }
    })
  }

  irVoltar() {
    this.router.navigateByUrl('/pageMenuMeusAlunosProfessor');
  }

  irMeuAluno(alunoSelect : Aluno) {
    this.router.navigate(['/pageMeuAlunoProfessor/' + alunoSelect.id]);
  }

  deletarAluno(index : number) {
    this.alunoService.deletar(this.alunos[index].id).subscribe((res) => {
      if(res) {
        this.getAluno();
      }
    });
  }

}
