import { DOCUMENT } from '@angular/common';
import { AfterViewInit, Component, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Platform, ModalController } from '@ionic/angular';
import { ETipoAtividade } from '../../enum/tipo-atividade.enum';
import { Versao } from '../../enum/versao.enum';
import { ConferenceData } from '../../providers/conference-data';
import { AuthBaseService } from '../../providers/service/auth/auth-base.service';
import { ModalCriarAtividadeLetraProfessor } from '../modalCriarAtividadeLetraProfessor/modal_Criar_Atividade_Letra_Professor';
import { Page_Criar_Atividade_Letra_Professor } from '../pageCriarAtividadeLetraProfessor/page_Criar_Atividade_Letra_Professor';

@Component({
	selector: 'page_Criar_Atividade_Professor',
	templateUrl: 'page_Criar_Atividade_Professor.html',
	styleUrls: ['./page_Criar_Atividade_Professor.scss']
})
export class Page_Criar_Atividade_Professor implements AfterViewInit {
	public versao = Versao.numero;
	public user: any;
	public tiposAtividades = ETipoAtividade;

	atividadeForm = this.fb.group({
		nomeAtividade: ['', Validators.required],
		totalExercicos: [null, Validators.required],
		tipoAtividade: ['', Validators.required]
	});

	constructor(
		public confData: ConferenceData,
		public router: Router,
		public platform: Platform,
		public authBaseService: AuthBaseService,
		private fb: FormBuilder,
		private modalCtrl: ModalController) { }

	async ngAfterViewInit() {
		this.authBaseService.watchLoggedUser().subscribe((res) => {

			if (res.user) {
				this.user = res.user;
			}

		});
	}

	async openModal() {
		const modal = await this.modalCtrl.create({
			component: ModalCriarAtividadeLetraProfessor
		});
		await modal.present();

		const data = await modal.onWillDismiss();
		console.log(data);
	}

	onProssiga() {
		this.openModal();
		// this.saveAtividade();
	}

	saveAtividade() {
		if (this.atividadeForm.valid) {
			//atividade subscribe
		}
	}

	irVoltar() {
		this.router.navigateByUrl('/pageMenuAtividadesProfessor');
	}

}
