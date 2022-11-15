import { Exercicio } from './../../model/exercicio.model';
import { Atividade } from './../../model/atividade.model';
import { ExercicioService } from './../../providers/service/exercicio.service';
import { AtividadeService } from './../../providers/service/ativdade.service';
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
		id: [null],
		idProfessor: [null, Validators.required],
		tipoAtividade: ['', Validators.required],
		nomeAtividade: ['', Validators.required],
		qtdAtividade: [null, Validators.required],
		exercicios: [null]
	});

	constructor(
		public confData: ConferenceData,
		public router: Router,
		public platform: Platform,
		public authBaseService: AuthBaseService,
		private fb: FormBuilder,
		private modalCtrl: ModalController,
		private atividadeService: AtividadeService,
		private exercicioService: ExercicioService) { }

	async ngAfterViewInit() {
		this.authBaseService.watchLoggedUser().subscribe((res) => {
			
			if (res.user) {
				this.user = res.user;
				this.atividadeForm.get('idProfessor').setValue(this.user.id);
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
		this.atividadeForm.get('qtdAtividade').setValue(data?.exercicios.length)
	}

	async modalImagens() {
		const modal = await this.modalCtrl.create({
			component: ModalCriarAtividadeImagensProfessor,
			componentProps: {exercicios: this.atividadeForm.get('exercicios')},
		});
		await modal.present();

		const data = await (await modal.onWillDismiss()).data;
		this.atividadeForm.get('exercicios').setValue(data?.exercicios);
		this.atividadeForm.get('qtdAtividade').setValue(data?.exercicios.length);
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
			this.atividadeService.add(this.atividadeForm.value).subscribe((res: Atividade) => {
			if(res && res.exercicios){
				let elements =  this.atividadeForm.get('exercicios').value;
				for (var i = 0, element; element = elements[i++];){
					
					for (let index = 0; index < res.exercicios.length; index++) {
						if(element.palavra == res.exercicios[index].palavra) {
							this.salvarImagem(res.exercicios[index].id, element.imagem, element.nomeImagem);
							this.salvarParabenizacao(res.exercicios[index].id, element.parabenizacao, element.nomeParabenizacao);
						}
					}
				}
			}
			});
		}
		this.irVoltar();
	}

	private salvarImagem(idExercicio: number, base64: string, fileName: string) {
        const file = this.getFile(base64, fileName);
		this.atividadeService.uploadFiles(idExercicio, file,'salvar-imagem').subscribe((res: any) => {
		});
	}
	private salvarParabenizacao(idExercicio: number, base64: string, fileName: string) {
		const file = this.getFile(base64, fileName);
		this.atividadeService.uploadFiles(idExercicio, file,'salvar-parabenizacao').subscribe((res: any) => {
		});
	}

	getFile(base64, imgName): any {
		const imgBlob = this.dataURItoBlob(base64);
		return new File([imgBlob], imgName, { type: "image/png" });
	}

	dataURItoBlob(dataURI) {
		const byteString = window.atob(dataURI);
		const arrayBuffer = new ArrayBuffer(byteString.length);
		const int8Array = new Uint8Array(arrayBuffer);
		for (let i = 0; i < byteString.length; i++) {
		  int8Array[i] = byteString.charCodeAt(i);
		}
		const blob = new Blob([int8Array], { type: "image/png" });
		return blob;
	}

	irVoltar() {
		this.router.navigateByUrl('/pageMenuAtividadesProfessor');
	}

	tipoChange($event) {
		this.atividadeForm.get('nomeAtividade').reset();
		this.atividadeForm.get('qtdAtividade').reset();
		this.atividadeForm.get('exercicios').reset();
	 }

}
