import { Atividade } from './../../model/atividade.model';
import { Component, ElementRef, Inject, ViewChild, AfterViewInit, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { ConferenceData } from '../../providers/conference-data';
import { Platform, ViewDidLeave } from '@ionic/angular';
import { DOCUMENT } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Versao } from '../../enum/versao.enum';
import { AuthBaseService } from '../../providers/service/auth/auth-base.service';
import { AtividadeAluno } from '../../model/atividade-aluno.model';
import { FormBuilder, Validators } from '@angular/forms';
import { AtividadeService } from '../../providers/service/ativdade.service';
import { AlunoService } from '../../providers/service/aluno.service';
import { Subscription } from 'rxjs/internal/Subscription';
import { EventEmitter } from '@angular/core';

@Component({
	selector: 'page_Menu_Minha_Atividades_Aluno',
	templateUrl: 'page_Menu_Minha_Atividades_Aluno.html',
	styleUrls: ['./page_Menu_Minha_Atividades_Aluno.scss'],
})
export class Page_Menu_Minha_Atividades_Aluno implements AfterViewInit {
	@ViewChild('mapCanvas', { static: true }) mapElement: ElementRef;

	public $subscriptions: Subscription[] = [];
	versao = Versao.numero;
	user: any;
	idAluno: any;
	atividadesAluno: AtividadeAluno[] = []
	aluno: any;
	atividadesPendentes: number;

	formFilter = this.fb.group({
		nomeAtividade: [''],
		tipoConcluido: ['TODOS', Validators.required],
		idAluno: [null]
	});

	constructor(
		public confData: ConferenceData,
		public router: Router,
		private activeRoute: ActivatedRoute,
		public platform: Platform,
		public authBaseService: AuthBaseService,
		private alunoService: AlunoService,
		private fb: FormBuilder,
		private atividadeService: AtividadeService) {

			activeRoute.params.subscribe(val => {
				this.authBaseService.watchLoggedUser().subscribe((res) => {
					if (res.user) {
						this.user = res.user;
						this.inicioView();
					}
		
				});
			});
		}

	public ngAfterViewInit(): void {
		
	}

	inicioView() {
		this.idAluno = this.user.id;
		this.formFilter.get('idAluno').setValue(this.idAluno);
		this.filtrarAtividade();
	}


	filtrarAtividade() {
		this.atividadeService.getByIdAluno(this.idAluno).subscribe((res: AtividadeAluno[]) => {
			if (res != null) {
				this.atividadesAluno = res;
				this.atividadesPendentes = this.atividadesAluno.filter(x => x.concluido == false).length;

			}
		});
	}

	statusChange(e) {
		this.formFilter.get('tipoConcluido').setValue(e);
		if (this.formFilter.valid) {
			this.atividadeService.filtrar(this.formFilter.value).subscribe((res: AtividadeAluno[]) => {
				if (res != null) {
					this.atividadesAluno = res;
				}
			});
		}
	}

	filtrarAtividadeLista(e) {
		this.formFilter.get('idAluno').setValue(this.idAluno);


		if (e != null && e != undefined) {
			this.formFilter.get('nomeAtividade').setValue(e);
		}

		if (this.formFilter.get('nomeAtividade').value != null) {
			this.atividadeService.filtrar(this.formFilter.value).subscribe((res: AtividadeAluno[]) => {
				if (res != null) {
					this.atividadesAluno = res;
				}
			});
		}
	}

	irAtividade(idAtividade: number) {
		this.router.navigate(['/pageFazerAtividadeAluno/' + idAtividade]);
	}

	irVoltar() {
		this.router.navigateByUrl('/pageMenuPrincipalAluno');
	}
}
