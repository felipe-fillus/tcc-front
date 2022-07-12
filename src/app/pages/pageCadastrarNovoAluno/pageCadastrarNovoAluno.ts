import { Instituicao } from './../../model/instituicao.model';
import { InstituicaoService } from './../../providers/service/instituicao.service';
import { Component, AfterViewInit } from '@angular/core';
import { ConferenceData } from '../../providers/conference-data';
import { AlertController, Platform } from '@ionic/angular';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { UsuarioEventService } from '../../providers/service/usuarioEvent.service';
import { ProfessorService } from '../../providers/service/professor.service';
import { ValueAccessor } from '@ionic/angular/directives/control-value-accessors/value-accessor';
import { ThisReceiver } from '@angular/compiler';
import { Aluno } from '../../model/aluno.model';
import { Versao } from '../../enum/versao.enum';
import { AuthBaseService } from '../../providers/service/auth/auth-base.service';

@Component({
  selector: 'pageCadastrarNovoAluno',
  templateUrl: 'pageCadastrarNovoAluno.html',
  styleUrls: ['./pageCadastrarNovoAluno.scss']
})
export class PageCadastrarNovoAluno implements AfterViewInit {
  versao = Versao.numero;
  instituicao: any;
  professor: any;
  user: any;

  filterForm = this.fb.group({
    email: [''],
  });

  alunoForm = this.fb.group({
    nome: [null, Validators.required],
    email: ['', Validators.required],
    senha: ['', Validators.required],
    cpf: [null, Validators.required],
    idInstituicao: [null, Validators.required],
    idProfessor: [null, Validators.required]
  });

  constructor(
    private userEvent: UsuarioEventService,
    public confData: ConferenceData,
    private fb: FormBuilder,
    public router: Router,
    public platform: Platform,
    private instituicaoService: InstituicaoService,
    private professorService: ProfessorService,
    private alertControl: AlertController,
    public authBaseService: AuthBaseService) {

    }

  async ngAfterViewInit() {
    this.authBaseService.watchLoggedUser().subscribe((res) => {

      if (res.user) {
        this.user = res.user;
        this.alunoForm.get('idProfessor').setValue(this.user.id);
        this.alunoForm.get('idInstituicao').setValue(this.user.idInstituicao);
      }

    });

    this.getInstituicao();
  }

  addAluno(){
    if(this.alunoForm.valid){
      this.professorService.add(this.alunoForm.value,'salvarAluno').subscribe((res: Aluno) => {
        if(res){
          this.alunoCadastradoAlert(res.nome);
        }
      })
    }
  }

  getInstituicao(){
    this.filterForm.get('email').setValue(this.professor.email);
    this.instituicaoService.filter(this.filterForm.value,'instituicao-professor').subscribe(res => {
      if(res){
        this.instituicao = res;
      }
    })
  }

  async alunoCadastradoAlert(nome:string) {
    const alert = this.alertControl.create({
      message: 'Aluno ' + nome + ' cadastrado com sucesso!',
      buttons: ['Continuar']
    });
    (await alert).present();
  }


  irVoltar() {
    this.router.navigateByUrl('/pageMenuMeusAlunosProfessor');
  }

}
