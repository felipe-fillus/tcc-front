import { Professor } from './../../model/professor.model';
import { Component, ElementRef, Inject, ViewChild, AfterViewInit } from '@angular/core';
import { ConferenceData } from '../../providers/conference-data';
import { Platform } from '@ionic/angular';
import { DOCUMENT} from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Versao } from '../../enum/versao.enum';
import { UsuarioEventService } from '../../providers/service/usuarioEvent.service';
import { AlunoService } from '../../providers/service/aluno.service';
import { Aluno } from '../../model/aluno.model';
import { FormBuilder } from '@angular/forms';
import { AuthBaseService } from '../../providers/service/auth/auth-base.service';
import { ProfessorService } from '../../providers/service/professor.service';

@Component({
  selector: 'page_Meus_Professores_Instituicao',
  templateUrl: 'page_Meus_Professores_Instituicao.html',
  styleUrls: ['./page_Meus_Professores_Instituicao.scss']
})
export class Page_Meus_Professores_Instituicao implements AfterViewInit {
  versao = Versao.numero;
  instituicao: any;
  professores: Professor[] = [];
  user: any;

  formFilter = this.fb.group({
    nome: [''],
    idInstituicao: [null],
  });
  
  constructor(
    public router: Router,
    private userEvent: UsuarioEventService,
    private activeRoute : ActivatedRoute,
    private authBaseService: AuthBaseService,
    private professorService: ProfessorService,
    private fb: FormBuilder) {
      activeRoute.params.subscribe(val => {
				this.openComponent();
			});
    }

  async ngAfterViewInit() {
    //this.openComponent();
  }

  openComponent() {
    this.authBaseService.watchLoggedUser().subscribe((res) => {
      if(res.user) {
        this.instituicao = res.user;
        this.formFilter.get('idInstituicao').setValue(this.instituicao.id)
      }
    });
    this.getProfessor();
  }

  getProfessor() { // Metodo pega base no Professor, Alterar!!!
    this.professorService.filtrar(this.formFilter.value).subscribe((res: Professor[]) => {
      if(res != null && res.length > 0){
        this.professores = res;
      }
    })
  }

  irVoltar() {
    this.router.navigateByUrl('/pageMenuPrincipalInstituicao');
  }

  deletarProfessor(id : number, index : number) {
    this.professorService.deletarProfessor(id).subscribe((res:any) => {
      if(res) {
        this.professores.splice(index, 1);
      }
    });
  }

  irMeuProfessor(id : number) {
    this.router.navigate(['/pageAlterarProfessor/' + id]);
  }

}
