import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IonModal, Platform, ModalController } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core';
import { ETipoExercicio } from '../../enum/tipo-exercicio.enum';
import { Versao } from '../../enum/versao.enum';
import { ConferenceData } from '../../providers/conference-data';
import { AuthBaseService } from '../../providers/service/auth/auth-base.service';

@Component({
	selector: 'modal_Criar_Atividade_Letra_Professor',
	templateUrl: 'modal_Criar_Atividade_Letra_Professor.html',
	styleUrls: ['./modal_Criar_Atividade_Letra_Professor.scss']
})
export class ModalCriarAtividadeLetraProfessor {
	constructor(
		public confData: ConferenceData,
		public router: Router,
		public platform: Platform,
		public authBaseService: AuthBaseService,
		private modalCtrl: ModalController) { }

	public versao = Versao.numero;
	public user: any;
	public name: string;
	public message: string;
	public tiposExercicios = ETipoExercicio;
	public nomeImagem: string;
	public nomeParabenizacao: string;

	openFileDialog() {
		(document as any).getElementById("file-upload").click();
	}

	openFileDialogParabenizacao() {
		(document as any).getElementById("file-upload-parabenizacao").click();
	}
	 
	setImage($event: any) {
		let f = $event.target.files![0];
		if(f != null) {
			this.nomeImagem = f.name;
		}
		console.log(f)
	}

	setParabenizacao($event: any) {
		console.log('parabeniza');
		let f = $event.target.files![0];
		if(f != null) {
			this.nomeParabenizacao = f.name;
		}
		console.log(f)
	}

	cancel() {
		this.modalCtrl.dismiss(null);
	}

	confirm() {
		this.modalCtrl.dismiss(this.name, 'confirm');
	}

	addExercicio() {
		this.modalCtrl.dismiss(null);
	}
}
