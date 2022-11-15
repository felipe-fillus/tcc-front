import { AlunoService } from './../../providers/service/aluno.service';
import { ProfessorService } from './../../providers/service/professor.service';
import { Component, ElementRef, Inject, ViewChild, AfterViewInit } from '@angular/core';
import { ConferenceData } from '../../providers/conference-data';
import { AlertController, Platform } from '@ionic/angular';
import { DOCUMENT} from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthBaseService } from '../../providers/service/auth/auth-base.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Aluno } from '../../model/aluno.model';


@Component({
  selector: 'Alterar_Aluno_professor',
  templateUrl: 'Alterar_Aluno_professor.html',
  styleUrls: ['./Alterar_Aluno_professor.scss']
})
export class AlterarAlunoprofessor implements AfterViewInit {
  user:any;
  aluno:any;
  alunoForm:FormGroup;
  idAluno:any;

  constructor(
    @Inject(DOCUMENT) private doc: Document,
    public confData: ConferenceData,
    public router: Router,
    public platform: Platform,
    private fb: FormBuilder,
    public authBaseService: AuthBaseService,
    private activeRoute : ActivatedRoute,
    private alertControl: AlertController,
    private alunoService: AlunoService) {

      this.alunoForm = this.fb.group({
        id: [null, Validators.required],
        nome: ['', Validators.required],
        email: ['', Validators.required],
        senha: [''],
        cpf: [null, Validators.required],
        idInstituicao: [null, Validators.required],
        idProfessor: [null, Validators.required]
      });
    }

  async ngAfterViewInit() {
    this.idAluno = this.activeRoute.snapshot.params['id'];

    if(this.idAluno != null) {
      this.buscarAluno(this.idAluno);
    }

    this.authBaseService.watchLoggedUser().subscribe((res) => {

      if (res.user) {
        this.user = res.user;
        this.alunoForm.get('idProfessor').setValue(this.user.id);
        this.alunoForm.get('idInstituicao').setValue(this.user.idInstituicao);
      }

    });
  }

  irVoltar() {
    this.router.navigate(['/pageMeuAlunoProfessor/' + this.idAluno]);
  }

  buscarAluno(id : number) {
    this.alunoService.getById(this.idAluno).subscribe(res => {
      if(res) {
        this.alunoForm.controls.id.setValue(res.id);
        this.alunoForm.controls.cpf.setValue(res.cpf);
        this.alunoForm.controls.nome.setValue(res.nome);
        this.alunoForm.controls.email.setValue(res.email);
        this.aluno = res;
      }
    });
  }

  addAluno(){
    console.log(this.alunoForm.value)
    if(this.alunoForm.valid){
      this.alunoService.edit(this.alunoForm.value,'alterar-aluno').subscribe((res: Aluno) => {
        if(res){
          this.alunoCadastradoAlert(res.nome);
        }
      });
    }
  }


  async alunoCadastradoAlert(nome:string) {
    const alert = this.alertControl.create({
      message: 'Aluno ' + nome + ' alterado com sucesso!',
      buttons: [{text:'Continuar', role: 'confirm',
      handler: () => {
        this.irVoltar();
      },}]
    });
    (await alert).present();
  }
}
