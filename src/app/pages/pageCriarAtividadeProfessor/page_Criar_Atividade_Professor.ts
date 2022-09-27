import { ModalCriarAtividadeImagensProfessor } from './../modalCriarAtividadeImagensProfessor/modal_Criar_Atividade_Imagens_Professor';
import { AfterViewInit, Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalController, Platform } from '@ionic/angular';
import { ETipoAtividade } from '../../enum/tipo-atividade.enum';
import { Versao } from '../../enum/versao.enum';
import { ConferenceData } from '../../providers/conference-data';
import { AuthBaseService } from '../../providers/service/auth/auth-base.service';
import { ModalCriarAtividadeLetraProfessor } from '../modalCriarAtividadeLetraProfessor/modal_Criar_Atividade_Letra_Professor';

@Component({
	selector: 'page_Criar_Atividade_Professor',
	templateUrl: 'page_Criar_Atividade_Professor.html',
	styleUrls: ['./page_Criar_Atividade_Professor.scss']
})
export class Page_Criar_Atividade_Professor implements AfterViewInit {
	public versao = Versao.numero;
	public user: any;
	public tiposAtividades = ETipoAtividade;
	public tipoAtividade: ETipoAtividade;

	atividadeForm = this.fb.group({
		nomeAtividade: ['', Validators.required],
		totalExercicos: [null, Validators.required],
		tipoAtividade: ['', Validators.required],
		exercicios: [null]
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

	async modal() {
		const modal = await this.modalCtrl.create({
			component: ModalCriarAtividadeLetraProfessor,
			componentProps: {exercicios: this.atividadeForm.get('exercicios'), tipoAtividade: this.atividadeForm.get('tipoAtividade')},
		});
		await modal.present();

		const data = await (await modal.onWillDismiss()).data;
		this.atividadeForm.get('exercicios').setValue(data?.exercicios);
		this.atividadeForm.get('totalExercicos').setValue(data?.exercicios.length)
	}

	async modalImagens() {
		const modal = await this.modalCtrl.create({
			component: ModalCriarAtividadeImagensProfessor,
			componentProps: {exercicios: this.atividadeForm.get('exercicios')},
		});
		await modal.present();

		const data = await (await modal.onWillDismiss()).data;
		this.atividadeForm.get('exercicios').setValue(data?.exercicios);
		this.atividadeForm.get('totalExercicos').setValue(data?.exercicios.length);
	}

	openModal() {
		if(this.atividadeForm.get('tipoAtividade').value != null && this.atividadeForm.get('tipoAtividade').value != '' && this.atividadeForm.get('tipoAtividade').value != 'IMAGENS') {
			this.modal();
		}
		if(this.atividadeForm.get('tipoAtividade').value != null && this.atividadeForm.get('tipoAtividade').value != '' && this.atividadeForm.get('tipoAtividade').value == 'IMAGENS') {
			this.modalImagens();
		}
	}

	saveAtividade() {
		if (this.atividadeForm.valid) {
			
		}
	}

	irVoltar() {
		this.router.navigateByUrl('/pageMenuAtividadesProfessor');
	}

	tipoChange($event) {
		this.atividadeForm.get('nomeAtividade').reset();
		this.atividadeForm.get('totalExercicos').reset();
		this.atividadeForm.get('exercicios').reset();
	 }

}
