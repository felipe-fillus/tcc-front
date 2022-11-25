import { ProfessorService } from './../../providers/service/professor.service';
import { Professor } from '../../model/professor.model';
import { Component, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { UsuarioEventService } from '../../providers/service/usuarioEvent.service';
import { InstituicaoService } from '../../providers/service/instituicao.service';
import { AlertController } from '@ionic/angular';
import { Versao } from '../../enum/versao.enum';
import { AuthBaseService } from '../../providers/service/auth/auth-base.service';
import { AtividadeService } from '../../providers/service/ativdade.service';
import { Aluno } from '../../model/aluno.model';

@Component({
	selector: 'pageAlterarProfessor',
	templateUrl: 'pageAlterarProfessor.html',
	styleUrls: ['./pageAlterarProfessor.scss']
})
export class pageAlterarProfessor implements AfterViewInit {
	user: any;
	versao = Versao.numero;
	idProfessor: number;
	alunos: Aluno[] = [];
	isModalOpen = false;
	professorForm = this.fb.group({
		id: [null],
		cpf: [null, Validators.required],
		nome: ['', Validators.required],
		email: ['', Validators.required],
		telefone: ['', Validators.required],
		idInstituicao: [null, Validators.required],
		senha: [null, Validators.required],
		senha2: [null, Validators.required],
	});

	constructor(
		private userEvent: UsuarioEventService,
		private instituicaoService: InstituicaoService,
		private professorService: ProfessorService,
		private fb: FormBuilder,
		public router: Router,
		private alertControl: AlertController,
		private activeRoute: ActivatedRoute,
		public authBaseService: AuthBaseService) {
		activeRoute.params.subscribe(val => {
			this.idProfessor = this.activeRoute.snapshot.params['id'];
			this.buscarProfessor();
		});
	}


	async ngAfterViewInit() {
		this.authBaseService.watchLoggedUser().subscribe((res) => {

			if (res.user) {
				this.user = res.user;
			}

		});
	}

	buscarProfessor() {
		this.professorService.getById(this.idProfessor).subscribe((res: Professor) => {
			if (res) {
				this.professorForm.get('id').setValue(res.id);
				this.professorForm.get('cpf').setValue(res.cpf);
				this.professorForm.get('nome').setValue(res.nome);
				this.professorForm.get('email').setValue(res.email);
				this.professorForm.get('telefone').setValue(res.telefone);
				this.professorForm.get('idInstituicao').setValue(res.idInstituicao);
				this.alunos = res.alunos;
				console.log(this.alunos)
      		}
		});
	}

	addProfessor() {
		if (this.professorForm.valid) {
			if (this.professorForm.get('senha')?.value == this.professorForm.get('senha2')?.value) {
				this.professorService.add(this.professorForm.value, 'alterar-professor').subscribe((res: Professor) => {
					if (res) {
						this.alert('Professor ' + res.nome + ' cadastrado com sucesso!');
						this.professorForm.reset();
					}
				});
			} else {
				this.alert('As senhas não correspondem');
			}
		}
	}

	async alert(message: string) {
		const alert = this.alertControl.create({
			message: message,
			buttons: ['Continuar']
		});
		(await alert).present();
		this.irVoltar();
	}


	irVoltar() {
		this.router.navigateByUrl('/pageMeusProfessoresInstituicao');
	}

	setOpen(openClose : boolean) {
		this.isModalOpen = openClose;
	}
}
