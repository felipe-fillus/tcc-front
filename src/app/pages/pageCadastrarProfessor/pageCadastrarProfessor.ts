import { Professor } from './../../model/professor.model';
import { Component, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { UsuarioEventService } from '../../providers/service/usuarioEvent.service';
import { InstituicaoService } from '../../providers/service/instituicao.service';
import { AlertController } from '@ionic/angular';
import { Versao } from '../../enum/versao.enum';
import { AuthBaseService } from '../../providers/service/auth/auth-base.service';

@Component({
  selector: 'pageCadastrarProfessor',
  templateUrl: 'pageCadastrarProfessor.html',
  styleUrls: ['./pageCadastrarProfessor.scss']
})
export class PageCadastrarProfessor implements AfterViewInit {
  user: any;
  versao = Versao.numero;
  professorForm = this.fb.group({
    cpf : [null, Validators.required],
    nome : ['', Validators.required],
    email : ['', Validators.required],
    telefone : ['', Validators.required],
    idInstituicao : [null, Validators.required],
    senha : ['', Validators.required],
    senha2: ['', Validators.required],
  });

  constructor(
    private userEvent: UsuarioEventService,
    private instituicaoService: InstituicaoService,
    private fb: FormBuilder,
    public router: Router,
    private alertControl: AlertController,
    public authBaseService: AuthBaseService) {}
    

  async ngAfterViewInit() {
    this.authBaseService.watchLoggedUser().subscribe((res) => {
  
      if (res.user) {
        this.user = res.user;
      }

    });

    if(this.user) {
      this.professorForm.get('idInstituicao').setValue(this.user.id);
    }
  }

  addProfessor(){
    if(this.professorForm.valid){
      if(this.professorForm.get('senha')?.value == this.professorForm.get('senha2')?.value){
        this.instituicaoService.add(this.professorForm.value,'salvarProfessor').subscribe((res: Professor) => {
          if(res){
            this.alert('Professor ' + res.nome + ' cadastrado com sucesso!');
            this.professorForm.reset();
          }
        });
      } else {
        this.alert('As senhas não correspondem');
      }
      
    }
  }

  async alert(message:string) {
    const alert = this.alertControl.create({
      message: message,
      buttons: ['Continuar']
    });
    (await alert).present();
  }


  irVoltar() {
    this.router.navigateByUrl('/pageMenuPrincipalInstituicao');
  }
}
