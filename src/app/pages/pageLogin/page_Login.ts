import { AuthBaseService } from './../../providers/service/auth/auth-base.service';
import { Professor } from './../../model/professor.model';
import { UsuarioEventService } from './../../providers/service/usuarioEvent.service';
import { Component, ElementRef, Inject, ViewChild, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, NgForm, Validators } from '@angular/forms';
import { Versao } from '../../enum/versao.enum';
import { UsuarioService } from '../../providers/service/usuario.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'page_Login',
  templateUrl: 'page_Login.html',
  styleUrls: ['./page_Login.scss']
})
export class Page_Login implements AfterViewInit {
  @ViewChild('mapCanvas', { static: true }) mapElement: ElementRef;

  loginForm = this.fb.group({
    login: [null, Validators.required],
    senha: ['', Validators.required],
    tipo: ['', Validators.required]
  });

  submitted = false;
  versao = Versao.numero;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private usuarioService: UsuarioService,
    private authBaseService: AuthBaseService,
    private alertControl: AlertController,
    private usuarioEvent: UsuarioEventService) { }

  async ngAfterViewInit() {

  }

  onLogin() {
    this.submitted = true;
    if (this.loginForm.valid) {
      this.authBaseService.login(this.loginForm.value).subscribe((res: any) => {
        if (res) {
          this.authBaseService.setLoggedUser(res.jwt);
          // this.usuarioEvent.updatedDataSelection(res);
        }
        if(this.loginForm.get('tipo')?.value  == 'PROFESSOR')
          this.router.navigateByUrl('/pageMenuPrincipalProfessor');

        if(this.loginForm.get('tipo')?.value == 'INSTITUICAO')
          this.router.navigateByUrl('/pageMenuPrincipalInstituicao');

        if(this.loginForm.get('tipo')?.value == 'ALUNO')
          this.router.navigateByUrl('/pageMenuPrincipalAluno');
      }, (err) => {
        this.presentAlert();
      });
    }
  }

  onTipoSelect(tipo: String) {
    this.loginForm.get('tipo').setValue(tipo);
  }

  async presentAlert() {
    const alert = this.alertControl.create({
      message: 'Usuário não encontrado',
      buttons: ['Continuar']
    });
    (await alert).present();
  }

}
